import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/core/constants/constants';
import { SearchResults } from 'src/app/core/models/search/search-results.model';
import { GithubSearchMainService } from 'src/app/core/services/search/github-search-main.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchResults!: SearchResults | undefined;
  constructor(private githubSearch: GithubSearchMainService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
       /** If the page is loaded with a initial query param - execute a search on specified query param if
        *  ALLOW_INITIAL_SEARCH is set to to true, otherwise, wipe out the query param.
        */
      if (params.term && Constants.ALLOW_INITIAL_SEARCH) {
        this.searchOnQuery(params.term);
      } else {
        this.router.navigate(['.']);
      }
    });
  }

   /** search on query */
  searchOnQuery(term: string) {
    this.githubSearch.search(term)
      .pipe(first())
      .subscribe(results => this.searchResults = results, (err) => this.onError(err));

  }

  onError(err: HttpErrorResponse) {
    this.toastr.error(err.error.message);
  }

  onResults(results: SearchResults) {
    this.searchResults = results;
  }
  
  clearResults() {
    this.searchResults = undefined;
  }

}
