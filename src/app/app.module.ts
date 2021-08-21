import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './features/layout/layout.module';
import { SearchModule } from './features/search/search.module';


/** @todo refactor into its own extension/file */
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
} 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    SearchModule,
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
