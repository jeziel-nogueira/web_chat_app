import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  imports: [
    CommonModule
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
  @Input() seen!: boolean;
  @Input() localUser: boolean = true;

  ngOnInit(): void {
    console.log("localUser is", this.localUser, "| senderEmail:", this.senderEmail);
  }

}
