import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SessionService } from './core/services/session.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend_cristophergomez');
  isLoggedIn = signal(false);
  constructor(private router: Router, private ss: SessionService) {
    this.isLoggedIn = this.ss.isLoggedIn;
  }

  logout() {
    this.ss.clearToken();
    this.router.navigate(['/auth/login']);
  }
}
