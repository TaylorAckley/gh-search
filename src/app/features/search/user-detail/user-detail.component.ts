import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { GitHubUser } from 'src/app/core/models/search/github/github-user.model';
import { GithubSearchMainService } from 'src/app/core/services/search/github-search-main.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  $githubUser!: Observable<GitHubUser>;
  errorMessage!: string

  constructor(private githubSearch: GithubSearchMainService, private route: ActivatedRoute, private router: Router, private translate: TranslateService) { }

  ngOnInit(): void {
    this.fetchUser();
  }

  fetchUser() {
    const login = this.route.snapshot.params.login;
    /** Get the user record, no need to do first, or unsubscribe since we will unwrap it in the template using the async pipe */
    if (login) this.$githubUser = this.githubSearch.fetchUserRecord(login)
      .pipe(catchError((err: HttpErrorResponse) => this.onError(err)));
  }

  onError(error: HttpErrorResponse) {
    if (error.status === 404) {
      this.translate.get('TEXT_NO_USER').subscribe(t => this.errorMessage = t);
    } else {
      this.errorMessage = error.error.message;
    }
    return throwError(error);
  }
  
  back() {
    window.history.back();  //todo, should go back to the query results
  }

}
