// tslint:disable:no-access-missing-member
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
import { Component, Input } from '@angular/core';
import { FilterService } from './filter.service';
import { BaseFilterCellComponent, localizeOperators } from './base-filter-cell.component';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { isNullOrEmptyString, extractFormat } from "../utils";
var dateOperators = localizeOperators({
    "filterEqOperator": "eq",
    "filterNotEqOperator": "neq",
    // tslint:disable-next-line:object-literal-sort-keys
    "filterAfterOrEqualOperator": "gte",
    "filterAfterOperator": "gt",
    "filterBeforeOrEqualOperator": "lte",
    "filterBeforeOperator": "lt",
    "filterIsNullOperator": "isnull",
    "filterIsNotNullOperator": "isnotnull"
});
/**
 * Represents a date filter-cell component.
 *
 * @example
 *
 *  ```ts-no-run
 *      <kendo-grid-column field="OrderDate" title="Order Date">
 *          <ng-template kendoGridFilterCellTemplate let-filter let-column="column">
 *          <kendo-grid-date-filter-cell
 *              [showOperators]="false"
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-grid-date-filter-cell>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
var DateFilterCellComponent = (function (_super) {
    __extends(DateFilterCellComponent, _super);
    function DateFilterCellComponent(filterService, localization) {
        var _this = _super.call(this, filterService) || this;
        _this.localization = localization;
        /**
         * Determines if the drop-down filter operators should be shown. The default value is `true`.
         * @type {boolean}
         */
        _this.showOperators = true;
        /**
         * The default filter operator. Defaults to `contains`.
         * @type {string}
         */
        _this.operator = "gte";
        _this.defaultOperators = dateOperators(_this.localization);
        return _this;
    }
    Object.defineProperty(DateFilterCellComponent.prototype, "currentFilter", {
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
    Object.defineProperty(DateFilterCellComponent.prototype, "format", {
        /**
         * Specifies the date format used when the component is not focused.
         * By default, the `column.format` value is used, if set.
         *
         * @readonly
         * @type {string}
         */
        get: function () {
            return !isNullOrEmptyString(this._format) ? this._format : this.columnFormat;
        },
        /**
         * Specifies the date format used when the component is not focused.
         * By default, the `column.format` value is used, if set.
         */
        set: function (value) {
            this._format = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateFilterCellComponent.prototype, "columnFormat", {
        get: function () {
            return this.column && !isNullOrEmptyString(this.column.format) ?
                extractFormat(this.column.format) : "d";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateFilterCellComponent.prototype, "currentOperator", {
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
    return DateFilterCellComponent;
}(BaseFilterCellComponent));
export { DateFilterCellComponent };
DateFilterCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-date-filter-cell',
                template: "\n        <kendo-grid-filter-wrapper-cell\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [operators]=\"operators\"\n            [defaultOperator]=\"operator\"\n            [showOperators]=\"showOperators\"\n            >\n            <kendo-datepicker\n                kendoFilterInput\n                [value]=\"currentFilter?.value\"\n                [format]=\"format\"\n                [min]=\"min\"\n                [max]=\"max\"\n                >\n            </kendo-datepicker>\n        </kendo-grid-filter-wrapper-cell>\n    "
            },] },
];
/** @nocollapse */
DateFilterCellComponent.ctorParameters = function () { return [
    { type: FilterService, },
    { type: LocalizationService, },
]; };
DateFilterCellComponent.propDecorators = {
    'showOperators': [{ type: Input },],
    'column': [{ type: Input },],
    'filter': [{ type: Input },],
    'operator': [{ type: Input },],
    'format': [{ type: Input },],
    'min': [{ type: Input },],
    'max': [{ type: Input },],
};
