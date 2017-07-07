"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var string_filter_cell_component_1 = require("./string-filter-cell.component");
var utils_1 = require("../utils");
var filter_cell_component_factory_1 = require("./filter-cell-component.factory");
/**
 * @hidden
 */
var FilterHostDirective = (function () {
    function FilterHostDirective(host, resolver) {
        this.host = host;
        this.resolver = resolver;
    }
    FilterHostDirective.prototype.ngOnInit = function () {
        this.component = this.host.createComponent(this.resolver.resolveComponentFactory(this.componentType()));
        this.initComponent({
            column: this.column,
            filter: this.filter
        });
    };
    FilterHostDirective.prototype.ngOnDestroy = function () {
        if (this.component) {
            this.component.destroy();
            this.component = null;
        }
    };
    FilterHostDirective.prototype.ngOnChanges = function (changes) {
        if (utils_1.anyChanged(["column", "filter"], changes)) {
            this.initComponent({
                column: this.column,
                filter: this.filter
            });
        }
    };
    FilterHostDirective.prototype.componentType = function () {
        if (!utils_1.isNullOrEmptyString(this.column.filter)) {
            return filter_cell_component_factory_1.filterComponentFactory(this.column.filter);
        }
        return string_filter_cell_component_1.StringFilterCellComponent;
    };
    FilterHostDirective.prototype.initComponent = function (_a) {
        var column = _a.column, filter = _a.filter;
        var instance = this.component.instance;
        instance.column = column;
        instance.filter = filter;
    };
    return FilterHostDirective;
}());
FilterHostDirective.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[kendoFilterHost]'
            },] },
];
/** @nocollapse */
FilterHostDirective.ctorParameters = function () { return [
    { type: core_1.ViewContainerRef, },
    { type: core_1.ComponentFactoryResolver, },
]; };
FilterHostDirective.propDecorators = {
    'column': [{ type: core_1.Input },],
    'filter': [{ type: core_1.Input },],
};
exports.FilterHostDirective = FilterHostDirective;
