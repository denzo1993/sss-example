import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SssCoreModule } from 'sss-core-lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SssCoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
