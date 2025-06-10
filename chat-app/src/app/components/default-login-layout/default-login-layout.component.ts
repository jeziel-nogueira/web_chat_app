import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-login-layout',
  imports: [],
  templateUrl: './default-login-layout.component.html',
  styleUrl: './default-login-layout.component.scss'
})
export class DefaultLoginLayoutComponent {
  @Input()page_title:string =  'Page Title';
  @Input()primary_btn_txt:string =  'primary_btn';
  @Input()secondary_btn_txt:string =  'secondary_btn';
  @Input() disablePrimaryButton:boolean = true;

  @Output("submit") onSubmit = new EventEmitter();
  @Output("navigate") onnavigate = new EventEmitter();

  submit(){this.onSubmit.emit();}
  navigate(){this.onnavigate.emit();}
}
