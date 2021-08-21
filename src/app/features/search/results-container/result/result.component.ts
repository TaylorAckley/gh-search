import { Component, Input, OnInit } from '@angular/core';
import { GitHubUser } from 'src/app/core/models/search/github/github-user.model';
import { faExternalLinkAlt, faStar, faCodeBranch } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  faExternalLink = faExternalLinkAlt;
  faStar = faStar;
  faCodeBranch = faCodeBranch;
  @Input() result!: GitHubUser;
  constructor() { }

}
