import { Routes } from '@angular/router';
import {TraductorComponent} from './pages/traductor/traductor.component';

export const routes: Routes = [
  { path: '', redirectTo: '/translator', pathMatch: 'full' },
  { path: 'translator', component: TraductorComponent },
  { path: '**', redirectTo: '/translator' }
];
