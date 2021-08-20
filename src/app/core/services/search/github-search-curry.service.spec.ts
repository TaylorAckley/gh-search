import { TestBed } from '@angular/core/testing';

import { GithubSearchCurryService} from './github-search-curry.service';

describe('GithubSearchCurryService', () => {
  let service: GithubSearchCurryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubSearchCurryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
