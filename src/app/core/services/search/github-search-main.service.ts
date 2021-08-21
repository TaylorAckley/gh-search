import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Link, LinkRel } from '../../models/misc/link.model';
import { GitHubSearchResponse, LeanGitHubUser } from '../../models/search/github/github-search-response.model';
import { GitHubUser, GitHubUserCustom } from '../../models/search/github/github-user.model';
import { SearchResults } from '../../models/search/search-results.model';
import { BaseGithubSearch } from './base-github-search.service';

@Injectable({
  providedIn: 'root'
})
export class GithubSearchMainService extends BaseGithubSearch {

  constructor(http: HttpClient) {
    super(http)
  }

  /** Public Methods */

  search(term: string, sort?: string, direction?: string) {
    return this.fetchWithFullResponse<GitHubSearchResponse>(this.withSearchUri(term, sort, direction))
      .pipe(
        switchMap(response =>
          this.transformResponse(response)
        ) 
      );
  }

  page(link: Link) {
    return this.fetchWithFullResponse<GitHubSearchResponse>(link.href)
      .pipe(
        switchMap(response =>
          this.transformResponse(response)
        ) 
      );
  }

  fetchUserRecord(login: string) {
    return this.fetch<GitHubUser>(this.withUserUri(login));
  }

  /** Private Methods */

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
        items: body.items.length ? forkJoin(body.items.map(leanUser => this.transformUser(leanUser))) : of([]),
        links: of(links)
      }
    )
  }

  /** Grab the full user record */
  private transformUser(leanUser: LeanGitHubUser) {
    return this.fetch<GitHubUser>(leanUser.url).pipe(map(githubUser => this.addUserLinks(githubUser)));
  }

  /** Add a Link to the user for easy navigation to their page */
  private addUserLinks(githubUser: GitHubUser): GitHubUserCustom {
    (githubUser as GitHubUserCustom).links = [new Link(LinkRel.page, `users/${githubUser.login}`)];
    return githubUser as GitHubUserCustom;
  }

  /** The Github API returnbs a Link header containing pagination links
   *  We can use some string parsing to build a list of links we can use to navigate
   *  through the results.
   */
  private extractLinks(responseHeaders: HttpHeaders) {
    const targetHeader = responseHeaders.get('Link');
    let links: Link[] = [];
    if (targetHeader) {
      links = targetHeader?.split(',').map(rawLink => {
        let [href, rel] = rawLink.split(';');
        return new Link(
          rel.trim().replace(/rel="/g, "").replace('"', "") as LinkRel, // todo - tweak regex so I can remove second replace
          href.replace(/[<>]/g, '').trim()
        )
      });
    }
    return links;
  }

}
