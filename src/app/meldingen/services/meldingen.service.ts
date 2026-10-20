import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Melding } from '../models/meldingen.model';
import { catchError, throwError, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MeldingenService {
  private http = inject(HttpClient);
  //ToDo: Schrijf een service die de omgeving bepaalt, haal hardcoded URL weg (dev, staging, prod)
  private url = 'http://localhost:3000/meldingen';

  getMeldingen(): Observable<Melding[]> {
    return this.http.get<Melding[]>(this.url).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      }),
    );
  }

  meldingVersturen(melding: Omit<Melding, 'id'>): Observable<Melding> {
    return this.http.post<Melding>(this.url, melding).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      }),
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);

    if (error.status >= 500) {
      return throwError(() => new Error('Er ging iets mis'));
    }

    switch (error.status) {
      case 0:
        return throwError(() => new Error('Server niet bereikbaar'));
      case 404:
        return throwError(() => new Error('Endpoint niet gevonden'));
      default:
        return throwError(() => new Error('Onverwachte fout'));
    }
  }
}
