import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'chat-app';

  constructor(
    private authGuardService: AuthGuardService,
    private router: Router,
    private sessionStorageService: StorageService
  ) { }

  @HostListener('document:click')
  @HostListener('document:keydown')
  @HostListener('document:mousemove')
  handleUserInteraction() {
    const token: string | null = this.sessionStorageService.get('auth-token');
    const currentUrl = this.router.url;

    const publicPaths = ['/', '/register'];

    if (!token && !publicPaths.includes(currentUrl)) {
      this.sessionStorageService.clear();
      this.router.navigate(['/']);
    }
    if (token && this.authGuardService.isTokenExpired(token)) {
      this.sessionStorageService.clear();
      this.router.navigate(['/']);
    }
  }
}