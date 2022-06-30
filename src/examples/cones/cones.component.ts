import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Color, Quaternion, Vector3 } from "three";

import { TapEvent } from 'ng3-webxr'

class ConeSetting {
  constructor(public color: string, public position: Vector3, public quaternion: Quaternion) { }
}

@Component({
  templateUrl: './cones.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConesExample {
  cones: Array<ConeSetting> = [];

  addcone(event: TapEvent) {
    const position = new Vector3(0, 0, -0.3).applyMatrix4(event.controller.matrixWorld);
    const quaternion = new Quaternion().setFromRotationMatrix(event.controller.matrixWorld);

    this.cones.push(new ConeSetting(
      '#' + new Color(Math.random() * 0xffffff).getHexString(),
      position, quaternion
    ));
  }

}
