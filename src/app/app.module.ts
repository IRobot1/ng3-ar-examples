import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { NgtCanvasModule } from '@angular-three/core';

import { NgtColorAttributeModule } from '@angular-three/core/attributes';
import { NgtGridHelperModule } from '@angular-three/core/helpers';

import { NgtPointLightModule } from '@angular-three/core/lights';

import { NgtSobaOrbitControlsModule } from '@angular-three/soba/controls';

import { Ng3WebxrModule } from 'ng3-webxr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    NgtCanvasModule,
    NgtColorAttributeModule,

    NgtGridHelperModule,

    NgtPointLightModule,

    NgtSobaOrbitControlsModule,

    Ng3WebxrModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
