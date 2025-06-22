import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';
import { LoginResponse } from '../types/login-response.types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = "http://localhost:8080/api/users";

  constructor(private httpClient: HttpClient, private sessionStorageService: StorageService) { }

  updateUserAccount(name: string) {
    const token = this.sessionStorageService.get("auth-token");
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const body = {
      newUserName: name
    };

    return this.httpClient.put(`${this.apiUrl}/`, body, { headers })
      .pipe(
        tap((value:any) => {
          this.sessionStorageService.set("userName", value.name);
          this.sessionStorageService.set("userEmail", value.email);
        })
      );
  }

  updateUserPassword(pass: string) {
    const token = this.sessionStorageService.get("auth-token");
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const body = {
      newPassword: pass
    };

    return this.httpClient.put<LoginResponse>(`${this.apiUrl}/change-password`, body, { headers });
  }

  deleteUserAccount(){
    const token = this.sessionStorageService.get("auth-token");
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }    

    return this.httpClient.delete<LoginResponse>(`${this.apiUrl}`, { headers });
  }


}
