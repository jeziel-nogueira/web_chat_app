import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectedChatGroupService } from '../../services/selected-chat-group.service';
import { GroupService } from '../../services/group.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CreateGroupDialogComponent } from '../create-group-dialog/create-group-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { FindGroupDialogComponent } from '../find-group-dialog/find-group-dialog.component';
import { group } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { Group } from '../../types/group.types';

@Component({
  selector: 'app-user-groups',
  imports: [
    CommonModule,
    MatIcon,
    MatMenuModule
  ],
  templateUrl: './user-groups.component.html',
  styleUrl: './user-groups.component.scss'
})
export class UserGroupsComponent implements OnInit {
  @Output() chatSelected = new EventEmitter<Group>();

  chats: Group[] = [];

  constructor(
    private dialog: MatDialog,
    private groupChatSelectService: SelectedChatGroupService,
    private groupService: GroupService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.groupService.getUsesrGroups().subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.chats = response.map((group: Group) => ({
            id: group.id,
            name: group.name,
            membersIds: group.membersIds,
            creatorId: group.creatorId,
            creatorName: group.creatorName,
            creatorEmail: group.creatorEmail,
          }));
        }
        console.log(this.chats);
      },
      error: (error) => {
        console.error('Erro ao carregar lista de grupos:', error);
      }
    });
  }

  selectChat(chat: any) {
    this.groupChatSelectService.selectedChat(chat);
    console.log(chat)
  }

  searchGroup(event: Event): void {
    event.preventDefault();
    const dialogRef = this.dialog.open(FindGroupDialogComponent);
    dialogRef.afterClosed().subscribe(groupName => {
      if (groupName) {
        console.log('Buscar grupo com nome:', groupName);
        this.groupService.findGroup(groupName).subscribe({
          next: (response) => {
            if (Array.isArray(response)) {
              this.chats = response.map((group: Group) => ({
                id: group.id,
                name: group.name,
                membersIds: group.membersIds,
                creatorId: group.creatorId,
                creatorName: group.creatorName,
                creatorEmail: group.creatorEmail,
              }));
            }

            console.log("É array?", Array.isArray(this.chats));
            console.log("Tipo de chats:", typeof this.chats);
          },
          error: (error: HttpErrorResponse) => {
            const message = error.error?.error || 'Erro inesperado';

            this.toastService.error(message);
          }
        });
      }
    });
  }

  createGroup(event: Event): void {
    event.preventDefault();

    const dialogRef = this.dialog.open(CreateGroupDialogComponent);

    dialogRef.afterClosed().subscribe(groupName => {
      if (groupName) {
        console.log('Criar grupo com nome:', groupName);
        this.groupService.createGroup(groupName).subscribe({
          next: (response) => {
            if (Array.isArray(response)) {
              this.chats = response.map((group: Group) => ({
                id: group.id,
                name: group.name,
                membersIds: group.membersIds,
                creatorId: group.creatorId,
                creatorName: group.creatorName,
                creatorEmail: group.creatorEmail,
              }));
            }
          },
          error: (error) => {
            const errorMsg = error?.error?.error || 'Erro ao criar grupo.';
            this.toastService.error(errorMsg);
          }
        });
      }
    });
  }
}