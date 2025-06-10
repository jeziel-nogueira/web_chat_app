import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFriendMessagesComponent } from './user-friend-messages.component';

describe('UserFriendMessagesComponent', () => {
  let component: UserFriendMessagesComponent;
  let fixture: ComponentFixture<UserFriendMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFriendMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFriendMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
