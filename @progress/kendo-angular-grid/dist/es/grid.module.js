import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { ListComponent } from './list.component';
import { CldrIntlService, IntlService } from '@progress/kendo-angular-intl';
import { DataBindingDirective } from './databinding.directive';
import { LocalizedMessagesDirective } from './localization/localized-messages.directive';
import { CustomMessagesComponent } from './localization/custom-messages.component';
import { RowFilterModule } from "./filtering/filtering.module";
import { PagerModule } from "./pager/pager.module";
import { GroupModule } from "./grouping/group.module";
import { HeaderModule } from "./header.module";
import { BodyModule } from "./body.module";
import { FooterModule } from "./footer.module";
import { SharedModule } from './shared.module';
import { ToolbarTemplateDirective } from "./toolbar-template.directive";
import { ToolbarComponent } from "./toolbar.component";
var exportedModules = [
    GridComponent,
    ToolbarTemplateDirective,
    ToolbarComponent,
    DataBindingDirective,
    CustomMessagesComponent
].concat(GroupModule.exports(), SharedModule.exports(), BodyModule.exports(), HeaderModule.exports(), FooterModule.exports(), PagerModule.exports(), RowFilterModule.exports());
var declarations = [
    GridComponent,
    ListComponent,
    ToolbarComponent,
    LocalizedMessagesDirective,
    CustomMessagesComponent,
    DataBindingDirective,
    ToolbarTemplateDirective
];
/**
 * Represents the [NgModule](https://angular.io/docs/ts/latest/guide/ngmodule.html)
 * definition for the Grid component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Grid module
 * import { GridModule } from '@progress/kendo-angular-grid';
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
 *     imports:      [BrowserModule, GridModule], // import Grid module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var GridModule = (function () {
    function GridModule() {
    }
    return GridModule;
}());
export { GridModule };
GridModule.decorators = [
    { type: NgModule, args: [{
                declarations: [declarations],
                exports: [exportedModules],
                imports: [
                    CommonModule,
                    GroupModule,
                    SharedModule,
                    BodyModule,
                    HeaderModule,
                    FooterModule,
                    PagerModule,
                    RowFilterModule
                ],
                providers: [
                    { provide: IntlService, useClass: CldrIntlService }
                ]
            },] },
];
/** @nocollapse */
GridModule.ctorParameters = function () { return []; };
