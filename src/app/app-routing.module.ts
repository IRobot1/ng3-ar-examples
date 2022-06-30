import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { ConesExample } from '../examples/cones/cones.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cones', component: ConesExample },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
