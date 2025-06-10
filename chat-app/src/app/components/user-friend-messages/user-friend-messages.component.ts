import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageModel } from '../../types/message.types';
import { Subscription } from 'rxjs';
import { SelectedChatFriendService } from '../../services/selected-chat-friend.service';
import { MessagesService } from '../../services/messages.service';
import { CommonModule } from '@angular/common';
import { MessageComponent } from "../message/message.component";
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-user-friend-messages',
  imports: [
    CommonModule,
    MessageComponent
  ],
  templateUrl: './user-friend-messages.component.html',
  styleUrl: './user-friend-messages.component.scss'
})
export class UserFriendMessagesComponent implements OnInit {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  messages: MessageModel[] = [];
  private newMessageSub!: Subscription;
  selectedChat: any = null;
  localUser:string = '';

  constructor(
    private selectedFriendChatService: SelectedChatFriendService,
    private messageService: MessagesService,
    private storageService: StorageService
  ) {
    this.localUser = (this.storageService.get('userName') || '').trim().toLowerCase();
  }

  ngOnInit(): void {
    this.selectedFriendChatService.selectedChat$.subscribe(chat => {
      if (chat) {
        this.selectedChat = chat;

        this.messageService.getUserMessages(chat.email).subscribe((msgs) => {
          this.messages = msgs;
          setTimeout(() => this.scrollToBottom(), 0);
        });
      }
    });

    this.newMessageSub = this.messageService.newMessage$.subscribe((newMessage) => {
      this.messages.push(newMessage as MessageModel);
      setTimeout(() => this.scrollToBottom(), 0);
    });
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.warn('Erro ao rolar para baixo:', err);
    }
  }

  send(content: string) {
    if (!this.selectedChat?.email || !content.trim()) return;

    this.messageService.sendMessage(this.selectedChat.email, content.trim())
      .subscribe((messages) => {
        this.messages = messages;
      });
  }
}
