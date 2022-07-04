import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: 'text-vanish',
  templateUrl: './text-vanish.component.html',
})
export class TextVanishComponent implements OnInit {
  @Input() text = '';

  @Output() completed = new EventEmitter<boolean>();

  fontSize = 1;

  ngOnInit(): void {
    const timer = setInterval(() => {
      if (this.fontSize <= 0) {
        this.completed.next(true);
        clearInterval(timer);
      }
      this.fontSize -= 0.05;
    }, 100)
  }

}
