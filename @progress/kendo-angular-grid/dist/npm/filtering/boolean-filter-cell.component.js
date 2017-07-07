"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var filter_service_1 = require("./filter.service");
var base_filter_cell_component_1 = require("./base-filter-cell.component");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
/**
 * Represents a Boolean filter-cell component.
 *
 * @example
 *
 *  ```ts-no-run
 *      <kendo-grid-column field="ProductName" title="Product Name">
 *          <ng-template kendoGridFilterCellTemplate let-filter let-column="column">
 *          <kendo-grid-boolean-filter-cell
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-grid-boolean-filter-cell>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
var BooleanFilterCellComponent = (function (_super) {
    __extends(BooleanFilterCellComponent, _super);
    function BooleanFilterCellComponent(filterService, localization) {
        var _this = _super.call(this, filterService) || this;
        _this.localization = localization;
        /**
         * @hidden
         */
        _this.operator = "eq";
        /**
         * @hidden
         */
        _this.items = [
            { text: _this.localization.get("filterIsTrue"), value: true },
            { text: _this.localization.get("filterIsFalse"), value: false }
        ];
        /**
         * @hidden
         */
        _this.defaultItem = { text: _this.localization.get("filterBooleanAll"), value: null };
        return _this;
    }
    Object.defineProperty(BooleanFilterCellComponent.prototype, "hostClasses", {
        /**
         * @hidden
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BooleanFilterCellComponent.prototype, "currentFilter", {
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
    Object.defineProperty(BooleanFilterCellComponent.prototype, "currentOperator", {
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
    return BooleanFilterCellComponent;
}(base_filter_cell_component_1.BaseFilterCellComponent));
BooleanFilterCellComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'kendo-grid-boolean-filter-cell',
                template: "\n        <kendo-grid-filter-wrapper-cell\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [showOperators]=\"false\"\n            [defaultOperator]=\"operator\">\n            <kendo-dropdownlist\n                kendoFilterInput\n                [defaultItem]=\"defaultItem\"\n                [data]=\"items\"\n                textField=\"text\"\n                valueField=\"value\"\n                [popupSettings]=\"{ width: 'auto' }\"\n                [valuePrimitive]=\"true\"\n                [value]=\"currentFilter?.value\">\n            </kendo-dropdownlist>\n        </kendo-grid-filter-wrapper-cell>\n    "
            },] },
];
/** @nocollapse */
BooleanFilterCellComponent.ctorParameters = function () { return [
    { type: filter_service_1.FilterService, },
    { type: kendo_angular_l10n_1.LocalizationService, },
]; };
BooleanFilterCellComponent.propDecorators = {
    'hostClasses': [{ type: core_1.HostBinding, args: ['class.k-filtercell-boolean',] },],
    'column': [{ type: core_1.Input },],
    'filter': [{ type: core_1.Input },],
};
exports.BooleanFilterCellComponent = BooleanFilterCellComponent;
