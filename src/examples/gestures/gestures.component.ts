import { Component } from "@angular/core";

import { Euler, Matrix4, Vector3 } from "three";

import { EventState, SwipeDirection } from "ng3-webxr";

class GestureMessage {
  constructor(public message: string, public position: Vector3, public rotation: Euler) { }
}

@Component({
  templateUrl: './gestures.component.html',
})
export class GesturesExample {
  messages: Array<GestureMessage> = [];

  matrixWorld?: Matrix4

  private addmessage(message: string, matrixWorld?: Matrix4) {
    if (matrixWorld) {
      const position = new Vector3(0, -0.5, -1).applyMatrix4(matrixWorld);
      const rotation = new Euler().setFromRotationMatrix(matrixWorld)

      this.messages.push(new GestureMessage(message, position, rotation));

      this.matrixWorld = matrixWorld;
    }
  }

  clearmessage() {
    this.messages.shift();
  }

  press(event: { position: Vector3, matrixWorld: Matrix4 }) {
    this.addmessage('press', event.matrixWorld);
  }

  tap(event: { count: number, position: Vector3, matrixWorld: Matrix4 }) {
    this.addmessage('tap ' + event.count, event.matrixWorld);
  }

  swipe(direction: SwipeDirection) {
    this.addmessage('swipe ' + direction, this.matrixWorld);
  }

  pinch(event: { delta: number, scale: number, state: EventState }) {
    console.warn('pinch', event.delta, event.scale, event.state)
  }

  rotate(event: { theta: number, state: EventState }) {
    console.warn('rotate', event.theta, event.state)
  }

  pan(event: { delta: Vector3, state: EventState }) {
    if (event.state === 'start') {
      this.addmessage('pan start', this.matrixWorld);
    }
    else if (event.state === 'end') {
      this.addmessage('pan end', this.matrixWorld);
    }
  }
}
