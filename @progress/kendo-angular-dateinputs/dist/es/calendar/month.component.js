/* tslint:disable:component-selector-name  component-selector */
import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { MonthViewService } from './services/month-view.service';
import { IntlService } from '@progress/kendo-angular-intl';
import { getDate, isEqual } from '@progress/kendo-date-math';
import { cellContextToString, stringifyClassObject } from '../util';
/**
 * @hidden
 */
var MonthComponent = (function () {
    function MonthComponent(service, intl) {
        this.service = service;
        this.intl = intl;
        this.isActive = true;
        this.showWeekNumbers = false;
        this.change = new EventEmitter();
        this.today = getDate(new Date());
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
        return row.map(cellContextToString).join("");
    };
    MonthComponent.prototype.trackCell = function (_, ctx) {
        return cellContextToString(ctx);
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
        return stringifyClassObject({
            'k-state-focused': this.isActive && context.isFocused,
            'k-state-selected': context.isSelected,
            'k-today': isEqual(context.value, this.today),
            'k-weekend': context.isWeekend
        });
    };
    return MonthComponent;
}());
export { MonthComponent };
MonthComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: '[kendoCalendarMonth]',
                template: "\n    <tr role=\"row\"><th scope=\"col\" [colSpan]=\"!showWeekNumbers ? 7 : 8\">{{title}}</th></tr>\n    <tr *ngFor=\"let row of viewData;trackBy:trackRow\" role=\"row\">\n        <ng-template [ngIf]=\"showWeekNumbers\">\n            <td *ngIf=\"!firstDate(row)\">&nbsp;</td>\n            <td *ngIf=\"firstDate(row)\">{{service.weekNumber(firstDate(row))}}</td>\n        </ng-template>\n        <ng-template ngFor [ngForOf]=\"row\" let-cellContext [ngForTrackBy]=\"trackCell\">\n            <td *ngIf=\"!cellContext\">&nbsp;</td>\n            <td *ngIf=\"cellContext\"\n                role=\"gridcell\"\n                [attr.id]=\"cellContext.id\"\n                [attr.aria-selected]=\"cellContext.isSelected\"\n                [ngClass]=\"getStyles(cellContext)\"\n                [title]=\"intl.formatDate(cellContext.value, 'D')\"\n                (click)=\"handleClick(cellContext)\"\n            >\n                <span class=\"k-link\">\n                    <ng-template [ngIf]=\"!templateRef\">{{service.dayValue(cellContext.value)}}</ng-template>\n                    <ng-template\n                        [ngIf]=\"templateRef\"\n                        [ngTemplateOutlet]=\"templateRef\"\n                        [ngOutletContext]=\"{ $implicit: cellContext.value, cellContext: cellContext }\"\n                    ></ng-template>\n                </span>\n            </td>\n        </ng-template>\n    </tr>\n  "
            },] },
];
/** @nocollapse */
MonthComponent.ctorParameters = function () { return [
    { type: MonthViewService, },
    { type: IntlService, },
]; };
MonthComponent.propDecorators = {
    'isActive': [{ type: Input },],
    'cellUID': [{ type: Input },],
    'focusedDate': [{ type: Input },],
    'selectedDate': [{ type: Input },],
    'viewDate': [{ type: Input },],
    'min': [{ type: Input },],
    'max': [{ type: Input },],
    'showWeekNumbers': [{ type: Input },],
    'viewIndex': [{ type: Input },],
    'templateRef': [{ type: Input },],
    'change': [{ type: Output },],
};
