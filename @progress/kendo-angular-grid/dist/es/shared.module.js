import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from './column.component';
import { SpanColumnComponent } from './span-column.component';
import { ColumnGroupComponent } from './column-group.component';
import { FooterTemplateDirective } from './footer-template.directive';
import { ColGroupComponent } from './col-group.component';
import { ResizableContainerDirective } from './resizable.directive';
import { TemplateContextDirective } from './template-context.directive';
import { DetailTemplateDirective } from './detail-template.directive';
import { DraggableDirective } from './draggable.directive';
import { FieldAccessorPipe } from "./field-accessor.pipe";
var exportedModules = [
    DraggableDirective,
    ColumnComponent,
    ColumnGroupComponent,
    FooterTemplateDirective,
    ColGroupComponent,
    ResizableContainerDirective,
    TemplateContextDirective,
    FieldAccessorPipe,
    DetailTemplateDirective,
    SpanColumnComponent
];
/**
 * @hidden
 */
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule.exports = function () {
        return [
            ColumnComponent,
            SpanColumnComponent,
            ColumnGroupComponent,
            FooterTemplateDirective,
            DetailTemplateDirective
        ];
    };
    return SharedModule;
}());
export { SharedModule };
SharedModule.decorators = [
    { type: NgModule, args: [{
                declarations: [exportedModules],
                exports: [exportedModules],
                imports: [CommonModule]
            },] },
];
/** @nocollapse */
SharedModule.ctorParameters = function () { return []; };
