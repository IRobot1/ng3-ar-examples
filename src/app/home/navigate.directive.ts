import { Directive, Input, NgZone, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { Group, Matrix4, Object3D, Raycaster } from "three";
import { BooleanInput, coerceBooleanProperty } from "@angular-three/core";

import { ARControllerComponent } from "ng3-webxr";

@Directive({
  selector: '[navigate]',
})
export class NavigateDirective implements OnInit, OnDestroy {
  private _enabled: BooleanInput = true;
  @Input()
  get navigate(): boolean { return coerceBooleanProperty(this._enabled) }
  set navigate(newvalue: BooleanInput) {
    this._enabled = newvalue;
  }
  @Input() room!: Group;

  private controller!: Group;

  private subs = new Subscription();

  constructor(
    private ar: ARControllerComponent,
    private router: Router,
    private zone: NgZone,
  ) { }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    if (!this.room) {
      console.warn('Navigate directive requires room Group to be set');
      return;
    }

    this.controller = this.ar.controller;

    this.subs.add(this.ar.tapstart.subscribe(next => {
      if (this.navigate) {

        requestAnimationFrame(() => {
          this.zoneNavigate();
        });
      }
    }));

  }

  private zoneNavigate() {
    const intersects = this.getPointerIntersections();

    if (intersects.length > 0) {
      const PointerIntersect = intersects[0];
      const PointerIntersectObject = PointerIntersect.object;
      const asset = PointerIntersectObject?.userData['asset'];
      if (asset) {
        this.zone.run(() => {
          this.router.navigate([asset]);
        });
      }
    }
  }


  private getPointerIntersections(): any {
    const tempMatrix = new Matrix4();

    tempMatrix.identity().extractRotation(this.controller.matrixWorld);

    const raycaster = new Raycaster();

    raycaster.ray.origin.setFromMatrixPosition(this.controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

    return raycaster.intersectObjects(this.room.children, true);
  }

  private PointerIntersect: any;
  private PointerIntersectObject?: Object3D;

  private highlight() {
    if (this.PointerIntersectObject) {
      if (this.PointerIntersectObject.name == 'asset') {
        this.PointerIntersectObject.scale.multiplyScalar(1.02)
      }
    }
  }

  private unhighlight() {
    if (this.PointerIntersectObject) {
      if (this.PointerIntersectObject.name == 'asset') {
        this.PointerIntersectObject.scale.multiplyScalar(0.98)
      }
      this.PointerIntersectObject = undefined;
    }
  }

  private tick() {
    if (this.controller && this.room) {

      const intersects = this.getPointerIntersections();

      if (intersects.length > 0) {
        if (this.PointerIntersectObject != intersects[0].object) {

          this.unhighlight();

          this.PointerIntersect = intersects[0];
          this.PointerIntersectObject = this.PointerIntersect.object;

          this.highlight();
        }
      }
      else {
        this.unhighlight();
      }
    }
  }

}
