import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeldingenLijst } from './meldingen-lijst';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

describe('MeldingenLijst', () => {
  let component: MeldingenLijst;
  let fixture: ComponentFixture<MeldingenLijst>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeldingenLijst],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(MeldingenLijst);
    httpMock = TestBed.inject(HttpTestingController);
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('toont een foutmelding met role="alert" bij een fout', async () => {
    httpMock.expectOne('/api/meldingen').flush('fout', { status: 500, statusText: 'Server Error' });
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('[role="alert"]')).not.toBeNull();
  });

  it('toont de meldingen na het ophalen', async () => {
    httpMock.expectOne('/api/meldingen').flush([
      {
        id: '1',
        titel: 'Straatverlichting gestolen',
        omschrijving: 'De straatverlichting op de hoek van de straat is gestolen.',
        categorie: 'Diefstal',
        datum: '2023-05-01T10:00:00',
        status: 'Nieuw',
      },
      {
        id: '2',
        titel: 'Afval container leeg',
        omschrijving: 'De afval container in de straat is leeg.',
        categorie: 'Vandalisme',
        datum: '2023-06-01T10:00:00',
        status: 'In behandeling',
      },
    ]);
    await fixture.whenStable();

    const rijen = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rijen.length).toBe(2);
  });
});
