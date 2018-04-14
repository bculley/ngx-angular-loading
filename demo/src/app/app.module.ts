import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NGXLoadingModule } from 'ngx-angular-loading/src/ngx-angular-loading/ngx-angular-loading.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NGXLoadingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
