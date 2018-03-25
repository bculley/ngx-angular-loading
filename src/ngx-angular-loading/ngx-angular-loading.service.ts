import {
    Injectable
} from '@angular/core';

import { Subject } from 'rxjs/Subject';

import merge from 'lodash-es/merge';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NGXLoadingService {
    private startBehavior = new Subject<string>();
    private finishBehavior = new Subject<string>();

    // expose observables
    public ngxLoadingStart$ = this.startBehavior.asObservable();
    public ngxLoadingFinish$ = this.finishBehavior.asObservable();

    public ngxLoadingOptions = {
        active: false, // Defines current loading state
        text: 'Loading...', // Display text
        className: '', // Custom class, added to directive
        overlay: true, // Display overlay
        spinner: true, // Display spinner
        spinnerOptions: {
            lines: 12, // The number of lines to draw
            length: 7, // The length of each line
            width: 4, // The line thickness
            radius: 10, // The radius of the inner circle
            rotate: 0, // Rotation offset
            corners: 1, // Roundness (0..1)
            color: '#000', // #rgb or #rrggbb
            direction: 1, // 1: clockwise, -1: counterclockwise
            speed: 2, // Rounds per second
            trail: 100, // Afterglow percentage
            opacity: 1 / 4, // Opacity of the lines
            fps: 20, // Frames per second when using setTimeout()
            zIndex: 2e9, // Use a high z-index by default
            className: 'ngx-spinner', // CSS class to assign to the element
            top: 'auto', // Center vertically
            left: 'auto', // Center horizontally
            position: 'relative' // Element position
        }
    };

    constructor() {
        this.start('');
    }

    /**
     * Overrides default options
     * @param {object} options
     */
    setDefaultOptions(options) {
        merge({}, this.ngxLoadingOptions, options);
    }

    /**
     * Activates loading state by key
     * @param {string} key
     */
    start(key) {
        this.startBehavior.next(key);
    }

    /**
     * Deactivates loading state by key
     * @param {string} key
     */
    finish(key) {
        this.finishBehavior.next(key);
    }
}