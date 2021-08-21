import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Constants } from 'src/app/core/constants/constants';
import { Link } from 'src/app/core/models/misc/link.model';
import { SearchResults } from 'src/app/core/models/search/search-results.model';
import { GithubSearchMainService } from 'src/app/core/services/search/github-search-main.service';

@Component({
  selector: 'app-results-container',
  templateUrl: './results-container.component.html',
  styleUrls: ['./results-container.component.scss']
})
export class ResultsContainerComponent {
  @Input() results!: SearchResults;
  @Output() clear = new EventEmitter();
  loading = false;
  constructor(private githubSearch: GithubSearchMainService) { }

  /** Fetch a result page based on link href */
  paginate(link: Link) {
    this.githubSearch.page(link)
      .subscribe(results => this.results = results,
        (err: HttpErrorResponse) => this.onPaginateError(err));
  }

  onPaginateError(err: HttpErrorResponse) {
    // todo: throw up a toastr?
  }

  clearResults() {
    this.clear.emit();
  }
  
  /** Sort results based on dropdown
   *  another way to possibly do this is grab all the props that can be parsed as an int
   *  and build the dropdown dynamically
   */
  sort(value: any) {
    let [prop, direction] = value.split(',')
    if (direction === SortDirection.asc) {
      this.results.items = this.results.items.sort((a: any, b: any) => a[prop] - b[prop]);
    } else {
      this.results.items = this.results.items.sort((a: any, b: any) => b[prop] - a[prop]);
    }
  }

}

enum SortDirection {
  asc = 'asc',
  desc = 'desc'
}
