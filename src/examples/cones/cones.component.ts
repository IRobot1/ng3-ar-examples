import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Color, Object3D, Quaternion, Vector3 } from "three";

class ConeSetting {
  constructor(public color: string, public position: Vector3, public quaternion: Quaternion) { }
}

@Component({
  templateUrl: './cones.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConesExample {
  cones: Array<ConeSetting> = [];

  addcone(controller: Object3D) {
    const position = new Vector3(0, 0, -0.3).applyMatrix4(controller.matrixWorld);
    const quaternion = new Quaternion().setFromRotationMatrix(controller.matrixWorld);

    this.cones.push(new ConeSetting(
      '#' + new Color(Math.random() * 0xffffff).getHexString(),
      position, quaternion
    ));
  }
}
