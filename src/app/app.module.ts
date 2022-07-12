import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { NgtCanvasModule, NgtRadianPipeModule } from '@angular-three/core';

import { NgtMeshModule } from '@angular-three/core/meshes';
import { NgtGroupModule } from '@angular-three/core/group';
import { NgtPlaneGeometryModule, NgtCylinderGeometryModule, NgtBoxGeometryModule, NgtConeGeometryModule, NgtIcosahedronGeometryModule, NgtTorusGeometryModule, NgtRingGeometryModule, NgtSphereGeometryModule } from '@angular-three/core/geometries';
import { NgtMeshStandardMaterialModule } from '@angular-three/core/materials';

import { NgtColorAttributeModule } from '@angular-three/core/attributes';
import { NgtAxesHelperModule} from '@angular-three/core/helpers';


import { NgtPointLightModule,NgtHemisphereLightModule } from '@angular-three/core/lights';

import { NgtSobaOrbitControlsModule } from '@angular-three/soba/controls';
import { NgtSobaTextModule } from '@angular-three/soba/abstractions'

import { Ng3WebxrModule } from 'ng3-webxr';

import { PanelComponent } from './home/panel/panel.component';
import { PortalComponent } from './home/portal/portal.component';
import { ConesExample } from '../examples/cones/cones.component';
import { DraggingExample } from '../examples/dragging/dragging.component';
import { DragDirective } from '../examples/dragging/drag.directive';
import { GesturesExample } from '../examples/gestures/gestures.component';
import { TextVanishComponent } from '../examples/gestures/text-vanish/text-vanish.component';
import { HittestExample } from '../examples/hittest/hittest.component';
import { LightingExample } from '../examples/lighting/lighting.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PanelComponent,
    PortalComponent,

    ConesExample,
    DraggingExample,
    DragDirective,
    GesturesExample,
    TextVanishComponent,

    HittestExample,

    LightingExample,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    NgtCanvasModule,
    NgtRadianPipeModule,
    NgtColorAttributeModule,

    
    NgtMeshModule,
    NgtGroupModule,

    NgtPlaneGeometryModule,
    NgtCylinderGeometryModule,
    NgtBoxGeometryModule,
    NgtSphereGeometryModule,
    NgtConeGeometryModule,
    NgtIcosahedronGeometryModule,
    NgtTorusGeometryModule,
    NgtRingGeometryModule,

    NgtMeshStandardMaterialModule,

    NgtPointLightModule,
    NgtHemisphereLightModule,

    NgtSobaOrbitControlsModule,
    NgtSobaTextModule,

    NgtAxesHelperModule,

    Ng3WebxrModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
