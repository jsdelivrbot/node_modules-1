"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var templates_module_1 = require("./templates.module");
var calendar_component_1 = require("./calendar.component");
var header_component_1 = require("./header.component");
var virtualization_component_1 = require("./virtualization.component");
var navigation_component_1 = require("./navigation.component");
var month_view_component_1 = require("./month-view.component");
var month_component_1 = require("./month.component");
var dom_service_1 = require("./services/dom.service");
var month_view_service_1 = require("./services/month-view.service");
var navigation_service_1 = require("./services/navigation.service");
var localized_messages_directive_1 = require("./localization/localized-messages.directive");
var calendar_custom_messages_component_1 = require("./localization/calendar-custom-messages.component");
var COMPONENT_DIRECTIVES = [
    calendar_component_1.CalendarComponent,
    header_component_1.HeaderComponent,
    navigation_component_1.NavigationComponent,
    month_view_component_1.MonthViewComponent,
    month_component_1.MonthComponent,
    virtualization_component_1.VirtualizationComponent,
    calendar_custom_messages_component_1.CalendarCustomMessagesComponent,
    localized_messages_directive_1.LocalizedMessagesDirective
];
var CALENDAR_PROVIDERS = [
    dom_service_1.DOMService,
    month_view_service_1.MonthViewService,
    navigation_service_1.NavigationService
];
/**
 * The exported package module.
 *
 * The package exports:
 * - `CalendarComponent`&mdash;The Calendar component class.
 * - `CellTemplateDirective`&mdash;The cell template directive.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Calendar module.
 * import { CalendarModule } from '@progress/kendo-angular-dateinputs';
 *
 * // The browser platform with a compiler.
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component.
 * import { AppComponent } from './app.component';
 *
 * // Define the app module.
 * @@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, CalendarModule], // import Calendar module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module.
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var CalendarModule = (function () {
    function CalendarModule() {
    }
    return CalendarModule;
}());
CalendarModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [COMPONENT_DIRECTIVES],
                exports: [COMPONENT_DIRECTIVES, templates_module_1.TemplatesModule],
                imports: [common_1.CommonModule, kendo_angular_intl_1.IntlModule, templates_module_1.TemplatesModule],
                providers: CALENDAR_PROVIDERS
            },] },
];
/** @nocollapse */
CalendarModule.ctorParameters = function () { return []; };
exports.CalendarModule = CalendarModule;
