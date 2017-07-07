"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var column_base_1 = require("./column-base");
var details_service_1 = require("./details.service");
var groups_service_1 = require("./grouping/groups.service");
var change_notification_service_1 = require("./change-notification.service");
var utils_1 = require("./utils");
var edit_service_1 = require("./edit.service");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var column_common_1 = require("./column-common");
/**
 * @hidden
 */
var TableBodyComponent = (function () {
    function TableBodyComponent(detailsService, groupsService, changeNotification, editService, localization) {
        this.detailsService = detailsService;
        this.groupsService = groupsService;
        this.changeNotification = changeNotification;
        this.editService = editService;
        this.localization = localization;
        this.columns = [];
        this.groups = [];
        this.skip = 0;
        this.noRecordsText = this.localization.get('noRecords');
        this.skipGroupDecoration = false;
        this.showGroupFooters = false;
        this.lockedColumnsCount = 0;
        this.rowClass = function () { return null; };
    }
    Object.defineProperty(TableBodyComponent.prototype, "newDataItem", {
        get: function () {
            return this.editService.newDataItem;
        },
        enumerable: true,
        configurable: true
    });
    TableBodyComponent.prototype.toggleRow = function (index, dataItem) {
        this.detailsService.toggleRow(index, dataItem);
        return false;
    };
    TableBodyComponent.prototype.trackByFn = function (_, item) {
        return item.data ? item.data : item;
    };
    TableBodyComponent.prototype.isExpanded = function (index) {
        return this.detailsService.isExpanded(index);
    };
    TableBodyComponent.prototype.detailButtonStyles = function (index) {
        var expanded = this.isExpanded(index);
        return { 'k-minus': expanded, 'k-plus': !expanded };
    };
    TableBodyComponent.prototype.isGroup = function (item) {
        return item.type === 'group';
    };
    TableBodyComponent.prototype.isDataItem = function (item) {
        return !this.isGroup(item) && !this.isFooter(item);
    };
    TableBodyComponent.prototype.isFooter = function (item) {
        return item.type === 'footer';
    };
    TableBodyComponent.prototype.isInExpandedGroup = function (item) {
        return this.groupsService.isInExpandedGroup(item.groupIndex, false);
    };
    TableBodyComponent.prototype.isParentGroupExpanded = function (item) {
        return this.groupsService.isInExpandedGroup(item.index || item.groupIndex);
    };
    TableBodyComponent.prototype.isOdd = function (item) {
        return item.index % 2 === 0;
    };
    TableBodyComponent.prototype.ngOnChanges = function (changes) {
        if (utils_1.isChanged("columns", changes, false)) {
            this.changeNotification.notify();
        }
    };
    Object.defineProperty(TableBodyComponent.prototype, "columnsSpan", {
        get: function () {
            return column_common_1.columnsSpan(this.columns);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBodyComponent.prototype, "colSpan", {
        get: function () {
            return this.columnsSpan + this.groups.length + (utils_1.isPresent(this.detailTemplate) ? 1 : 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBodyComponent.prototype, "footerColumns", {
        get: function () {
            return column_common_1.columnsToRender(this.columns);
        },
        enumerable: true,
        configurable: true
    });
    TableBodyComponent.prototype.isSpanColumn = function (column) {
        return column_base_1.isSpanColumn(column) && !column.templateRef;
    };
    TableBodyComponent.prototype.childColumns = function (column) {
        return column_common_1.columnsToRender([column]);
    };
    TableBodyComponent.prototype.isBoundColumn = function (column) {
        return column.field && !column.templateRef;
    };
    return TableBodyComponent;
}());
TableBodyComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: '[kendoGridTableBody]',
                template: "\n    <ng-template [ngIf]=\"editService.hasNewItem\">\n        <tr class=\"k-grid-add-row k-grid-edit-row\">\n            <ng-template [ngIf]=\"!skipGroupDecoration\">\n                <td [class.k-group-cell]=\"true\" *ngFor=\"let g of groups\"></td>\n            </ng-template>\n            <td [class.k-hierarchy-cell]=\"true\"\n                *ngIf=\"detailTemplate?.templateRef\">\n            </td>\n            <td\n                kendoGridCell\n                [rowIndex]=\"-1\"\n                [isNew]=\"true\"\n                [column]=\"column\"\n                [dataItem]=\"newDataItem\"\n                [ngClass]=\"column.cssClass\"\n                [ngStyle]=\"column.style\"\n                [attr.colspan]=\"column.colspan\"\n                *ngFor=\"let column of columns; let columnIndex = index\">\n                <ng-template\n                    [templateContext]=\"{\n                        templateRef: column.templateRef,\n                        dataItem: newDataItem,\n                        column: column,\n                        columnIndex: columnIndex,\n                        rowIndex: -1,\n                        isNew: true,\n                        $implicit: newDataItem\n                        }\">\n                </ng-template>\n                <ng-template [ngIf]=\"isBoundColumn(column)\">{{newDataItem | valueOf: column.field: column.format}}</ng-template>\n            </td>\n        </tr>\n    </ng-template>\n    <tr *ngIf=\"data?.length === 0 || data == null\" class=\"k-grid-norecords\">\n        <td [attr.colspan]=\"colSpan\">\n            <ng-template\n                [ngIf]=\"noRecordsTemplate?.templateRef\"\n                [templateContext]=\"{\n                    templateRef: noRecordsTemplate?.templateRef\n                 }\">\n            </ng-template>\n            <ng-container *ngIf=\"!noRecordsTemplate?.templateRef\">\n                {{noRecordsText}}\n            </ng-container>\n        </td>\n    </tr>\n    <ng-template ngFor\n        [ngForOf]=\"data\"\n        [ngForTrackBy]=\"trackByFn\"\n        let-item>\n        <tr *ngIf=\"isGroup(item) && isParentGroupExpanded(item)\"\n            kendoGridGroupHeader\n            [columns]=\"columns\"\n            [groups]=\"groups\"\n            [item]=\"item\"\n            [hasDetails]=\"detailTemplate?.templateRef\"\n            [skipGroupDecoration]=\"skipGroupDecoration\">\n        </tr>\n        <tr\n            *ngIf=\"isDataItem(item) && isInExpandedGroup(item)\"\n            [ngClass]=\"rowClass({ dataItem: item.data, index: item.index })\"\n            [class.k-alt]=\"isOdd(item)\"\n            [class.k-master-row]=\"detailTemplate?.templateRef\"\n            [class.k-grid-edit-row]=\"editService.isEdited(item.index)\"\n            [kendoGridSelectable]=\"selectable\"\n            [index]=\"item.index\">\n            <ng-template [ngIf]=\"!skipGroupDecoration\">\n                <td [class.k-group-cell]=\"true\" *ngFor=\"let g of groups\"></td>\n            </ng-template>\n            <td [class.k-hierarchy-cell]=\"true\"\n                *ngIf=\"detailTemplate?.templateRef\">\n                <a class=\"k-icon\"\n                    *ngIf=\"detailTemplate.showIf(item.data, item.index)\"\n                    [ngClass]=\"detailButtonStyles(item.index)\"\n                    href=\"#\" tabindex=\"-1\" (click)=\"toggleRow(item.index, item.data)\"></a>\n            </td>\n            <td\n                kendoGridCell\n                [rowIndex]=\"item.index\"\n                [column]=\"column\"\n                [dataItem]=\"item.data\"\n                [ngClass]=\"column.cssClass\"\n                [ngStyle]=\"column.style\"\n                [attr.colspan]=\"column.colspan\"\n                *ngFor=\"let column of columns; let columnIndex = index\">\n                <ng-template\n                    [templateContext]=\"{\n                        templateRef: column.templateRef,\n                        dataItem: item.data,\n                        column: column,\n                        columnIndex: lockedColumnsCount + columnIndex,\n                        rowIndex: item.index,\n                        $implicit: item.data\n                        }\">\n                </ng-template>\n                <ng-template [ngIf]=\"isSpanColumn(column)\">\n                    <ng-template ngFor let-childColumn [ngForOf]=\"childColumns(column)\">\n                        {{item.data | valueOf: childColumn.field: childColumn.format}}\n                    </ng-template>\n                </ng-template>\n                <ng-template [ngIf]=\"isBoundColumn(column)\">{{item.data | valueOf: column.field: column.format}}</ng-template>\n            </td>\n        </tr>\n        <tr *ngIf=\"isDataItem(item) && isInExpandedGroup(item) && detailTemplate?.templateRef &&\n            detailTemplate.showIf(item.data, item.index) && isExpanded(item.index)\"\n            [class.k-detail-row]=\"true\"\n            [class.k-alt]=\"isOdd(item)\">\n            <td [class.k-group-cell]=\"true\" *ngFor=\"let g of groups\"></td>\n            <td [class.k-hierarchy-cell]=\"true\"></td>\n            <td [class.k-detail-cell]=\"true\"\n                [attr.colspan]=\"columnsSpan\">\n                <ng-template\n                    [templateContext]=\"{\n                        templateRef: detailTemplate?.templateRef,\n                        dataItem: item.data,\n                        rowIndex: item.index,\n                        $implicit: item.data\n                        }\">\n                </ng-template>\n            </td>\n        </tr>\n        <tr *ngIf=\"isFooter(item) && (isInExpandedGroup(item) || (showGroupFooters && isParentGroupExpanded(item)))\"\n            [class.k-group-footer]=\"true\">\n            <ng-template [ngIf]=\"!skipGroupDecoration\">\n                <td [class.k-group-cell]=\"true\" *ngFor=\"let g of groups\"></td>\n            </ng-template>\n            <td [class.k-hierarchy-cell]=\"true\"\n                *ngIf=\"detailTemplate?.templateRef\">\n            </td>\n            <td\n                *ngFor=\"let column of footerColumns;\">\n                <ng-template\n                    [templateContext]=\"{\n                        templateRef: column.groupFooterTemplateRef,\n                        group: item.data,\n                        field: column.field,\n                        column: column,\n                        $implicit: item.data?.aggregates\n                        }\">\n                </ng-template>\n           </td>\n        </tr>\n    </ng-template>\n    "
            },] },
];
/** @nocollapse */
TableBodyComponent.ctorParameters = function () { return [
    { type: details_service_1.DetailsService, },
    { type: groups_service_1.GroupsService, },
    { type: change_notification_service_1.ChangeNotificationService, },
    { type: edit_service_1.EditService, },
    { type: kendo_angular_l10n_1.LocalizationService, },
]; };
TableBodyComponent.propDecorators = {
    'columns': [{ type: core_1.Input },],
    'groups': [{ type: core_1.Input },],
    'detailTemplate': [{ type: core_1.Input },],
    'noRecordsTemplate': [{ type: core_1.Input },],
    'data': [{ type: core_1.Input },],
    'skip': [{ type: core_1.Input },],
    'selectable': [{ type: core_1.Input },],
    'noRecordsText': [{ type: core_1.Input },],
    'skipGroupDecoration': [{ type: core_1.Input },],
    'showGroupFooters': [{ type: core_1.Input },],
    'lockedColumnsCount': [{ type: core_1.Input },],
    'rowClass': [{ type: core_1.Input },],
};
exports.TableBodyComponent = TableBodyComponent;
