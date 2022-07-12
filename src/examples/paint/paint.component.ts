import { Component, OnDestroy, OnInit } from "@angular/core";

import { DoubleSide, Group, Vector3 } from "three";
import { NgtStore } from "@angular-three/core";

import { TubePainter } from "./tubepainter";

// based on https://github.com/mrdoob/three.js/blob/master/examples/webxr_ar_paint.html

@Component({
  templateUrl: './paint.component.html',
})
export class PaintExample implements OnInit, OnDestroy {
  private isSelecting = false;
  private skipFrames = 2;
  private painter = new TubePainter();

  constructor(
    private store: NgtStore,
  ) { }

  ngOnDestroy(): void {
    const scene = this.store.get(s => s.scene);
    scene.remove(this.painter.mesh);
  }

  ngOnInit(): void {
    const scene = this.store.get(s => s.scene);

    this.painter.setSize(0.4);
    this.painter.mesh.material.side = DoubleSide;
    scene.add(this.painter.mesh);
  }

  tapstart() {
    this.isSelecting = true;
    this.skipFrames = 2;
  }

  tapend() {
    this.isSelecting = false;
  }

  tick(controller: Group) {
    const cursor = new Vector3();

    cursor.set(0, 0, -0.2).applyMatrix4(controller.matrixWorld);

    if (this.isSelecting === true) {

      if (this.skipFrames >= 0) {

        // TODO(mrdoob) Revisit this

        this.skipFrames--;

        this.painter.moveTo(cursor);

      } else {

        this.painter.lineTo(cursor);
        this.painter.update();

      }

    }
  }
}


