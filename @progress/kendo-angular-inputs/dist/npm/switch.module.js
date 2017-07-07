"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var switch_component_1 = require("./switch/switch.component");
var common_1 = require("@angular/common");
var draggable_module_1 = require("./draggable.module");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var kendo_angular_resize_sensor_1 = require("@progress/kendo-angular-resize-sensor");
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
SwitchModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [switch_component_1.SwitchComponent],
                exports: [switch_component_1.SwitchComponent],
                imports: [common_1.CommonModule, draggable_module_1.DraggableModule, kendo_angular_resize_sensor_1.ResizeSensorModule],
                providers: [
                    { provide: kendo_angular_intl_1.IntlService, useClass: kendo_angular_intl_1.CldrIntlService }
                ]
            },] },
];
/** @nocollapse */
SwitchModule.ctorParameters = function () { return []; };
exports.SwitchModule = SwitchModule;
