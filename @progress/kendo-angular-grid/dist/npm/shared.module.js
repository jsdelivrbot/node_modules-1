"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var column_component_1 = require("./column.component");
var span_column_component_1 = require("./span-column.component");
var column_group_component_1 = require("./column-group.component");
var footer_template_directive_1 = require("./footer-template.directive");
var col_group_component_1 = require("./col-group.component");
var resizable_directive_1 = require("./resizable.directive");
var template_context_directive_1 = require("./template-context.directive");
var detail_template_directive_1 = require("./detail-template.directive");
var draggable_directive_1 = require("./draggable.directive");
var field_accessor_pipe_1 = require("./field-accessor.pipe");
var exportedModules = [
    draggable_directive_1.DraggableDirective,
    column_component_1.ColumnComponent,
    column_group_component_1.ColumnGroupComponent,
    footer_template_directive_1.FooterTemplateDirective,
    col_group_component_1.ColGroupComponent,
    resizable_directive_1.ResizableContainerDirective,
    template_context_directive_1.TemplateContextDirective,
    field_accessor_pipe_1.FieldAccessorPipe,
    detail_template_directive_1.DetailTemplateDirective,
    span_column_component_1.SpanColumnComponent
];
/**
 * @hidden
 */
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule.exports = function () {
        return [
            column_component_1.ColumnComponent,
            span_column_component_1.SpanColumnComponent,
            column_group_component_1.ColumnGroupComponent,
            footer_template_directive_1.FooterTemplateDirective,
            detail_template_directive_1.DetailTemplateDirective
        ];
    };
    return SharedModule;
}());
SharedModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [exportedModules],
                exports: [exportedModules],
                imports: [common_1.CommonModule]
            },] },
];
/** @nocollapse */
SharedModule.ctorParameters = function () { return []; };
exports.SharedModule = SharedModule;
