import { TestBed } from '@angular/core/testing';

import { AuthorizeUserGuard } from './authorize-user.guard';

describe('AuthorizeUserGuard', () => {
  let guard: AuthorizeUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorizeUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
