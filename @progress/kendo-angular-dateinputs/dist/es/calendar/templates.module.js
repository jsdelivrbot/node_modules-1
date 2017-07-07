import { NgModule } from '@angular/core';
import { CellTemplateDirective } from './templates/cell-template.directive';
var COMPONENT_DIRECTIVES = [
    CellTemplateDirective
];
/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `CellTemplateDirective`&mdash;The cell template directive.
 */
var TemplatesModule = (function () {
    function TemplatesModule() {
    }
    return TemplatesModule;
}());
export { TemplatesModule };
TemplatesModule.decorators = [
    { type: NgModule, args: [{
                declarations: [COMPONENT_DIRECTIVES],
                exports: [COMPONENT_DIRECTIVES]
            },] },
];
/** @nocollapse */
TemplatesModule.ctorParameters = function () { return []; };
