import { NgModule } from '@angular/core';
import { SwitchComponent } from './switch/switch.component';
import { CommonModule } from '@angular/common';
import { DraggableModule } from './draggable.module';
import { CldrIntlService, IntlService } from '@progress/kendo-angular-intl';
import { ResizeSensorModule } from '@progress/kendo-angular-resize-sensor';
/**
 * Represents the [NgModule](https://angular.io/docs/ts/latest/guide/ngmodule.html)
 * definition for the Switch component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Switch module
 * import { SwitchModule } from '@progress/kendo-angular-inputs';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * @@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, SwitchModule], // import Switch module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var SwitchModule = (function () {
    function SwitchModule() {
    }
    return SwitchModule;
}());
export { SwitchModule };
SwitchModule.decorators = [
    { type: NgModule, args: [{
                declarations: [SwitchComponent],
                exports: [SwitchComponent],
                imports: [CommonModule, DraggableModule, ResizeSensorModule],
                providers: [
                    { provide: IntlService, useClass: CldrIntlService }
                ]
            },] },
];
/** @nocollapse */
SwitchModule.ctorParameters = function () { return []; };
