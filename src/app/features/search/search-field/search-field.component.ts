import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchResults } from 'src/app/core/models/search/search-results.model';
import { GithubSearchMainService } from 'src/app/core/services/search/github-search-main.service';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent {


  /** 
   *  Since this is a extremely simple form with only one input and rudimentary validation, I am using template driven forms
   *  More complex forms with complex validation, dynamic values, conditional show/hide would use the Reactive Forms.
   */

  @Output() results = new EventEmitter<SearchResults>();

  term!: string;
  errorMessage!: string;
  noResults = false;
  loading = false;
  constructor(private githubSearch: GithubSearchMainService, private router: Router) { }

  @ViewChild('f') f!: NgForm;

  onSubmit() {
    if (!this.term) return;
    this.loading = true;
    this.githubSearch.search(this.term)
      .subscribe(results => this.onResults(results),
        (err: HttpErrorResponse) => this.onError(err));
  }
  
  onResults(results: SearchResults) {
    this.loading = false;
    this.noResults = false;
    if (results.totalCount ?? 0 > 0) {
      this.results.emit(results);
      this.router.navigate(['.'], { queryParams: { term: this.term } });
    } else {
      this.f.resetForm();
      this.noResults = true;
    }
  }

  onError(err: HttpErrorResponse) {
    this.loading = false;
    this.errorMessage = err.error.message;
  }

}
