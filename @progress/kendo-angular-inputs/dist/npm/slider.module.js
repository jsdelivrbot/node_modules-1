"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var slider_component_1 = require("./slider/slider.component");
var common_1 = require("@angular/common");
var slider_ticks_component_1 = require("./slider/slider-ticks.component");
var draggable_module_1 = require("./draggable.module");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var kendo_angular_resize_sensor_1 = require("@progress/kendo-angular-resize-sensor");
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
SliderModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [slider_component_1.SliderComponent, slider_ticks_component_1.KendoSliderTicksComponent],
                exports: [slider_component_1.SliderComponent],
                imports: [common_1.CommonModule, draggable_module_1.DraggableModule, kendo_angular_resize_sensor_1.ResizeSensorModule],
                providers: [
                    { provide: kendo_angular_intl_1.IntlService, useClass: kendo_angular_intl_1.CldrIntlService }
                ]
            },] },
];
/** @nocollapse */
SliderModule.ctorParameters = function () { return []; };
exports.SliderModule = SliderModule;
