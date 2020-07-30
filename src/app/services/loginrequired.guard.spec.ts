import { TestBed } from '@angular/core/testing';

import { LoginrequiredGuard } from './loginrequired.guard';

describe('LoginrequiredGuard', () => {
  let guard: LoginrequiredGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginrequiredGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
