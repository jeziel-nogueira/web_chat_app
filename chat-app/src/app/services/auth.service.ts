import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.types';
import { tap } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = "http://localhost:8080/api/auth";

  constructor(private httpClient: HttpClient, private sessionStorageService:StorageService) {

  }

  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/login", { email, password }).pipe(
      tap((value) => {
        this.sessionStorageService.set("auth-token", value.token);
        this.sessionStorageService.set("userName", value.userName);
        this.sessionStorageService.set("userEmail", value.userEmail);
      })
    )
  }


  signup(email: string, name: string, password: string) {
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/register", { email, name, password }).pipe(
      tap((value) => {
        this.sessionStorageService.set("auth-token", value.token);
        this.sessionStorageService.set("userName", value.userName);
        this.sessionStorageService.set("userEmail", value.userEmail);
      })
    )
  }

  logout(){
    this.sessionStorageService.clear();
  }
}
