"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var column_base_1 = require("./column-base");
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
}(column_base_1.ColumnBase));
ColumnGroupComponent.decorators = [
    { type: core_1.Component, args: [{
                providers: [
                    {
                        provide: column_base_1.ColumnBase,
                        useExisting: core_1.forwardRef(function () { return ColumnGroupComponent; }) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-excelexport-column-group',
                template: ""
            },] },
];
/** @nocollapse */
ColumnGroupComponent.ctorParameters = function () { return [
    { type: column_base_1.ColumnBase, decorators: [{ type: core_1.SkipSelf }, { type: core_1.Host }, { type: core_1.Optional },] },
]; };
exports.ColumnGroupComponent = ColumnGroupComponent;
