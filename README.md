## AR Examples for @angular-three

Use a mobile phone to open [DEMO](https://ng3ar.z9.web.core.windows.net/).  Touch **Enter AR** to start AR session.

![image](https://user-images.githubusercontent.com/25032599/178856046-46eaa8b4-9706-40b3-b988-463e8ca5cd65.png)

Touch a panel to navigate to each example.

Withing an example, **swipe up** to return to home screen.

### Examples

#### Paint
Touch and drag finger to paint within your play space.

#### Light Estimatation
Touch the screen to change how the 9 spheres are illuminated by light sources within your play space.

#### Hit Test
Not working.  Still under development.

#### Dragging
Touch and drag shapes around your play space.

#### Cones
Touch the screen to add a cone to your play space.

#### Gestures
Touch the screen in different ways.  Text indicating the type of gesture appears and gradually fades into the distance.
The following gestures are supported
* tap - number of times the screen is quickly tapped and position of last tap
* press - touch and release to generate a press event
* pan - touch and drag finger around screen to generate pan events.  Event state indicates when panning starts, ends and is updating.
* swipe - touch and move finger up or down screen to generate swipe event

Note that swipe up won't appear since its used to navigate back to home screen

## Code Highlights
Add webar to ngt-canvas to enable WebAR support
```html
<ngt-canvas webar [sessionInit]="{ optionalFeatures: ['hit-test', 'light-estimation'] }" [camera]="{ fov: 55, position: [0, 2, 4]}">
```
`sessionInit` allows optional or required [WebXR session features](https://developer.mozilla.org/en-US/docs/Web/API/XRSystem/requestSession#session_features) to be requested before the AR session starts.

Add ar-controller to add a touch interaction.  Three events are supported: tapstart, tapend and tap.
```html
<ar-controller (tapstart)="tapstart($event)" (tap)="tap($event)" (tapend)="tapend($event)">
```

See drag example of how to use directives to add behaviors to ar-controller.
```html
<ar-controller drag [todrag]="list">
```

Add ar-gestures to add gesture recognition.  See navhome directive for example of how to associate behaviors with gesture events
```html
<ar-gestures navhome
             (tap)="tap($event)"
             (press)="press($event)"
             (pan)="pan($event)">
             (swipe)="swipe($event)"
</ar-gestures>
```
