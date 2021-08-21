import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
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
  constructor(private githubSearch: GithubSearchMainService, private router: Router, private toastr: ToastrService, private route: ActivatedRoute) { }

  /** Fetch a result page based on link href */
  paginate(link: Link) {
    this.githubSearch.page(link)
      .pipe(first())
      .subscribe(results => this.results = results,
        (err: HttpErrorResponse) => this.onError(err));
  }

  onError(err: HttpErrorResponse) {
    this.toastr.error(err.error.message);
  }

  clearResults() {
    this.clear.emit();
    this.router.navigate(['.']); // will wipe out the term query param
  }

  
  /** Sort results based on dropdown
   *  another way to possibly do this is grab all the props that can be parsed as an int
   *  and build the dropdown dynamically
   */
  sort(value: any) {
    let [sort, direction] = value.split(',')
    this.route.queryParams.subscribe(params => {
      this.githubSearch.search(params.term, sort, direction)
        .pipe(first())
        .subscribe(results => this.results = results, (err) => this.onError(err));
    });
  }
}
