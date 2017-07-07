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
import { Component, forwardRef, SkipSelf, Host, Optional } from '@angular/core';
import { ColumnBase } from './column-base';
/**
 * Represents the column-group component of the Kendo UI ExcelExport component.
 */
var ColumnGroupComponent = (function (_super) {
    __extends(ColumnGroupComponent, _super);
    function ColumnGroupComponent(parent) {
        var _this = _super.call(this, parent) || this;
        _this.parent = parent;
        return _this;
    }
    return ColumnGroupComponent;
}(ColumnBase));
export { ColumnGroupComponent };
ColumnGroupComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: ColumnBase,
                        useExisting: forwardRef(function () { return ColumnGroupComponent; }) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-excelexport-column-group',
                template: ""
            },] },
];
/** @nocollapse */
ColumnGroupComponent.ctorParameters = function () { return [
    { type: ColumnBase, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional },] },
]; };
