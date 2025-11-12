import { TestBed } from '@angular/core/testing';

import { AccountMember } from './account-member';

describe('AccountMember', () => {
  let service: AccountMember;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountMember);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
