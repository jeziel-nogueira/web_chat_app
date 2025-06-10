import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { StorageService } from './storage.service';

interface TokenPayload {
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private sessionStorageService:StorageService) {}

  canActivate(): boolean {
    const token = this.sessionStorageService.get('auth-token');

    if (token && !this.isTokenExpired(token)) {
      return true;
    }
    
    this.sessionStorageService.clear();
    this.router.navigate(['']);
    return false;
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp < now;
    } catch (e) {
      return true;
    }
  }
}
