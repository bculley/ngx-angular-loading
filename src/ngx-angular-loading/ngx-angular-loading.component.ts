import {
    Directive,
    Input,
    SimpleChanges,
    OnChanges,
    ElementRef,
    AfterViewInit,
    OnDestroy,
    Renderer2
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
        private renderer: Renderer2,
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
        if (inputs.loadingOptions) {
            if (!inputs.loadingOptions.isFirstChange()) {
                this.finish();
            }

            this.options = merge({}, this.ngxLoadingService.ngxLoadingOptions, inputs.loadingOptions.currentValue);

            // Build template
            this.body = this.newDiv('ngx-loading-body');

            this.container = this.newDiv('ngx-loading');
            this.renderer.appendChild(this.container, this.body);

            if (this.options.overlay) {
                this.renderer.addClass(this.container, 'ngx-loading-overlay');
            }
            if (this.options.className) {
                this.renderer.addClass(this.container, this.options.className);
            }
            if (this.options.spinner) {
                this.spinnerContainer = this.newDiv('ngx-loading-spinner');
                this.renderer.appendChild(this.body, this.spinnerContainer);
                this.spinner = new Spinner(this.options.spinnerOptions);
            }
            if (this.options.text) {
                this.text = this.newDiv('ngx-loading-text');
                const mytext = this.renderer.createText(this.options.text);
                this.renderer.appendChild(this.text, mytext);
                this.renderer.appendChild(this.body, this.text);
            }

            this.renderer.appendChild(this.myElement.nativeElement, this.container);

            if (this.options.active || !this.key) {
                this.start();
            }

            if (inputs.loadingOptions.isFirstChange()) {
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
        let change_this;
        change_this = this.renderer.createElement('div');
        this.renderer.addClass(change_this, className);
        return change_this;
    }

    /**
     * Starts spinner
     */
    start() {
        if (this.container) {
            this.renderer.addClass(this.container, 'ngx-loading-active');
        }
        if (this.spinner) {
            this.spinner.spin(this.spinnerContainer);
        }
    }

    /**
     * Stops spinner
     */
    finish() {
        if (this.container) {
            this.renderer.removeClass(this.container, 'ngx-loading-active');
        }
        if (this.spinner) {
            this.spinner.stop();
        }
    }
}
