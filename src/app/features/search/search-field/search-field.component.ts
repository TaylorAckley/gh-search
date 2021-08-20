import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchResults } from 'src/app/core/models/search/search-results.model';
import { GithubSearchMainService } from 'src/app/core/services/search/github-search-main.service';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit {

  @Output() result = new EventEmitter<SearchResults>();

  term!: string;
  constructor(private githubSearch: GithubSearchMainService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.githubSearch.search(this.term).subscribe(results => this.onResults(results));
  }
  
  onResults(results: SearchResults) {
    console.log(results);
  }

}
