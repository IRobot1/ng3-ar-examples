import { Component, OnDestroy, OnInit } from "@angular/core";

import { Group, Matrix4, Vector3 } from "three";
import { NgtStore } from "@angular-three/core";

import { XREstimatedLight } from 'three-stdlib';

class BallSetting {
  constructor(public position: Vector3, public roughness: number, public metalness: number) { }
}

@Component({
  templateUrl: './lighting.component.html',
})
export class LightingExample implements OnInit, OnDestroy {
  public visible = true; // hemisphere light

  public ballGroup!: Group;
  public balls: Array<BallSetting> = [];

  private cleanup = () => { }

  constructor(
    //private webar: WebARService,
    private store: NgtStore,
  ) {
    const rows = 3;
    const cols = 3;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        this.balls.push(new BallSetting(
          new Vector3((i + 0.5 - rows * 0.5) * 0.4, (j + 0.5 - cols * 0.5) * 0.4, 0),
          i / rows,
          j / rows)
        );
      }
    }
  }

  ngOnInit(): void {
    const gl = this.store.get(s => s.gl);
    gl.physicallyCorrectLights = true;

    const scene = this.store.get(s => s.scene);


    const xrLight = new XREstimatedLight(gl);

    const estimationstart = () => {

      // Swap the default light out for the estimated one one we start getting some estimated values.
      scene.add(xrLight);
      this.visible = false;// scene.remove(defaultLight);

      // The estimated lighting also provides an environment cubemap, which we can apply here.
      if (xrLight.environment) {
        scene.environment = xrLight.environment;
      }

    }
    xrLight.addEventListener('estimationstart', estimationstart);

    const eismtationend = () => {

      // Swap the lights back when we stop receiving estimated values.
      this.visible = true;// scene.add(defaultLight);
      scene.remove(xrLight);

      // Revert back to the default environment.
      //scene.environment = defaultEnvironment;
    }

    xrLight.addEventListener('estimationend', eismtationend);


    this.cleanup = () => {
      xrLight.removeEventListener('estimationstart', estimationstart);
      xrLight.removeEventListener('estimationend', eismtationend);
    }

  }

  ngOnDestroy(): void {
    this.cleanup();

    const gl = this.store.get(s => s.gl);
    gl.physicallyCorrectLights = false;
  }


  tap(event: { count: number, position: Vector3, matrixWorld: Matrix4 }) {
    this.ballGroup.position.set(0, 0, -2).applyMatrix4(event.matrixWorld);
    this.ballGroup.quaternion.setFromRotationMatrix(event.matrixWorld);
  }
}
