import {Component, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    NgClass
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  protected orientation: boolean = true;

  constructor(private router: Router) { }

  signIn() {
    this.router.navigate(['/workspaces']);
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const isPortrait = window.matchMedia('(orientation: portrait)').matches;

    if (isPortrait) {
      this.orientation = true;
    } else {
      this.orientation = false;
    }
  }
}
