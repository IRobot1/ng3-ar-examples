import { Directive, Input, NgZone, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { BooleanInput, coerceBooleanProperty } from "@angular-three/core";

import { ARGesturesComponent, VRControllerComponent } from "ng3-webxr";

@Directive({
  selector: '[navhome]',
})
export class NavigateHomeDirective implements OnInit, OnDestroy {
  private _enabled: BooleanInput = true;
  @Input()
  get navhome(): boolean { return coerceBooleanProperty(this._enabled) }
  set navhome(newvalue: BooleanInput) {
    this._enabled = newvalue;
  }

  private subs = new Subscription();

  constructor(
    private ar: ARGesturesComponent,
    private router: Router,
    private zone: NgZone,
  ) { }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.add(this.ar.swipe.subscribe(next => {
      if (this.navhome) {
        if (next == 'up') {
          this.zoneNavigate();
        }
      }
    }));
  }

  private zoneNavigate() {
    this.zone.run(() => {
      this.router.navigate(['/']);
    });
  }
}
