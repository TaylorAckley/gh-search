import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GithubSearchMainService } from 'src/app/core/services/search/github-search-main.service';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    const githubSearchService = jasmine.createSpyObj('GithubSearchMainService', ['search']);
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      providers: [{provide: GithubSearchMainService, useValue: githubSearchService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
