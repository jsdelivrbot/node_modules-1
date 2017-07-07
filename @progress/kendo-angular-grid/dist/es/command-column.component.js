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
import { Component, forwardRef, ContentChild, SkipSelf, Host, Optional } from '@angular/core';
import { ColumnBase } from './column-base';
import { CellTemplateDirective } from './cell-template.directive';
/**
 * Represents the command columns of the Grid.
 *
 * You have to define the content of the column inside an `<ng-template>` tag. The template context
 * is set to the current data item and the following additional fields are passed:
 * - `columnIndex`&mdash;The current column index.
 * - `rowIndex`&mdash;The current row index. If inside a new item row, it will be `-1`.
 * - `dataItem`&mdash;The current data item.
 * - `column`&mdash;The current column instance.
 * - `isNew`&mdash;The state of the current item.
 *
 * Usually, the template contains CRUD command directives such as:
 * - [`EditCommandDirective`]({% slug api_grid_editcommanddirective_kendouiforangular %})
 * - [`RemoveCommandDirective`]({% slug api_grid_removecommanddirective_kendouiforangular %})
 * - [`CancelCommandDirective`]({% slug api_grid_cancelcommanddirective_kendouiforangular %})
 * - [`SaveCommandDirective`]({% slug api_grid_savecommanddirective_kendouiforangular %})
 *
 * @example
 * ```ts-preview
 *
 * @@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-grid [data]="gridData">
 *          <kendo-grid-column field="ProductID" title="Product ID" width="120">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="ProductName" title="Product Name">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
 *          </kendo-grid-column>
 *          <kendo-grid-command-column title="command" width="220">
 *               <ng-template kendoGridCellTemplate>
 *                   <button kendoGridEditCommand class="k-primary">Edit</button>
 *                   <button kendoGridRemoveCommand>Remove</button>
 *               </ng-template>
 *           </kendo-grid-command-column>
 *        </kendo-grid>
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
var CommandColumnComponent = (function (_super) {
    __extends(CommandColumnComponent, _super);
    function CommandColumnComponent(parent) {
        var _this = _super.call(this, parent) || this;
        _this.parent = parent;
        return _this;
    }
    Object.defineProperty(CommandColumnComponent.prototype, "templateRef", {
        get: function () {
            return this.template ? this.template.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    return CommandColumnComponent;
}(ColumnBase));
export { CommandColumnComponent };
CommandColumnComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: ColumnBase,
                        useExisting: forwardRef(function () { return CommandColumnComponent; }) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-grid-command-column',
                template: ""
            },] },
];
/** @nocollapse */
CommandColumnComponent.ctorParameters = function () { return [
    { type: ColumnBase, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional },] },
]; };
CommandColumnComponent.propDecorators = {
    'template': [{ type: ContentChild, args: [CellTemplateDirective,] },],
};
