# NGX Angular Loading
[![Build Status](https://travis-ci.org/bculley/ngx-angular-loading.svg?branch=master)](https://travis-ci.org/bculley/ngx-angular-loading) [![NPM version](https://img.shields.io/npm/v/ngx-angular-loading.svg)](https://www.npmjs.com/package/ngx-angular-loading)

It is a library to makes loading screens easier in Angular (2+)

## Credits

This project was seeded by [https://github.com/darthwade/angular-loading](https://github.com/darthwade/angular-loading) because the author was not responding to pull requests so decided to take what they had started and update and run with it. Along the way we put some of our own opinions on it and added some tests, enough changes that it stopped being a viable PR for the original without serious breaking changes.

## Migrating from angularjs dwloading

Markup:

From AngularJS
```html
<div dwLoading="updating" [dwLoadingOptions]="spinnerConfig">
```
To Angular 2+
```html
<div ngxLoading="updating" [loadingOptions]="spinnerConfig">
```

## Installation
```npm
npm install ngx-angular-loading
```

## Step 1. Import the 'NGXLoadingModule' module
```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NGXLoadingModule } from 'ngx-angular-loading';
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
```

## Step 2. Include NGXLoadingService in your component
Use the service to *start* and *finish* the different loading screens
You may use *$loading* for legacy or rename your references to ngxLoadingService

```ts
import { Component } from '@angular/core';
import { NGXLoadingService } from 'ngx-angular-loading';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-angular-loading demo';

  isLoading = false;

  public spinnerConfig: any;

  constructor(private $loading: NGXLoadingService) {
    this.spinnerConfig = {
      text: 'Loading...',
      spinnerOptions: {
          color: '#0078D2'
      }
    };
  }

  public onButtonClick() {
    this.isLoading
      ? this.$loading.finish('updating')
      : this.$loading.start('updating');

    this.isLoading = !this.isLoading;
  }
}
```