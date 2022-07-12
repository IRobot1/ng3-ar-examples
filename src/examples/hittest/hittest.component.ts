import { Component, OnInit } from "@angular/core";

import { Color, Euler, Mesh, Quaternion, Vector3 } from "three";
import { NgtRenderState, NgtStore } from "@angular-three/core";

import { WebARService } from "ng3-webxr";

// based on https://github.com/mrdoob/three.js/blob/master/examples/webxr_ar_hittest.html

class HitSetting {
  constructor(public position: Vector3, public rotation: Euler, public scale: Vector3, public color: string) { }
}

@Component({
  templateUrl: './hittest.component.html',
})
export class HittestExample implements OnInit {
  reticle!: Mesh;
  hits: Array<HitSetting> = [];

  private referenceSpace!: XRReferenceSpace;

  constructor(
    private webar: WebARService,
    private store: NgtStore,
  ) { }

  ngOnInit(): void {
    const renderer = this.store.get(s => s.gl);

    this.webar.isPresenting.subscribe(isPresenting => {
      if (isPresenting) {

        // webar default reference space is viewer
        const referenceSpace = renderer.xr.getReferenceSpace();
        if (!referenceSpace) return;
        this.referenceSpace = referenceSpace;  // avoid further check for undefined

        const session = renderer.xr.getSession();
        if (!session) return;
        if (!session.requestHitTestSource) return;

        session.requestHitTestSource({ space: this.referenceSpace })?.then((source: any) => {
          this.hitTestSource = source; // only set once
        });

        //this.reticle.rotateZ(Math.PI/2);
      }
      else {
        this.hitTestSource = undefined;
      }
    });
  }


  tap() {
    if (this.reticle.visible) {
      const q = new Quaternion();
      const s = new Vector3(1, 1, 1);
      const v = new Vector3();

      this.reticle.matrix.decompose(v, q, s);
      s.y = Math.random() * 2 + 1;
      v.y += 0.1;

      const e = new Euler().setFromQuaternion(q);
     
      const c = '#' + new Color(Math.random() * 0xffffff).getHexString();

      this.hits.push(new HitSetting(v, e, s, c))
    }
  }

  private hitTestSource?: XRHitTestSource;

  tick(state: NgtRenderState) {
    if (state.frame && this.hitTestSource) {
      const hitTestResults = state.frame.getHitTestResults(this.hitTestSource);

      if (hitTestResults.length > 0) {
        const hit = hitTestResults[0];

        const pose = hit.getPose(this.referenceSpace);
        if (pose) {
          this.reticle.matrixAutoUpdate = false;
          this.reticle.matrix.fromArray(pose.transform.matrix);

          if (!this.reticle.visible) console.warn('reticle visible', this.reticle.matrixAutoUpdate)
          this.reticle.visible = true;
        }
      } else {
        if (this.reticle.visible) console.warn('reticle invisible', this.reticle.matrixAutoUpdate)
        this.reticle.visible = false;
      }

    }
  }
}
