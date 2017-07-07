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
// tslint:disable:no-access-missing-member
import { Component, Input } from '@angular/core';
import { FilterService } from './filter.service';
import { BaseFilterCellComponent, localizeOperators } from './base-filter-cell.component';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { isNullOrEmptyString, extractFormat } from '../utils';
var numericOperators = localizeOperators({
    "filterEqOperator": "eq",
    "filterNotEqOperator": "neq",
    // tslint:disable-next-line:object-literal-sort-keys
    "filterGteOperator": "gte",
    "filterGtOperator": "gt",
    "filterLteOperator": "lte",
    "filterLtOperator": "lt",
    "filterIsNullOperator": "isnull",
    "filterIsNotNullOperator": "isnotnull"
});
/**
 * Represents a numeric filter cell.
 *
 * @example
 *  ```ts-no-run
 *      <kendo-grid-column field="ProductName" title="Product Name">
 *          <ng-template kendoGridFilterCellTemplate let-filter let-column="column">
 *          <kendo-grid-numeric-filter-cell
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-grid-numeric-filter-cell>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
var NumericFilterCellComponent = (function (_super) {
    __extends(NumericFilterCellComponent, _super);
    function NumericFilterCellComponent(filterService, localization) {
        var _this = _super.call(this, filterService) || this;
        _this.localization = localization;
        /**
         * Determines if the drop-down filter operators should be shown. The default value is `true`.
         * @type {boolean}
         */
        _this.showOperators = true;
        /**
         * The default filter operator. Defaults to `eq`.
         * @type {string}
         */
        _this.operator = "eq";
        /**
         * Specifies the value used to increment or decrement the component value.
         * @type {numeric}
         */
        _this.step = 1;
        /**
         * Specifies whether the **Up** and **Down** spin buttons should be rendered.
         * @type {boolean}
         */
        _this.spinners = true;
        _this.defaultOperators = numericOperators(_this.localization);
        return _this;
    }
    Object.defineProperty(NumericFilterCellComponent.prototype, "format", {
        /**
         * Specifies the number format used when the component is not focused.
         * By default, the `column.format` value is used, if set.
         *
         * @readonly
         * @type {string}
         */
        get: function () {
            return !isNullOrEmptyString(this._format) ? this._format : this.columnFormat;
        },
        /**
         * Specifies the number format used when the component is not focused.
         * By default, the `column.format` value is used, if set.
         */
        set: function (value) {
            this._format = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericFilterCellComponent.prototype, "currentFilter", {
        /**
         * The current filter for the associated column field.
         * @readonly
         * @type {FilterDescriptor}
         */
        get: function () {
            return this.filterByField(this.column.field);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericFilterCellComponent.prototype, "currentOperator", {
        /**
         * The current filter operator for the associated column field.
         * @readonly
         * @type {string}
         */
        get: function () {
            return this.currentFilter ? this.currentFilter.operator : this.operator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericFilterCellComponent.prototype, "columnFormat", {
        get: function () {
            return this.column && !isNullOrEmptyString(this.column.format) ?
                extractFormat(this.column.format) : "n2";
        },
        enumerable: true,
        configurable: true
    });
    return NumericFilterCellComponent;
}(BaseFilterCellComponent));
export { NumericFilterCellComponent };
NumericFilterCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-numeric-filter-cell',
                template: "\n        <kendo-grid-filter-wrapper-cell\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [operators]=\"operators\"\n            [defaultOperator]=\"operator\"\n            [showOperators]=\"showOperators\">\n            <kendo-numerictextbox\n                kendoFilterInput\n                [autoCorrect]=\"true\"\n                [value]=\"currentFilter?.value\"\n                [format]=\"format\"\n                [decimals]=\"decimals\"\n                [spinners]=\"spinners\"\n                [min]=\"min\"\n                [max]=\"max\"\n                [step]=\"step\">\n            </kendo-numerictextbox>\n        </kendo-grid-filter-wrapper-cell>\n    "
            },] },
];
/** @nocollapse */
NumericFilterCellComponent.ctorParameters = function () { return [
    { type: FilterService, },
    { type: LocalizationService, },
]; };
NumericFilterCellComponent.propDecorators = {
    'showOperators': [{ type: Input },],
    'column': [{ type: Input },],
    'filter': [{ type: Input },],
    'operator': [{ type: Input },],
    'step': [{ type: Input },],
    'min': [{ type: Input },],
    'max': [{ type: Input },],
    'spinners': [{ type: Input },],
    'decimals': [{ type: Input },],
    'format': [{ type: Input },],
};
