import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupMessagesComponent } from './user-group-messages.component';

describe('UserGroupMessagesComponent', () => {
  let component: UserGroupMessagesComponent;
  let fixture: ComponentFixture<UserGroupMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserGroupMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGroupMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
