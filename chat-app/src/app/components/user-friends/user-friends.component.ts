import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AddFriendDialogComponent } from '../add-friend-dialog/add-friend-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FriendsService } from '../../services/friends.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { SelectedChatFriendService } from '../../services/selected-chat-friend.service';

@Component({
  selector: 'app-user-friends',
  imports: [
    CommonModule,
    MatIcon
  ],
  templateUrl: './user-friends.component.html',
  styleUrl: './user-friends.component.scss'
})
export class UserFriendsComponent implements OnInit {
  @Output() chatSelected = new EventEmitter<any>()

  chats = [
    { name: "", email: "" },
  ];

  constructor(
    private dialog: MatDialog,
    private frindChatSelectService: SelectedChatFriendService,
    private friendsService: FriendsService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.chats = [];
    this.friendsService.getUsesrFriends().subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.chats = response.map((chat:any) => ({
            name: chat.name,
            email: chat.email
          }));
        }
      },
      error: (error) => {
        console.error('Erro ao carregar lista de grupos:', error);
      }
    });

    this.friendsService.friends$.subscribe(friends => {
      this.chats = friends;
    });
  }

  selectChat(chat: any) {
    this.frindChatSelectService.selectedChat(chat);
  }

  addFriendEvent(event: Event): void {
    event.preventDefault();

    const dialogRef = this.dialog.open(AddFriendDialogComponent);

    dialogRef.afterClosed().subscribe(email => {
      if (email) {
        this.friendsService.addFriend(email).subscribe({
          next: (response) => {
            if (Array.isArray(response) && response.length > 0) {
              this.chats = response.map(friend => ({
                name: friend.name,
                email: friend.email
              }));
              this.toastService.success("Novo amigo adicionado")
            }
          },
          error: (error: HttpErrorResponse) => {
            const message = error.error?.error || 'Erro inesperado';

            this.toastService.error(message);
          }
        });
      }
    });
  }
}
