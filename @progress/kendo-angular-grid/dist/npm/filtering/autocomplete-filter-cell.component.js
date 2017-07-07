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
var column_component_1 = require("../column.component");
var filter_service_1 = require("./filter.service");
var base_filter_cell_component_1 = require("./base-filter-cell.component");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var stringOperators = base_filter_cell_component_1.localizeOperators({
    "filterContainsOperator": "contains",
    "filterNotContainsOperator": "doesnotcontain",
    // tslint:disable-next-line:object-literal-sort-keys
    "filterEqOperator": "eq",
    "filterNotEqOperator": "neq",
    "filterStartsWithOperator": "startswith",
    "filterEndsWithOperator": "endswith",
    "filterIsNullOperator": "isnull",
    "filterIsNotNullOperator": "isnotnull",
    "filterIsEmptyOperator": "isempty",
    "filterIsNotEmptyOperator": "isnotempty"
});
/**
 * @hidden
 */
var AutoCompleteFilterCellComponent = (function (_super) {
    __extends(AutoCompleteFilterCellComponent, _super);
    function AutoCompleteFilterCellComponent(filterService, column, localization) {
        var _this = _super.call(this, filterService) || this;
        _this.localization = localization;
        _this.showOperators = true;
        _this.defaultOperators = stringOperators(_this.localization);
        _this.column = column;
        return _this;
    }
    Object.defineProperty(AutoCompleteFilterCellComponent.prototype, "valueField", {
        get: function () {
            return this._valueField ? this._valueField : this.column.field;
        },
        set: function (value) {
            this._valueField = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteFilterCellComponent.prototype, "currentFilter", {
        get: function () {
            return this.filterByField(this.column.field);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteFilterCellComponent.prototype, "currentOperator", {
        get: function () {
            return this.currentFilter ? this.currentFilter.operator : "contains";
        },
        enumerable: true,
        configurable: true
    });
    return AutoCompleteFilterCellComponent;
}(base_filter_cell_component_1.BaseFilterCellComponent));
AutoCompleteFilterCellComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'kendo-grid-autocomplete-filter-cell',
                template: "\n        <kendo-grid-filter-wrapper-cell\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [operators]=\"operators\"\n            [showOperators]=\"showOperators\">\n            <kendo-autocomplete\n                kendoFilterInput\n                [data]=\"data\"\n                [valueField]=\"valueField\"\n                [value]=\"currentFilter?.value\">\n            </kendo-autocomplete>\n        </kendo-grid-filter-wrapper-cell>\n    "
            },] },
];
/** @nocollapse */
AutoCompleteFilterCellComponent.ctorParameters = function () { return [
    { type: filter_service_1.FilterService, },
    { type: column_component_1.ColumnComponent, },
    { type: kendo_angular_l10n_1.LocalizationService, },
]; };
AutoCompleteFilterCellComponent.propDecorators = {
    'showOperators': [{ type: core_1.Input },],
    'column': [{ type: core_1.Input },],
    'filter': [{ type: core_1.Input },],
    'data': [{ type: core_1.Input },],
    'valueField': [{ type: core_1.Input },],
};
exports.AutoCompleteFilterCellComponent = AutoCompleteFilterCellComponent;
