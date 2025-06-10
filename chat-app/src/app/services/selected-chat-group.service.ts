import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedChatGroupService {
  private selectedChatSource = new BehaviorSubject<any>(null);
    selectedChat$ = this.selectedChatSource.asObservable();
  
    constructor() { }
  
    selectedChat(chat:any){
      this.selectedChatSource.next(chat);
    }
}
