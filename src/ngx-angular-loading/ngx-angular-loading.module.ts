import { CommonModule } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, Injector, ModuleWithProviders, NgModule } from '@angular/core';

import { NGXLoadingService } from './ngx-angular-loading.service';
import { NGXLoadingDirective } from './ngx-angular-loading.component';

@NgModule({
    declarations: [
        NGXLoadingDirective
    ],
    exports: [
        NGXLoadingDirective,
        NGXLoadingService
    ],
    imports: [
        CommonModule
    ]
})
export class NGXLoadingModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NGXLoadingModule,
            providers: [
                NGXLoadingService
            ]
        };
    }
}
