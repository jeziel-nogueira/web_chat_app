import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ChangeNameDialogComponent } from '../change-name-dialog/change-name-dialog.component';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { LoginResponse } from '../../types/login-response.types';
import { StorageService } from '../../services/storage.service';
import { DeletaAccountDialogComponent } from '../deleta-account-dialog/deleta-account-dialog.component';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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

  userName!: string | null;
  userEmail!: string | null;

  constructor(
    private dialog: MatDialog,
    private sessionStorageService: StorageService,
    private userService: UserService,
    private toastService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void { this.updateUser();}


  updateUser() {
    this.userName = this.sessionStorageService.get('userName')
    this.userEmail = this.sessionStorageService.get('userEmail')
  }

  changeNameEvent(event: Event): void {
    event.preventDefault();

    const dialogRef = this.dialog.open(ChangeNameDialogComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        this.userService.updateUserAccount(name).subscribe({
          next: () => {
            this.updateUser();
            this.toastService.success("Nome atualizado com sucesso.");
          },
          error: () => this.toastService.error("Erro ao atualizar nome."),
        });
      }
    })
  }

  changePasswordEvent(event: Event): void {
    event.preventDefault();

    const dialogRef = this.dialog.open(ChangePasswordDialogComponent);

    dialogRef.afterClosed().subscribe(pass => {
      if (pass) {
        this.userService.updateUserPassword(pass).subscribe({
          next: () => {
            this.toastService.success("Senha atualizada com sucesso.");
          },
          error: () => this.toastService.error("Erro ao atualizar senha."),
        });
      }
    })
  }

  deleteAccountEvent(event: Event): void {
    event.preventDefault();

    const dialogRef = this.dialog.open(DeletaAccountDialogComponent);

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.userService.deleteUserAccount().subscribe({
          next: () => {
            this.toastService.success("Conta deletada com sucesso.");
            this.sessionStorageService.clear();
            this.router.navigate(['']);
          },
          error: () => this.toastService.error("Erro ao deletar conta."),
        });
      }
    })
  }
}
