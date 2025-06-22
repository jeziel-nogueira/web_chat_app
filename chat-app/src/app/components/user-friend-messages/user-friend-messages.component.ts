import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MessageModel } from '../../types/message.types';
import { Subscription } from 'rxjs';
import { SelectedChatFriendService } from '../../services/selected-chat-friend.service';
import { MessagesService } from '../../services/messages.service';
import { CommonModule } from '@angular/common';
import { MessageComponent } from "../message/message.component";
import { StorageService } from '../../services/storage.service';
import { MatIcon } from '@angular/material/icon';
import { FriendsService } from '../../services/friends.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-friend-messages',
  imports: [
    CommonModule,
    MessageComponent,
    MatIcon
  ],
  templateUrl: './user-friend-messages.component.html',
  styleUrl: './user-friend-messages.component.scss'
})
export class UserFriendMessagesComponent implements OnInit {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  @Output() friendRemoved = new EventEmitter<string>();
  messages: MessageModel[] = [];
  private newMessageSub!: Subscription;
  selectedChat: any = null;
  userEmail: string = '';

  constructor(
    private selectedFriendChatService: SelectedChatFriendService,
    private messageService: MessagesService,
    private friendsService: FriendsService,
    private storageService: StorageService,
    private toastService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.userEmail = (this.storageService.get('userEmail') || '').trim().toLowerCase();
    this.selectedFriendChatService.selectedChat$.subscribe(chat => {
      if (chat) {
        this.selectedChat = chat;
        this.loadMessages();
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

  loadMessages() {
    this.messageService.getUserMessages(this.selectedChat.email).subscribe((msgs) => {
      this.messages = msgs;
      setTimeout(() => this.scrollToBottom(), 0);
    });
  }

  send(content: string) {
    if (!this.selectedChat?.email || !content.trim()) return;

    this.messageService.sendMessage(this.selectedChat.email, content.trim())
      .subscribe({
        next: () =>{
          this.loadMessages();
        },
        error: (err) => { this.toastService.error(err.error.error); }
      });
  }

  deleteFriend(email: string) {
    this.friendsService.removeFriend(email).subscribe({
      next: (updatedFriends) => {
        this.toastService.success('Amigo removido com sucesso');
      },
      error: (err) => {
        this.toastService.error('Erro ao remover amigo');
        console.error(err);
      }
    });
  }

  onEditMessage(data: { id: string, newContent: string }): void {
    console.log('Mensagem editada:', data);
    this.messageService.updateMessage(data.id, data.newContent)
      .subscribe({
        next: () => { 
          this.loadMessages(); 
          this.toastService.success('Mensagem atualizada');
        },
        error: (err) => { this.toastService.error(err.error.error); }
      });
  }

  onDeleteMessage(msgId: string): void {

    this.messageService.deleteMessage(msgId).subscribe({
      next: () => {
        this.loadMessages();
      },
      error: (err) => { this.toastService.warning(err.error.error); },
      complete: () => { this.toastService.success('Mensagem deletada'); }
    });
  }
}
