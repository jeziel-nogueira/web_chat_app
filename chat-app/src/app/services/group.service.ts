import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Group } from '../types/group.types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { GroupMessageModel } from '../types/message.types';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl: string = "http://localhost:8080/api/groups";
  private newGroupMessageSubject = new Subject<GroupMessageModel>();
  newGroupMessage$ = this.newGroupMessageSubject.asObservable();

  constructor(private httpClient: HttpClient, private sessionStorageService: StorageService) { }

  getUsesrGroups() {
    const token = this.sessionStorageService.get("auth-token");
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.httpClient.get<Group[]>(`${this.apiUrl}`, { headers });
  }

  createGroup(groupName: string) {
    const token = this.sessionStorageService.get("auth-token");

    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();

    const body = {
      name: groupName
    };

    return this.httpClient.post<Group[]>(`${this.apiUrl}`, body, { headers });
  }

  findGroup(groupName: string) {
    const token = this.sessionStorageService.get("auth-token");

    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();

    const body = {
      name: groupName
    };

    return this.httpClient.post<Group[]>(`${this.apiUrl}/join`, body, { headers });
  }

  getGroupMessages(groupName: string): Observable<GroupMessageModel[]> {
    const token = this.sessionStorageService.get("auth-token");
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.httpClient.get<GroupMessageModel[]>(`${this.apiUrl}/messages/${groupName}`, { headers });
  }

  sendGroupMessage(groupName: string, content: string): Observable<GroupMessageModel[]> {
    const token = this.sessionStorageService.get("auth-token");
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const body = { content };

    return this.httpClient.post<GroupMessageModel[]>(`${this.apiUrl}/messages/${groupName}`, body, { headers })
      .pipe(
        tap((messages) => {
          if (messages && messages.length > 0) {
            this.newGroupMessageSubject.next(messages[messages.length - 1]);
          }
        })
      );
  }

  editMessage(id: string, content: string): Observable<void> {
    const token = this.sessionStorageService.get("auth-token");
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.httpClient.put<void>(`${this.apiUrl}/messages/${id}`, content, { headers });
  }

  deleteMessage(msgId: string) {
    const token = this.sessionStorageService.get("auth-token");
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.httpClient.delete<GroupMessageModel[]>(`${this.apiUrl}/messages/${msgId}`, { headers: headers });
  }
}
