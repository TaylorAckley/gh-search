import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Link, LinkRel } from '../../models/misc/link.model';
import { GitHubSearchResponse, LeanGitHubUser } from '../../models/search/github/github-search-response.model';
import { GitHubUser } from '../../models/search/github/github-user.model';
import { SearchResults } from '../../models/search/search-results.model';
import { BaseGithubSearch } from './base-github-search.service';

@Injectable({
  providedIn: 'root'
})
export class GithubSearchMainService extends BaseGithubSearch {

  constructor(http: HttpClient) {
    super(http)
  }

  search(term: string) {
    return this.fetchWithFullResponse<GitHubSearchResponse>(this.withSearchUri(term, 0, 0))
      .pipe(
        switchMap(response =>
          this.transformResponse(response)
        ) 
      );
  }

  /**  Transform the raw github response into something we can use
   *   We map over the array of users and fetch their full record,
   *   and use forkJoin to convert them from observables to objects
   *   We wrap the entire object in a forkJoin to stay inline with switchMap
   */
  private transformResponse(response: HttpResponse<GitHubSearchResponse>): Observable<SearchResults> {
    const links = this.extractLinks(response.headers)
    const body = response.body as GitHubSearchResponse;
    return forkJoin(
      {
        totalCount: of(body.total_count),
        items: forkJoin(body.items.map(leanUser => this.fetch<GitHubUser>(leanUser.url))),
        links: of(links)
      }
    )
  } 

  private extractLinks(responseHeaders: HttpHeaders) {
    const targetHeader = responseHeaders.get('Link');
    let links = targetHeader?.split(',').map(rawLink => {
      let [href, rel] = rawLink.split(';');
      return new Link(
        rel.trim().replace(/rel="/g, "").replace('"', "") as LinkRel, // todo - tweak regex so I can remove second replace
        href.replace(/[<>]/g, '').trim()
      )
    })
    return links;
  }
  

}
