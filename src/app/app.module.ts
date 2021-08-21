import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './features/layout/footer/footer.component';
import { HeaderComponent } from './features/layout/header/header.component';
import { ShellComponent } from './features/layout/shell/shell.component';
import { ResultComponent } from './features/search/results-container/result/result.component';
import { ResultsContainerComponent } from './features/search/results-container/results-container.component';
import { SearchFieldComponent } from './features/search/search-field/search-field.component';
import { SearchComponent } from './features/search/search.component';
import { UserDetailComponent } from './features/search/user-detail/user-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


/** @todo refactor into its own extension/file */
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
} 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    SearchFieldComponent,
    ShellComponent,
    ResultsContainerComponent,
    ResultComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    /** 
     * Setup NGX Translate - if this was a more complicated app we might want to detect the users browser language or use api reflection with the accept header
     * but we're only English, so we'll keep this simpler.
     */
     TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
