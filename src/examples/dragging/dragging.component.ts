import { Component } from "@angular/core";

import { Color, Euler, Object3D, Vector3 } from "three";

// based on https://github.com/mrdoob/three.js/blob/master/examples/webxr_ar_dragging.html

class RandomShape {
  constructor(public shapename: string, public color: string, public position: Vector3, public rotation: Euler, public scale: Vector3) { }
}

export class GenerateRandomShapes {
  private geometries = [
    'box',
    'cone',
    'cylinder',
    'icosahedron',
    'torus'
  ];

  public generate(count = 50): Array<RandomShape> {
    const shapes: Array<RandomShape> = [];

    for (let i = 0; i < count; i++) {
      const shapename = this.geometries[Math.floor(Math.random() * this.geometries.length)];

      shapes.push(new RandomShape(shapename,
        '#' + new Color(Math.random() * 0xffffff).getHexString(),
        new Vector3(Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 3),
        new Euler(Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI),
        new Vector3(Math.random() + 0.4, Math.random() + 0.4, Math.random() + 0.4),
      ));
    }
    return shapes;
  }
}

@Component({
  templateUrl: './dragging.component.html',
})
export class DraggingExample {
  shapes = new GenerateRandomShapes().generate();

  list: Array<Object3D> = [];
}
