import { Component, ElementRef, ViewChild } from '@angular/core';
import { GroupMessageModel, MessageModel } from '../../types/message.types';
import { Subscription } from 'rxjs';
import { SelectedChatGroupService } from '../../services/selected-chat-group.service';
import { MessagesService } from '../../services/messages.service';
import { StorageService } from '../../services/storage.service';
import { GroupService } from '../../services/group.service';
import { MessageComponent } from "../message/message.component";
import { CommonModule } from '@angular/common';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-group-messages',
  imports: [
    MessageComponent,
    CommonModule
  ],
  templateUrl: './user-group-messages.component.html',
  styleUrl: './user-group-messages.component.scss'
})
export class UserGroupMessagesComponent {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  messages: GroupMessageModel[] = [];
  selectedGroup: any = null;
  userEmail: string = '';
  private newMessageSub!: Subscription;

  constructor(
    private selectedGroupChatService: SelectedChatGroupService,
    private messageService: GroupService,
    private storageService: StorageService,
    private toastService: ToastrService
  ) {
    this.userEmail = (this.storageService.get('userEmail') || '').trim().toLowerCase();
  }

  ngOnInit(): void {
    this.selectedGroupChatService.selectedChat$.subscribe(group => {
      if (group) {
        this.selectedGroup = group;
        this.loadMessages();
      }
    });

    this.newMessageSub = this.messageService.newGroupMessage$.subscribe((newMessage) => {
      if (newMessage.groupId === this.selectedGroup?.id) {
        this.messages.push(newMessage);
        setTimeout(() => this.scrollToBottom(), 0);
      }
    });
  }

  loadMessages() {
    this.messageService.getGroupMessages(this.selectedGroup.name).subscribe((msgs) => {
      this.messages = msgs;
      setTimeout(() => this.scrollToBottom(), 0);
    });
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.warn('Erro ao rolar para baixo:', err);
    }
  }

  send(content: string) {
    if (!this.selectedGroup?.id || !content.trim()) return;

    this.messageService.sendGroupMessage(this.selectedGroup.name, content.trim())
      .subscribe((messages) => {
        this.messages = messages;
      });
  }

  onEditMessage(data: { id: string, newContent: string }): void {
    console.log('Mensagem editada:', data);
    this.messageService.editMessage(data.id, data.newContent)
      .subscribe({
        next:() => { this.loadMessages(); },
        error:(err) =>{ this.toastService.error(err.error.error); }
      });
  }

  onDeleteMessage(msgId: string): void {

    this.messageService.deleteMessage(msgId).subscribe({
      next: () => {
        this.loadMessages();
      },
      error: (err) => { this.toastService.error(err.error.error); },
      complete: () => { this.toastService.success('Mensagem deletada'); }
    });
  }
}
