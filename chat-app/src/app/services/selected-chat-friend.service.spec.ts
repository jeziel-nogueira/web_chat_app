import { TestBed } from '@angular/core/testing';

import { SelectedChatFriendService } from './selected-chat-friend.service';

describe('SelectedChatFriendService', () => {
  let service: SelectedChatFriendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedChatFriendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
