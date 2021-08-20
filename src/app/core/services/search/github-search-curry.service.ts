import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GitHubSearchResponse } from '../../models/search/github/github-search-response.model';
import { BaseGithubSearch } from './base-github-search.service';

/** This is an alternate implementation of the main service that uses currying instead
 *  With Angular you don't really need to use currying (well, when do you ever really NEED to)
 *  But with other legacy apps, or vanilla js, currying might help
 */

@Injectable({
  providedIn: 'root'
})
export class GithubSearchCurryService extends BaseGithubSearch {
  searchClient!: (term: string) => Observable<any>;
  constructor(http: HttpClient) {
    super(http)
  }

  search(term: string) {
    if (!this.searchClient) {
      this.searchClient = this.searchClientFactory();
    }
    return this.searchClient(term);
  }

  /** Just for fun - an implementation that uses currying and lexical this.
   *  A real app would keep to the implementation that's used.
   *  Usage:
   *  ```
   *  const search = this.searchClient(term);
   *  return search(); // returns an observable
   * ```
   */

  private searchClientFactory(): () => Observable<any> {
    const PAGE_SIZE = 30; // default
    let since = 0; // will hold the last userid for pagination
    let term: string;
    let page = 1;
    return (_term?: string) => {
      if(_term) term = _term;
      return this.fetch<GitHubSearchResponse>(this.withSearchUri(term, since, page))
        .pipe(tap({
          next: (response: any) => {
            since = response.items[response.items.length - 1]?.id ?? 0;
            page++;
        }}));
    }
  }

}

