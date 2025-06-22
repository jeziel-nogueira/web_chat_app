import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-message',
  imports: [
    CommonModule,
    MatIcon,
    MatMenuModule,
    FormsModule
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit {
  @Input() id!: string;
  @Input() senderName!: string;
  @Input() senderEmail!: string;
  @Input() content!: string;
  @Input() timestamp!: Date;
  @Input() localUser: boolean = true;

  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<{ id: string, newContent: string }>();

  isEditing = false;
  editedContent = '';

  constructor(private toastService: ToastrService){

  }

  ngOnInit(): void {
    console.log(this.senderEmail)
  }

  deleteMessage(): void {
    this.delete.emit(this.id);
  }

  startEdit(): void {
    this.editedContent = this.content;
    this.isEditing = true;
  }

  saveEdit(): void {
    if(!this.editedContent.trim()){
      this.toastService.warning('Mensagem não pode ser vazia');
    }
    if (this.editedContent.trim() && this.editedContent !== this.content) {
      this.edit.emit({ id: this.id, newContent: this.editedContent.trim() });
    }
    this.isEditing = false;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editedContent = '';
  }
}