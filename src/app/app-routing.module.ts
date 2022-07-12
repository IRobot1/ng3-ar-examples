import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { ConesExample } from '../examples/cones/cones.component';
import { DraggingExample } from '../examples/dragging/dragging.component';
import { GesturesExample } from '../examples/gestures/gestures.component';
import { HittestExample } from '../examples/hittest/hittest.component';
import { LightingExample } from '../examples/lighting/lighting.component';
import { PaintExample } from '../examples/paint/paint.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cones', component: ConesExample },
  { path: 'dragging', component: DraggingExample },
  { path: 'gestures', component: GesturesExample },
  { path: 'hittest', component: HittestExample },
  { path: 'lighting', component: LightingExample },
  { path: 'paint', component: PaintExample },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
