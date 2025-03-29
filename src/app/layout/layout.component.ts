import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {SelectedTabStateService} from '../selected-tab-state.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  constructor(
    private router: Router,
    public state: SelectedTabStateService
  ) {}

  selectButton(buttonNumber: number, route: string) {
    this.state.selectedTab = buttonNumber;
    this.router.navigate([route]);
  }
}
