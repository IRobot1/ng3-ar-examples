import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { ConesExample } from '../examples/cones/cones.component';
import { DraggingExample } from '../examples/dragging/dragging.component';
import { GesturesExample } from '../examples/gestures/gestures.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cones', component: ConesExample },
  { path: 'dragging', component: DraggingExample },
  { path: 'gestures', component: GesturesExample },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
