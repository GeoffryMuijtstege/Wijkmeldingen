import { Routes } from '@angular/router';
import {MeldingenLijst} from './meldingen/meldingen-lijst/meldingen-lijst'

export const routes: Routes = [
    { path: '', redirectTo: 'meldingen', pathMatch: 'full' },
    { path: 'meldingen', component: MeldingenLijst },
];
