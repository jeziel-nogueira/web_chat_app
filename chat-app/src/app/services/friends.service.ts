import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { Friend } from '../types/friend.types';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private apiUrl: string = "http://localhost:8080/api/users/friends";
  private friendSubject = new BehaviorSubject<Friend[]>([]);
  friends$ = this.friendSubject.asObservable();

  constructor(private httpClient: HttpClient, private sessionStorageService: StorageService) { }

  getUsesrFriends() {
    const token = this.sessionStorageService.get("auth-token");
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.httpClient.get<Friend[]>(`${this.apiUrl}`, { headers }).pipe(
      tap(friends => this.friendSubject.next(friends))
    );
  }

  addFriend(friendEmail: string) {
    const token = this.sessionStorageService.get("auth-token");

    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();

    const body = {
      email: friendEmail
    };

    return this.httpClient.post<Friend[]>(`${this.apiUrl}`, body, { headers }).pipe(
      tap(updatedFriends => this.friendSubject.next(updatedFriends))
    );
  }

  removeFriend(friendEmail: string) {
    const token = this.sessionStorageService.get("auth-token");

    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();

    const body = {
      email: friendEmail
    };

    return this.httpClient.post<Friend[]>(`http://localhost:8080/api/users/friends-remove`, body, { headers }).pipe(
      tap(updatedFriends => this.friendSubject.next(updatedFriends))
    );
  }
}
