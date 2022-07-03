import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { ConesExample } from '../examples/cones/cones.component';
import { DraggingExample } from '../examples/dragging/dragging.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cones', component: ConesExample },
  { path: 'dragging', component: DraggingExample },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
