import { TestBed } from '@angular/core/testing';

import { SelectedChatGroupService } from './selected-chat-group.service';

describe('SelectedChatGroupService', () => {
  let service: SelectedChatGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedChatGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
