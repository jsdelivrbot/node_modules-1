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
var filter_service_1 = require("./filter.service");
var base_filter_cell_component_1 = require("./base-filter-cell.component");
var utils_1 = require("../utils");
var filter_input_directive_1 = require("./filter-input.directive");
/**
 * @hidden
 */
var FilterCellWrapperComponent = (function (_super) {
    __extends(FilterCellWrapperComponent, _super);
    function FilterCellWrapperComponent(filterService) {
        var _this = _super.call(this, filterService) || this;
        _this.showOperators = true;
        _this.operators = [];
        return _this;
    }
    Object.defineProperty(FilterCellWrapperComponent.prototype, "hostClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterCellWrapperComponent.prototype, "overrideBaseClasses", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterCellWrapperComponent.prototype, "currentFilter", {
        get: function () {
            return this.filterByField(this.column.field);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterCellWrapperComponent.prototype, "showButton", {
        get: function () {
            var filter = this.currentFilter;
            return utils_1.isPresent(filter) && !utils_1.isBlank(filter.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterCellWrapperComponent.prototype, "currentOperator", {
        get: function () {
            var filter = this.currentFilter;
            if (!this._operator) {
                this._operator = filter ? filter.operator : this.defaultOperator;
            }
            return this._operator;
        },
        set: function (value) {
            this._operator = value;
            if (value === "isnull" || value === "isnotnull" || value === "isempty" || value === "isnotempty") {
                this.applyNoValueFilter(value);
            }
            else if (!utils_1.isBlank(value) && utils_1.isPresent(this.currentFilter)) {
                this.onChange(this.currentFilter.value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterCellWrapperComponent.prototype, "defaultOperator", {
        get: function () {
            if (!utils_1.isNullOrEmptyString(this._defaultOperator)) {
                return this._defaultOperator;
            }
            else if (this.operators && this.operators.length) {
                return this.operators[0].value;
            }
            return "eq";
        },
        set: function (value) {
            this._defaultOperator = value;
        },
        enumerable: true,
        configurable: true
    });
    FilterCellWrapperComponent.prototype.ngAfterContentInit = function () {
        if (utils_1.isPresent(this.input)) {
            this.changeSubscription = this.input.change.subscribe(this.onChange.bind(this));
        }
    };
    FilterCellWrapperComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        if (this.changeSubscription) {
            this.changeSubscription.unsubscribe();
        }
    };
    FilterCellWrapperComponent.prototype.onChange = function (value) {
        this.applyFilter(utils_1.isBlank(value) ?
            this.removeFilter(this.column.field) :
            this.updateFilter({
                field: this.column.field,
                operator: this.currentOperator,
                value: value
            }));
    };
    FilterCellWrapperComponent.prototype.onClear = function () {
        this.onChange(null);
    };
    FilterCellWrapperComponent.prototype.applyNoValueFilter = function (operator) {
        this.applyFilter(this.updateFilter({
            field: this.column.field,
            operator: operator,
            value: null
        }));
    };
    return FilterCellWrapperComponent;
}(base_filter_cell_component_1.BaseFilterCellComponent));
FilterCellWrapperComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'kendo-grid-filter-wrapper-cell',
                template: "\n        <ng-content></ng-content>\n        <kendo-grid-filter-cell-operators\n            [showOperators]=\"showOperators\"\n            [operators]=\"operators\"\n            (clear)=\"onClear()\"\n            [showButton]=\"showButton\"\n            [(value)]=\"currentOperator\">\n        </kendo-grid-filter-cell-operators>\n    "
            },] },
];
/** @nocollapse */
FilterCellWrapperComponent.ctorParameters = function () { return [
    { type: filter_service_1.FilterService, },
]; };
FilterCellWrapperComponent.propDecorators = {
    'hostClasses': [{ type: core_1.HostBinding, args: ['class.k-filtercell-wrapper',] },],
    'overrideBaseClasses': [{ type: core_1.HostBinding, args: ['class.k-filtercell',] },],
    'showOperators': [{ type: core_1.Input },],
    'operators': [{ type: core_1.Input },],
    'column': [{ type: core_1.Input },],
    'filter': [{ type: core_1.Input },],
    'input': [{ type: core_1.ContentChild, args: [filter_input_directive_1.FilterInputDirective,] },],
    'defaultOperator': [{ type: core_1.Input },],
};
exports.FilterCellWrapperComponent = FilterCellWrapperComponent;
