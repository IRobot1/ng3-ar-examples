import { Component } from '@angular/core';

import { NgtStore, NgtTriple } from '@angular-three/core';

import { TapEvent, WebARService } from 'ng3-webxr'

class PanelSetting {
  constructor(public position: NgtTriple, public rotation: number, public asset: string, public text: string) { }
}

@Component({
  templateUrl: 'home.component.html',
})
export class HomeComponent {
  examples = [
    { asset: 'cones', text: 'Cones' },
  ]

  panels: Array<PanelSetting> = [];

  constructor(
    private webar: WebARService,
    private store: NgtStore,
  ) {
    const angle = 360 / this.examples.length;

    this.examples.forEach((item, index) => {
      const position = [0, 0, 0] as NgtTriple;
      const rotation = angle * index;

      const panel = new PanelSetting(position, rotation, item.asset, item.text)
      this.panels.push(panel);
    })

    const camera = this.store.get(s => s.camera);

    this.webar.isPresenting.subscribe(isPresenting => {
      if (!isPresenting) {
        camera.position.set(0, 0, 1);
      }
    });
  }


  tap(event: TapEvent) {
  }
}
