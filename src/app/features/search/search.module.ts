import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { ResultComponent } from "./results-container/result/result.component";
import { ResultsContainerComponent } from "./results-container/results-container.component";
import { SearchFieldComponent } from "./search-field/search-field.component";
import { SearchComponent } from "./search.component";
import { UserDetailComponent } from "./user-detail/user-detail.component";

@NgModule({
    declarations: [
        SearchComponent,
        UserDetailComponent,
        SearchFieldComponent,
        ResultsContainerComponent,
        ResultComponent
    ],
    exports: [
        SearchComponent,
        UserDetailComponent,
        SearchFieldComponent,
        ResultsContainerComponent,
        ResultComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        TranslateModule.forChild({
            extend: true
        })
    ]
  })
  export class SearchModule { }