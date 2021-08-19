import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './features/layout/header/header.component';
import { AppIdentifierComponent } from './features/layout/header/app-identifier/app-identifier.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AppIdentifierComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
