import { Component } from '@angular/core';
import { NGXLoadingService } from 'ngx-angular-loading/src/ngx-angular-loading/ngx-angular-loading.service';

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
