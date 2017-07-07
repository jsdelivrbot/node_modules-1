import { NgModule } from '@angular/core';
import { SliderComponent } from './slider/slider.component';
import { CommonModule } from '@angular/common';
import { KendoSliderTicksComponent } from './slider/slider-ticks.component';
import { DraggableModule } from './draggable.module';
import { CldrIntlService, IntlService } from '@progress/kendo-angular-intl';
import { ResizeSensorModule } from '@progress/kendo-angular-resize-sensor';
/**
 * Represents the [NgModule](https://angular.io/docs/ts/latest/guide/ngmodule.html)
 * definition for the Slider component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Inputs module
 * import { SliderModule } from '@progress/kendo-angular-inputs';
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
 *     imports:      [BrowserModule, SliderModule], // import Slider module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var SliderModule = (function () {
    function SliderModule() {
    }
    return SliderModule;
}());
export { SliderModule };
SliderModule.decorators = [
    { type: NgModule, args: [{
                declarations: [SliderComponent, KendoSliderTicksComponent],
                exports: [SliderComponent],
                imports: [CommonModule, DraggableModule, ResizeSensorModule],
                providers: [
                    { provide: IntlService, useClass: CldrIntlService }
                ]
            },] },
];
/** @nocollapse */
SliderModule.ctorParameters = function () { return []; };
