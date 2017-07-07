var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { forwardRef, Component, Input, ContentChild, SkipSelf, Host, Optional } from '@angular/core';
import { GroupHeaderTemplateDirective } from './group-header-template.directive';
import { GroupFooterTemplateDirective } from './group-footer-template.directive';
import { FooterTemplateDirective } from './footer-template.directive';
import { ColumnBase } from './column-base';
/**
 * Represents the columns of the Kendo UI ExcelExport component for Angular.
 */
var ColumnComponent = (function (_super) {
    __extends(ColumnComponent, _super);
    function ColumnComponent(parent) {
        return _super.call(this, parent) || this;
    }
    return ColumnComponent;
}(ColumnBase));
export { ColumnComponent };
ColumnComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: ColumnBase,
                        useExisting: forwardRef(function () { return ColumnComponent; }) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-excelexport-column',
                template: ""
            },] },
];
/** @nocollapse */
ColumnComponent.ctorParameters = function () { return [
    { type: ColumnBase, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional },] },
]; };
ColumnComponent.propDecorators = {
    'field': [{ type: Input },],
    'cellOptions': [{ type: Input },],
    'groupHeaderCellOptions': [{ type: Input },],
    'groupFooterCellOptions': [{ type: Input },],
    'footerCellOptions': [{ type: Input },],
    'groupHeaderTemplate': [{ type: ContentChild, args: [GroupHeaderTemplateDirective,] },],
    'groupFooterTemplate': [{ type: ContentChild, args: [GroupFooterTemplateDirective,] },],
    'footerTemplate': [{ type: ContentChild, args: [FooterTemplateDirective,] },],
};
