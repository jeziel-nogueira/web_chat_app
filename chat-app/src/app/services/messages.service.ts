import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { MessageModel } from '../types/message.types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private apiUrl: string = "http://localhost:8080/api/messages";
  private newMessageSubject = new Subject<MessageModel>();
  newMessage$ = this.newMessageSubject.asObservable();

  constructor(private httpClient: HttpClient, private sessionStorageService:StorageService) { }

  sendMessage(receiverEmail: string, content: string): Observable<MessageModel[]> {
  const token = this.sessionStorageService.get("auth-token");
  let headers = new HttpHeaders();
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  const body = {
    receiverEmail,
    content
  };

  return this.httpClient.post<MessageModel[]>(`${this.apiUrl}/send`, body, { headers })
    .pipe(
      tap((messages) => {
        if (messages && messages.length > 0) {
          this.newMessageSubject.next(messages[messages.length - 1]);
        }
      })
    );
}


  sendGroupMessage(senderId: number, groupId: number, content: string): Observable<MessageModel> {
    const body = { senderId, content };
    const token = this.sessionStorageService.get("auth-token");
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.httpClient.post<MessageModel>(`${this.apiUrl}/group/${groupId}`, body, { headers })
      .pipe(
        tap((message) => {
          this.newMessageSubject.next(message);
        })
      );
  }

  getUserMessages(userId: number): Observable<MessageModel[]> {
    const token = this.sessionStorageService.get("auth-token");
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.httpClient.get<MessageModel[]>(`${this.apiUrl}/user/${userId}`, { headers });
  }

  getGroupMessages(groupId: number): Observable<MessageModel[]> {
    return this.httpClient.get<MessageModel[]>(`${this.apiUrl}/group/${groupId}`);
  }

  getMessageById(messageId: number): Observable<MessageModel> {
    return this.httpClient.get<MessageModel>(`${this.apiUrl}/${messageId}`);
  }

  updateMessage(messageId: number, newContent: string): Observable<MessageModel> {
    return this.httpClient.put<MessageModel>(`${this.apiUrl}/${messageId}`, { content: newContent });
  }

  deleteMessage(messageId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${messageId}`);
  }
}
