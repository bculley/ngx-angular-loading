import {
    Directive,
    Input,
    SimpleChanges,
    OnChanges,
    ElementRef,
    AfterViewInit,
    OnDestroy
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import merge from 'lodash-es/merge';
import * as Spinner from 'spin';

import { NGXLoadingService } from './ngx-angular-loading.service';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[ngxLoading]'
})
export class NGXLoadingDirective implements OnChanges, OnDestroy {
    // tslint:disable-next-line:no-input-rename
    @Input('ngxLoading') key: any = false;
    @Input() loadingOptions: any;

    spinner = null;
    options;
    container;
    body;
    spinnerContainer;
    text;

    startSubscription: Subscription;
    finishSubscription: Subscription;

    constructor(
        private ngxLoadingService: NGXLoadingService,
        private myElement: ElementRef) { }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.startSubscription.unsubscribe();
        this.finishSubscription.unsubscribe();
        this.finish();
        this.spinner = null;
    }

    ngOnChanges(inputs: SimpleChanges) {
        if (inputs.dwLoadingOptions) {
            if (!inputs.dwLoadingOptions.isFirstChange()) {
                this.finish();
            }

            this.options = merge({}, this.ngxLoadingService.ngxLoadingOptions, inputs.dwLoadingOptions.currentValue);

            // Build template
            this.body = this.newDiv('ngx-loading-body');

            this.container = this.newDiv('ngx-loading').append(this.body);

            if (this.options.overlay) {
                this.container.addClass('ngx-loading-overlay');
            }
            if (this.options.className) {
                this.container.addClass(this.options.className);
            }
            if (this.options.spinner) {
                this.spinnerContainer = this.newDiv('ngx-loading-spinner');
                this.body.append(this.spinnerContainer);
                this.spinner = new Spinner(this.options.spinnerOptions);
            }
            if (this.options.text) {
                this.text = this.newDiv('ngx-loading-text').text(this.options.text);
                this.body.append(this.text);
            }

            $(this.myElement.nativeElement).append(this.container);

            if (this.options.active || !this.key) {
                this.start();
            }

            if (inputs.dwLoadingOptions.isFirstChange()) {
                this.startSubscription = this.ngxLoadingService.ngxLoadingStart$
                    .subscribe((item) => {
                        if (item === this.key) {
                            this.start();
                        }
                    });

                this.finishSubscription = this.ngxLoadingService.ngxLoadingFinish$
                    .subscribe((item) => {
                        if (item === this.key) {
                            this.finish();
                        }
                    });
            }

        }
    }

    newDiv(className: string) {
        return $('<div></div>').addClass(className);
    }

    /**
     * Starts spinner
     */
    start() {
        if (this.container) {
            this.container.addClass('ngx-loading-active');
        }
        if (this.spinner) {
            this.spinner.spin(this.spinnerContainer[0]);
        }
    }

    /**
     * Stops spinner
     */
    finish() {
        if (this.container) {
            this.container.removeClass('ngx-loading-active');
        }
        if (this.spinner) {
            this.spinner.stop();
        }
    }
}
