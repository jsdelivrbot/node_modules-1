"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_data_query_1 = require("@progress/kendo-data-query");
var utils_1 = require("../utils");
var filter_operator_base_1 = require("./operators/filter-operator.base");
var flatten = function (filter) {
    if (utils_1.isPresent(filter.filters)) {
        return filter.filters.reduce(function (acc, curr) {
            return acc.concat(kendo_data_query_1.isCompositeFilterDescriptor(curr) ? flatten(curr) : [curr]);
        }, []);
    }
    return [];
};
var trimFilterByField = function (filter, field) {
    if (utils_1.isPresent(filter) && utils_1.isPresent(filter.filters)) {
        filter.filters = filter.filters.filter(function (x) {
            if (kendo_data_query_1.isCompositeFilterDescriptor(x)) {
                trimFilterByField(x, field);
                return x.filters.length;
            }
            else {
                return x.field !== field;
            }
        });
    }
};
/**
 * @hidden
 */
exports.localizeOperators = function (operators) { return function (localization) { return Object.keys(operators).map(function (key) { return ({
    text: localization.get(key),
    value: operators[key]
}); }); }; };
/**
 * An abstract base class for the filter-cell component.
 */
var BaseFilterCellComponent = (function () {
    function BaseFilterCellComponent(filterService) {
        this.filterService = filterService;
        this.operatorList = new core_1.QueryList();
    }
    Object.defineProperty(BaseFilterCellComponent.prototype, "hostClasses", {
        /**
         * @hidden
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseFilterCellComponent.prototype, "operators", {
        get: function () {
            return this._operators.length ? this._operators : this.defaultOperators;
        },
        set: function (values) {
            this._operators = values;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    BaseFilterCellComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.operationListSubscription = utils_1.observe(this.operatorList)
            .map(filter_operator_base_1.toJSON)
            .subscribe(function (x) {
            _this.operators = x;
        });
    };
    BaseFilterCellComponent.prototype.ngOnDestroy = function () {
        if (this.operationListSubscription) {
            this.operationListSubscription.unsubscribe();
        }
    };
    BaseFilterCellComponent.prototype.filterByField = function (field) {
        var currentFilter = this.filtersByField(field)[0];
        return currentFilter;
    };
    BaseFilterCellComponent.prototype.filtersByField = function (field) {
        return flatten(this.filter || {}).filter(function (x) { return x.field === field; });
    };
    BaseFilterCellComponent.prototype.removeFilter = function (field) {
        trimFilterByField(this.filter, field);
        return this.filter;
    };
    BaseFilterCellComponent.prototype.updateFilter = function (filter) {
        var root = this.filter || {
            filters: [],
            logic: "and"
        };
        var currentFilter = flatten(root).filter(function (x) { return x.field === filter.field; })[0];
        if (!utils_1.isPresent(currentFilter)) {
            root.filters.push(filter);
        }
        else {
            Object.assign(currentFilter, filter);
        }
        return root;
    };
    BaseFilterCellComponent.prototype.applyFilter = function (filter) {
        this.filterService.filter(filter);
    };
    return BaseFilterCellComponent;
}());
BaseFilterCellComponent.propDecorators = {
    'hostClasses': [{ type: core_1.HostBinding, args: ['class.k-filtercell',] },],
    'operatorList': [{ type: core_1.ContentChildren, args: [filter_operator_base_1.FilterOperatorBase,] },],
};
exports.BaseFilterCellComponent = BaseFilterCellComponent;
