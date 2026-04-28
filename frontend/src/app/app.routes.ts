import { Routes } from '@angular/router';
import { FamilleComponent } from './components/famille/famille.component';
import { AppareilComponent } from './components/appareil/appareil.component';
import { ResultatComponent } from './components/resultat/resultat.component';

export const routes: Routes = [
  { path: '', redirectTo: 'familles', pathMatch: 'full' },
  { path: 'familles', component: FamilleComponent },
  { path: 'appareils/:famille_id', component: AppareilComponent },
  { path: 'resultat/:famille_id', component: ResultatComponent }
];