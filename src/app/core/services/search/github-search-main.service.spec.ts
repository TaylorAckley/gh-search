import { TestBed } from '@angular/core/testing';

import { GithubSearchMainService } from './github-search-main.service';

describe('GithubSearchMainService', () => {
  let service: GithubSearchMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubSearchMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
