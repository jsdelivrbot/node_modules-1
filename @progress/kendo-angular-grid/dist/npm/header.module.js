"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var header_component_1 = require("./header.component");
var group_module_1 = require("./grouping/group.module");
var shared_module_1 = require("./shared.module");
var filtering_module_1 = require("./filtering/filtering.module");
var header_template_directive_1 = require("./header-template.directive");
var exportedModules = [
    header_component_1.HeaderComponent,
    header_template_directive_1.HeaderTemplateDirective
];
var importedModules = [
    common_1.CommonModule,
    group_module_1.GroupModule,
    filtering_module_1.RowFilterModule,
    shared_module_1.SharedModule
];
/**
 * @hidden
 */
var HeaderModule = (function () {
    function HeaderModule() {
    }
    HeaderModule.exports = function () {
        return [
            header_template_directive_1.HeaderTemplateDirective
        ];
    };
    return HeaderModule;
}());
HeaderModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [exportedModules],
                exports: [exportedModules],
                imports: importedModules.slice()
            },] },
];
/** @nocollapse */
HeaderModule.ctorParameters = function () { return []; };
exports.HeaderModule = HeaderModule;
