import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {SelectedTab} from '../selectedTab';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  constructor(
    private router: Router,
    public state: SelectedTab
  ) {}

  selectButton(buttonNumber: number, route: string) {
    this.state.selectedTab = buttonNumber;
    this.router.navigate([route]);
  }
}
