import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntlModule } from '@progress/kendo-angular-intl';
import { TemplatesModule } from './templates.module';
import { CalendarComponent } from './calendar.component';
import { HeaderComponent } from './header.component';
import { VirtualizationComponent } from './virtualization.component';
import { NavigationComponent } from './navigation.component';
import { MonthViewComponent } from './month-view.component';
import { MonthComponent } from './month.component';
import { DOMService } from './services/dom.service';
import { MonthViewService } from './services/month-view.service';
import { NavigationService } from './services/navigation.service';
import { LocalizedMessagesDirective } from './localization/localized-messages.directive';
import { CalendarCustomMessagesComponent } from './localization/calendar-custom-messages.component';
var COMPONENT_DIRECTIVES = [
    CalendarComponent,
    HeaderComponent,
    NavigationComponent,
    MonthViewComponent,
    MonthComponent,
    VirtualizationComponent,
    CalendarCustomMessagesComponent,
    LocalizedMessagesDirective
];
var CALENDAR_PROVIDERS = [
    DOMService,
    MonthViewService,
    NavigationService
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
export { CalendarModule };
CalendarModule.decorators = [
    { type: NgModule, args: [{
                declarations: [COMPONENT_DIRECTIVES],
                exports: [COMPONENT_DIRECTIVES, TemplatesModule],
                imports: [CommonModule, IntlModule, TemplatesModule],
                providers: CALENDAR_PROVIDERS
            },] },
];
/** @nocollapse */
CalendarModule.ctorParameters = function () { return []; };
