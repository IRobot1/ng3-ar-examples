import { Directive, Input, OnDestroy, OnInit, Optional } from "@angular/core";
import { Subscription } from "rxjs";

import { Group, Intersection, Matrix4, Mesh, Object3D, Raycaster } from "three";

import { BooleanInput, coerceBooleanProperty, NgtStore } from "@angular-three/core";
import { ARControllerComponent } from "ng3-webxr";

@Directive({
  selector: '[drag]',
})
export class DragDirective implements OnInit, OnDestroy {
  private _enabled: BooleanInput = true;
  @Input()
  get drag(): boolean { return coerceBooleanProperty(this._enabled) }
  set drag(newvalue: BooleanInput) {
    this._enabled = newvalue;
  }
  @Input() todrag: Array<Object3D> = [];

  private controller!: Group;

  private dragging?: any;

  private subs = new Subscription();

  constructor(
    private xr: ARControllerComponent,
    private store: NgtStore,
  ) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    const scene = this.store.get(s => s.scene);

    this.controller = this.xr.controller;

    this.subs.add(this.xr.tapstart.subscribe(next => {
      if (this.dragging) {
        scene.attach(this.dragging);
      }

      if (this.drag) {
        if (this.todrag.length == 0) {
          console.warn('Drag directive todrag is empty');
        }

        requestAnimationFrame(() => {
          const intersects = this.getPointerIntersections();

          if (intersects.length > 0) {
            const PointerIntersect = intersects[0];
            const PointerIntersectObject = PointerIntersect.object;

            this.controller.attach(PointerIntersectObject);
            this.dragging = PointerIntersectObject;
          }
        })
      }
    }));

  }

  private getPointerIntersections(): Array<Intersection> {
    const tempMatrix = new Matrix4().extractRotation(this.controller.matrixWorld);

    const raycaster = new Raycaster();

    raycaster.ray.origin.setFromMatrixPosition(this.controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

    return raycaster.intersectObjects(this.todrag, false);
  }
}
