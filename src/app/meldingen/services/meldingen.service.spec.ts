import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MeldingenService } from './meldingen.service';
import { Status } from '../models/meldingen.model';
import { Melding } from '../models/meldingen.model';

describe('MeldingenService', () => {
  let service: MeldingenService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(MeldingenService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('haalt meldingen op', () => {
    service.getMeldingen().subscribe((meldingen) => {
      expect(meldingen.length).toBe(1);
      expect(meldingen[0].titel).toBe('Geluidsoverlast na middernacht');
      expect(meldingen[0].status).toBe(Status.Nieuw);
      expect(meldingen[0].categorie).toBe('Overlast');
      expect(meldingen[0].datum).toBe('2026-10-12T23:45:00');
      expect(meldingen[0].omschrijving).toBe(
        'Harde muziek en veel lawaai vanuit een appartement aan de Voorbeeldstraat.',
      );
    });

    const req = httpMock.expectOne('/api/meldingen');
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        titel: 'Geluidsoverlast na middernacht',
        id: '1',
        status: Status.Nieuw,
        categorie: 'Overlast',
        datum: '2026-10-12T23:45:00',
        omschrijving: 'Harde muziek en veel lawaai vanuit een appartement aan de Voorbeeldstraat.',
      },
    ]);
  });

  it('geeft een fout bij 404', () => {
    service.getMeldingen().subscribe({
      next: () => {
        throw new Error('had niet moeten slagen');
      },
      error: (e: Error) => expect(e.message).toBe('Endpoint niet gevonden'),
    });

    httpMock
      .expectOne('/api/meldingen')
      .flush('Endpoint niet gevonden', { status: 404, statusText: 'Not Found' });
  });

  it('geeft een fout bij 500', () => {
    service.getMeldingen().subscribe({
      next: () => {
        throw new Error('had niet moeten slagen');
      },
      error: (e: Error) => expect(e.message).toBe('Er ging iets mis'),
    });

    httpMock
      .expectOne('/api/meldingen')
      .flush('Er ging iets mis', { status: 500, statusText: 'Internal Server Error' });
  });

  it('Kan een melding versturen', () => {
    const melding = {
      titel: 'Kapotte straatverlichting',
      status: Status.Nieuw,
      categorie: 'Verlichting',
      datum: '2026-10-12T23:45:00',
      omschrijving: 'De straatverlichting op de Voorbeeldstraat werkt niet.',
    };

    const response = {
      ...melding,
      id: '123',
    };

    let resultaat: Melding | undefined;
    service.meldingVersturen(melding).subscribe((m) => (resultaat = m));

    const req = httpMock.expectOne('/api/meldingen');

    //Test of die goed verstuurd wordt
    expect(req.request.body).toEqual(melding);
    expect(req.request.method).toBe('POST');
    req.flush(response);

    //Test of die goed terugkomt
    expect(resultaat).toEqual(response);
    expect(resultaat?.id).toBe('123');
  });
});
