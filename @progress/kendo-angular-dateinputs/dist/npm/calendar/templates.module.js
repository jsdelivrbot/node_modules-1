"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var cell_template_directive_1 = require("./templates/cell-template.directive");
var COMPONENT_DIRECTIVES = [
    cell_template_directive_1.CellTemplateDirective
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
TemplatesModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [COMPONENT_DIRECTIVES],
                exports: [COMPONENT_DIRECTIVES]
            },] },
];
/** @nocollapse */
TemplatesModule.ctorParameters = function () { return []; };
exports.TemplatesModule = TemplatesModule;
