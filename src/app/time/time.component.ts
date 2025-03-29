import { Component } from '@angular/core';
import {LayoutComponent} from '../layout/layout.component';

@Component({
  selector: 'app-time',
  imports: [LayoutComponent],
  templateUrl: './time.component.html',
  styleUrl: './time.component.css'
})
export class TimeComponent {
  year: number = 2025;

  increment() {
    if (this.year < 2025) {
      this.year += 1;
    }
  }

  decrement() {
    this.year -= 1;
  }
}
