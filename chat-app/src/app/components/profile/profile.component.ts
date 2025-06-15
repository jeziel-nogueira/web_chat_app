import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ChangeNameDialogComponent } from '../change-name-dialog/change-name-dialog.component';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { LoginResponse } from '../../types/login-response.types';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-profile',
  imports: [
    MatIcon,
    MatMenuModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  userName!:string | null;
  userEmail!:string | null;

  constructor(private dialog: MatDialog, private sessionStorageService:StorageService){}
  ngOnInit(): void {
    this.userName = this.sessionStorageService.get('userName')
    this.userEmail = this.sessionStorageService.get('userEmail')
  }

  changeNameEvent(event: Event): void {
    event.preventDefault();

    const dialogRef = this.dialog.open(ChangeNameDialogComponent);

    dialogRef.afterClosed().subscribe(name => {
      if(name){
        console.log(name)
      }
    })
  }

  changePasswordEvent(event: Event): void {
    event.preventDefault();

    const dialogRef = this.dialog.open(ChangePasswordDialogComponent);

    dialogRef.afterClosed().subscribe(pass => {
      if(pass){
        console.log(pass)
      }
    })    
  }
}
