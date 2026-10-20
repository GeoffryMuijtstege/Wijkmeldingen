import { Routes } from '@angular/router';
import { MeldingenLijst } from './meldingen/meldingen-lijst/meldingen-lijst';
import { Home } from './meldingen/home/home';
import { MeldingIndienen } from './meldingen/melding-indienen/melding-indienen';

export const routes: Routes = [
  { path: '', component: Home, title: 'Wijkmeldingen' },
  { path: 'meldingen', component: MeldingenLijst, title: 'Meldingen' },
  { path: 'meldingen/indienen', component: MeldingIndienen, title: 'Melding indienen' },
];
