"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var column_group_component_1 = require("./column-group.component");
var sort_settings_1 = require("./sort-settings");
var utils_1 = require("./utils");
var draggable_directive_1 = require("./draggable.directive");
var group_connection_service_1 = require("./grouping/group-connection.service");
var column_common_1 = require("./column-common");
/**
 * @hidden
 */
var HeaderComponent = (function () {
    function HeaderComponent(groupDragService) {
        this.groupDragService = groupDragService;
        this.columns = [];
        this.groups = [];
        this.sort = new Array();
        this.sortable = false;
        this.groupable = false;
        this.lockedColumnsCount = 0;
        this.sortChange = new core_1.EventEmitter();
    }
    Object.defineProperty(HeaderComponent.prototype, "headerClass", {
        get: function () {
            return !this.scrollable;
        },
        enumerable: true,
        configurable: true
    });
    HeaderComponent.prototype.sortColumn = function (column, event, link, icon) {
        var target = event ? event.target : null;
        if (column.headerTemplateRef && target !== link && target !== icon) {
            return false;
        }
        this.sortChange.emit(this.toggleSort(column));
        //prevent default
        return false;
    };
    HeaderComponent.prototype.sortIcon = function (field) {
        var state = this.sortDescriptor(field);
        return {
            'k-icon': utils_1.isPresent(state.dir),
            'k-i-sort-desc-sm': state.dir === "desc",
            'k-i-sort-asc-sm': state.dir === "asc"
        };
    };
    HeaderComponent.prototype.toggleSort = function (column) {
        var _a = sort_settings_1.normalize(this.sortable, column.sortable), allowUnsort = _a.allowUnsort, mode = _a.mode;
        var descriptor = this.toggleDirection(column.field, allowUnsort);
        if (mode === 'single') {
            return [descriptor];
        }
        return this.sort.filter(function (desc) { return desc.field !== column.field; }).concat([descriptor]);
    };
    HeaderComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var isNotGrouped = function (_a) {
            var column = _a.column;
            return _this.groupable && !_this.groups.some(function (group) { return group.field === column.field; });
        };
        this.draggablesSubscription = utils_1.observe(this.draggables).subscribe(function (items) {
            return _this.groupDragService.connect(items.filter(function (x) { return utils_1.isPresent(x.column.field); }), isNotGrouped);
        });
    };
    HeaderComponent.prototype.ngOnDestroy = function () {
        this.groupDragService.unsubscribe();
        if (this.draggablesSubscription) {
            this.draggablesSubscription.unsubscribe();
        }
    };
    HeaderComponent.prototype.isFirstOnRow = function (column, index) {
        var _this = this;
        var isTailing = function (c) { return c &&
            (_this.columnsForLevel(c.level).indexOf(c) > 0 || isTailing(c.parent)); };
        return index === 0 && !this.groups.length && !this.detailTemplate && isTailing(column.parent);
    };
    HeaderComponent.prototype.isSortable = function (column) {
        return !utils_1.isNullOrEmptyString(column.field)
            && utils_1.isTruthy(this.sortable) && utils_1.isTruthy(column.sortable);
    };
    HeaderComponent.prototype.toggleDirection = function (field, allowUnsort) {
        var descriptor = this.sortDescriptor(field);
        var dir = 'asc';
        if (descriptor.dir === 'asc') {
            dir = 'desc';
        }
        else if (descriptor.dir === 'desc' && allowUnsort) {
            dir = undefined;
        }
        return { dir: dir, field: field };
    };
    HeaderComponent.prototype.columnsForLevel = function (level) {
        return column_common_1.columnsToRender(this.columns ? this.columns.filter(function (column) { return column.level === level; }) : []);
    };
    HeaderComponent.prototype.isColumnGroupComponent = function (column) {
        return column_group_component_1.isColumnGroupComponent(column);
    };
    HeaderComponent.prototype.sortDescriptor = function (field) {
        return this.sort.find(function (item) { return item.field === field; }) || { field: field };
    };
    Object.defineProperty(HeaderComponent.prototype, "columnLevels", {
        get: function () {
            return new Array((this.totalColumnLevels || 0) + 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderComponent.prototype, "leafColumns", {
        get: function () {
            return column_common_1.columnsToRender(this.columns || []).filter(function (x) { return !column_group_component_1.isColumnGroupComponent(x); });
        },
        enumerable: true,
        configurable: true
    });
    return HeaderComponent;
}());
HeaderComponent.decorators = [
    { type: core_1.Component, args: [{
                providers: [group_connection_service_1.GroupDragService],
                selector: '[kendoGridHeader]',
                template: "\n    <ng-template [ngIf]=\"true\">\n        <tr *ngFor=\"let i of columnLevels; let levelIndex = index\">\n            <th\n                [class.k-group-cell]=\"true\"\n                [class.k-header]=\"true\"\n                *ngFor=\"let g of groups\">\n            </th>\n            <th\n                [class.k-hierarchy-cell]=\"true\"\n                [class.k-header]=\"true\"\n                *ngIf=\"detailTemplate?.templateRef\">\n            </th>\n            <ng-template ngFor let-column [ngForOf]=\"columnsForLevel(levelIndex)\" let-columnIndex=\"index\">\n                <th [kendoGridDraggable]=\"column\"\n                    [class.k-header]=\"true\"\n                    [class.k-first]=\"isFirstOnRow(column, columnIndex)\"\n                    *ngIf=\"!isColumnGroupComponent(column)\"\n                    [ngClass]=\"column.headerClass\"\n                    [ngStyle]=\"column.headerStyle\"\n                    [attr.rowspan]=\"column.rowspan(totalColumnLevels)\"\n                    [attr.colspan]=\"column.colspan\">\n                    <ng-template [ngIf]=\"!isSortable(column)\">\n                        <ng-template\n                            [templateContext]=\"{\n                                templateRef: column.headerTemplateRef,\n                                columnIndex: lockedColumnsCount + columnIndex,\n                                column: column,\n                                $implicit: column\n                            }\">\n                        </ng-template>\n                        <ng-template [ngIf]=\"!column.headerTemplateRef\">{{column.displayTitle}}</ng-template>\n                    </ng-template>\n                    <ng-template [ngIf]=\"isSortable(column)\">\n                        <a href=\"#\" #link class=\"k-link\" (click)=\"sortColumn(column, $event, link, sortSpan)\">\n                            <ng-template\n                                [templateContext]=\"{\n                                    templateRef: column.headerTemplateRef,\n                                    columnIndex: columnIndex,\n                                    column: column,\n                                    $implicit: column\n                                }\">\n                            </ng-template>\n                            <ng-template [ngIf]=\"!column.headerTemplateRef\">{{column.displayTitle}}</ng-template>\n                            <span #sortSpan [ngClass]=\"sortIcon(column.field)\"></span>\n                        </a>\n                    </ng-template>\n                </th>\n                <th *ngIf=\"isColumnGroupComponent(column)\"\n                    [class.k-header]=\"true\"\n                    [class.k-first]=\"isFirstOnRow(column, columnIndex)\"\n                    [ngClass]=\"column.headerClass\"\n                    [ngStyle]=\"column.headerStyle\"\n                    [attr.rowspan]=\"column.rowspan(totalColumnLevels)\"\n                    [attr.colspan]=\"column.colspan\">\n                        <ng-template\n                            [templateContext]=\"{\n                                templateRef: column.headerTemplateRef,\n                                columnIndex: lockedColumnsCount + columnIndex,\n                                column: column,\n                                $implicit: column\n                            }\">\n                        </ng-template>\n                        <ng-template [ngIf]=\"!column.headerTemplateRef\">{{column.displayTitle}}</ng-template>\n                </th>\n            </ng-template>\n        </tr>\n        <tr kendoGridFilterRow\n            *ngIf=\"filterable\"\n            [columns]=\"leafColumns\"\n            [filter]=\"filter\"\n            [groups]=\"groups\"\n            [detailTemplate]=\"detailTemplate\"\n        ></tr>\n    </ng-template>\n    "
            },] },
];
/** @nocollapse */
HeaderComponent.ctorParameters = function () { return [
    { type: group_connection_service_1.GroupDragService, },
]; };
HeaderComponent.propDecorators = {
    'totalColumnLevels': [{ type: core_1.Input },],
    'columns': [{ type: core_1.Input },],
    'groups': [{ type: core_1.Input },],
    'detailTemplate': [{ type: core_1.Input },],
    'scrollable': [{ type: core_1.Input },],
    'filterable': [{ type: core_1.Input },],
    'sort': [{ type: core_1.Input },],
    'filter': [{ type: core_1.Input },],
    'sortable': [{ type: core_1.Input },],
    'groupable': [{ type: core_1.Input },],
    'lockedColumnsCount': [{ type: core_1.Input },],
    'sortChange': [{ type: core_1.Output },],
    'headerClass': [{ type: core_1.HostBinding, args: ['class.k-grid-header',] },],
    'draggables': [{ type: core_1.ViewChildren, args: [draggable_directive_1.DraggableDirective,] },],
};
exports.HeaderComponent = HeaderComponent;
