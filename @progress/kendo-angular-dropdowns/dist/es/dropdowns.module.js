import { NgModule } from '@angular/core';
import { AutoCompleteModule } from './autocomplete.module';
import { ComboBoxModule } from './combobox.module';
import { DropDownListModule } from './dropdownlist.module';
import { MultiSelectModule } from './multiselect.module';
/**
 * Represents the [NgModule](https://angular.io/docs/ts/latest/guide/ngmodule.html)
 * definition for the DropDowns components.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the DropDowns module
 * import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
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
 *     imports:      [BrowserModule, DropDownsModule], // import DropDowns module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var DropDownsModule = (function () {
    function DropDownsModule() {
    }
    return DropDownsModule;
}());
export { DropDownsModule };
DropDownsModule.decorators = [
    { type: NgModule, args: [{
                exports: [AutoCompleteModule, ComboBoxModule, DropDownListModule, MultiSelectModule]
            },] },
];
/** @nocollapse */
DropDownsModule.ctorParameters = function () { return []; };
