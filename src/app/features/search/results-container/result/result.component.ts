import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkRel } from 'src/app/core/models/misc/link.model';
import { GitHubUserCustom } from 'src/app/core/models/search/github/github-user.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  @Input() result!: GitHubUserCustom;
  constructor(private router: Router, private route: ActivatedRoute) { }

  gotoResultDetails(result: GitHubUserCustom) {
    const link = result.links.find(link => link.rel = LinkRel.page);
    if (link?.href) this.router.navigate([link.href], { relativeTo: this.route });
  }

}
