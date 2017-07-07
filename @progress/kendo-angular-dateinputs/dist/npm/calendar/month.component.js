"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:component-selector-name  component-selector */
var core_1 = require("@angular/core");
var month_view_service_1 = require("./services/month-view.service");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var util_1 = require("../util");
/**
 * @hidden
 */
var MonthComponent = (function () {
    function MonthComponent(service, intl) {
        this.service = service;
        this.intl = intl;
        this.isActive = true;
        this.showWeekNumbers = false;
        this.change = new core_1.EventEmitter();
        this.today = kendo_date_math_1.getDate(new Date());
    }
    MonthComponent.prototype.ngOnChanges = function (_) {
        this.viewData = this.service.viewData({
            cellUID: this.cellUID,
            focusedDate: this.focusedDate,
            max: this.max,
            min: this.min,
            selectedDate: this.selectedDate,
            viewDate: this.viewDate
        });
        this.title = this.service.title(this.viewDate);
    };
    MonthComponent.prototype.handleClick = function (ctx) {
        this.change.emit(ctx.value);
    };
    MonthComponent.prototype.trackRow = function (_, row) {
        return row.map(util_1.cellContextToString).join("");
    };
    MonthComponent.prototype.trackCell = function (_, ctx) {
        return util_1.cellContextToString(ctx);
    };
    //TODO: move to service if implementation stays in future
    MonthComponent.prototype.firstDate = function (rowCtx) {
        var idx = 0;
        var ctx = rowCtx[idx];
        while (!ctx && idx < rowCtx.length) {
            ctx = rowCtx[++idx];
        }
        return ctx ? ctx.value : null;
    };
    MonthComponent.prototype.getStyles = function (context) {
        return util_1.stringifyClassObject({
            'k-state-focused': this.isActive && context.isFocused,
            'k-state-selected': context.isSelected,
            'k-today': kendo_date_math_1.isEqual(context.value, this.today),
            'k-weekend': context.isWeekend
        });
    };
    return MonthComponent;
}());
MonthComponent.decorators = [
    { type: core_1.Component, args: [{
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                selector: '[kendoCalendarMonth]',
                template: "\n    <tr role=\"row\"><th scope=\"col\" [colSpan]=\"!showWeekNumbers ? 7 : 8\">{{title}}</th></tr>\n    <tr *ngFor=\"let row of viewData;trackBy:trackRow\" role=\"row\">\n        <ng-template [ngIf]=\"showWeekNumbers\">\n            <td *ngIf=\"!firstDate(row)\">&nbsp;</td>\n            <td *ngIf=\"firstDate(row)\">{{service.weekNumber(firstDate(row))}}</td>\n        </ng-template>\n        <ng-template ngFor [ngForOf]=\"row\" let-cellContext [ngForTrackBy]=\"trackCell\">\n            <td *ngIf=\"!cellContext\">&nbsp;</td>\n            <td *ngIf=\"cellContext\"\n                role=\"gridcell\"\n                [attr.id]=\"cellContext.id\"\n                [attr.aria-selected]=\"cellContext.isSelected\"\n                [ngClass]=\"getStyles(cellContext)\"\n                [title]=\"intl.formatDate(cellContext.value, 'D')\"\n                (click)=\"handleClick(cellContext)\"\n            >\n                <span class=\"k-link\">\n                    <ng-template [ngIf]=\"!templateRef\">{{service.dayValue(cellContext.value)}}</ng-template>\n                    <ng-template\n                        [ngIf]=\"templateRef\"\n                        [ngTemplateOutlet]=\"templateRef\"\n                        [ngOutletContext]=\"{ $implicit: cellContext.value, cellContext: cellContext }\"\n                    ></ng-template>\n                </span>\n            </td>\n        </ng-template>\n    </tr>\n  "
            },] },
];
/** @nocollapse */
MonthComponent.ctorParameters = function () { return [
    { type: month_view_service_1.MonthViewService, },
    { type: kendo_angular_intl_1.IntlService, },
]; };
MonthComponent.propDecorators = {
    'isActive': [{ type: core_1.Input },],
    'cellUID': [{ type: core_1.Input },],
    'focusedDate': [{ type: core_1.Input },],
    'selectedDate': [{ type: core_1.Input },],
    'viewDate': [{ type: core_1.Input },],
    'min': [{ type: core_1.Input },],
    'max': [{ type: core_1.Input },],
    'showWeekNumbers': [{ type: core_1.Input },],
    'viewIndex': [{ type: core_1.Input },],
    'templateRef': [{ type: core_1.Input },],
    'change': [{ type: core_1.Output },],
};
exports.MonthComponent = MonthComponent;
