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
import { Component, forwardRef, SkipSelf, Host, Optional, ContentChildren } from '@angular/core';
import { ColumnBase } from './column-base';
import { columnsSpan } from './column-common';
/**
 * @hidden
 */
export function isColumnGroupComponent(column) {
    return column.isColumnGroup;
}
/**
 * Represents the column-group header of the Grid.
 *
 * @example
 * ```ts-preview
 *
 * @@Component({
 *    selector: 'my-app',
 *    template: `
 *     <kendo-grid [data]="gridData">
 *       <kendo-grid-column-group title="Product Info">
 *         <ng-template kendoGridHeaderTemplate let-columnIndex="columnIndex" let-column="column">
 *               Column index: {{columnIndex}} / column title: {{column.title}}
 *         </ng-template>
 *         <kendo-grid-column field="ProductID" title="Product ID" width="120">
 *         </kendo-grid-column>
 *         <kendo-grid-column field="ProductName" title="Product Name">
 *         </kendo-grid-column>
 *       </kendo-grid-column-group>
 *       <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
 *       </kendo-grid-column>
 *       <kendo-grid-column field="Discontinued" width="120">
 *           <ng-template kendoGridCellTemplate let-dataItem>
 *               <input type="checkbox" [checked]="dataItem.Discontinued" disabled/>
 *           </ng-template>
 *       </kendo-grid-column>
 *     </kendo-grid>
 *    `
 * })
 *
 * class AppComponent {
 *    private gridData: any[];
 *
 *    constructor() {
 *        this.gridData = products;
 *    }
 * }
 *
 * const products = [{
 *    "ProductID": 1,
 *    "ProductName": "Chai",
 *    "UnitPrice": 18.0000,
 *    "Discontinued": true
 *  }, {
 *    "ProductID": 2,
 *    "ProductName": "Chang",
 *    "UnitPrice": 19.0000,
 *    "Discontinued": false
 *  }
 * ];
 *
 * ```
 */
var ColumnGroupComponent = (function (_super) {
    __extends(ColumnGroupComponent, _super);
    function ColumnGroupComponent(parent) {
        var _this = _super.call(this, parent) || this;
        _this.parent = parent;
        /**
         * @hidden
         */
        _this.isColumnGroup = true;
        if (parent && parent.isSpanColumn) {
            throw new Error('ColumnGroupComponent cannot be nested inside SpanColumnComponent');
        }
        return _this;
    }
    /**
     * @hidden
     */
    ColumnGroupComponent.prototype.rowspan = function () {
        return 1;
    };
    Object.defineProperty(ColumnGroupComponent.prototype, "colspan", {
        /**
         * @hidden
         */
        get: function () {
            var _this = this;
            if (!this.children || this.children.length === 1) {
                return 1;
            }
            return columnsSpan(this.children
                .filter(function (child) { return child !== _this && !child.hidden; }));
        },
        enumerable: true,
        configurable: true
    });
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
                selector: 'kendo-grid-column-group',
                template: ""
            },] },
];
/** @nocollapse */
ColumnGroupComponent.ctorParameters = function () { return [
    { type: ColumnBase, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional },] },
]; };
ColumnGroupComponent.propDecorators = {
    'children': [{ type: ContentChildren, args: [ColumnBase,] },],
};
