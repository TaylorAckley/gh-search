import { Component, OnInit } from '@angular/core';
import { SearchResults } from 'src/app/core/models/search/search-results.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchResults!: SearchResults | undefined;
  constructor() { }

  ngOnInit(): void {
  }

  onResults(results: SearchResults) {
    this.searchResults = results;
  }
  
  clearResults() {
    this.searchResults = undefined;
  }

}
