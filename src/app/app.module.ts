import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './features/layout/header/header.component';
import { FooterComponent } from './features/layout/footer/footer.component';
import { SearchComponent } from './features/search/search.component';
import { SearchFieldComponent } from './features/search/search-field/search-field.component';
import { ShellComponent } from './features/layout/shell/shell.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

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
    ShellComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
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
  }),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
