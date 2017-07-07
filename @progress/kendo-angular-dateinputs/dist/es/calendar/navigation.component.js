/* tslint:disable:component-selector-name  component-selector-type */
import { Component, ChangeDetectionStrategy, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { VirtualizationComponent } from './virtualization.component';
import { MIN_DATE, MAX_DATE } from '../defaults';
import { DOMService } from './services/dom.service';
import { addMonths, cloneDate, firstDayOfMonth } from '@progress/kendo-date-math';
import { dateInRange, generateDates, isInDatesArray, monthsDistance } from '../util';
/**
 * @hidden
 */
var NavigationComponent = (function () {
    function NavigationComponent(dom, intlService) {
        this.min = new Date(MIN_DATE);
        this.max = new Date(MAX_DATE);
        this.focusedDate = new Date();
        this.valueChange = new EventEmitter();
        this.dates = [];
        this.take = 30;
        this.indexToScroll = -1;
        var calendarHeight = dom.calendarHeight();
        this.itemHeight = dom.navigationItemHeight();
        this.topOffset = (calendarHeight - this.itemHeight) / 2;
        this.bottomOffset = calendarHeight - this.itemHeight;
        this.monthNames = intlService.dateFormatNames({ nameType: 'abbreviated', type: 'months' });
    }
    Object.defineProperty(NavigationComponent.prototype, "getComponentClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    NavigationComponent.prototype.ngOnChanges = function (changes) {
        var viewDate = dateInRange(this.focusedDate, this.min, this.max);
        var total = monthsDistance(this.max, this.min) + 1;
        var totalChanged = this.total && this.total !== total;
        this.skip = monthsDistance(viewDate, this.min);
        this.total = total;
        if (totalChanged || !isInDatesArray(viewDate, this.dates)) {
            this.dates = generateDates(firstDayOfMonth(viewDate), this.getTake(this.skip));
        }
        if (!!changes.focusedDate || totalChanged) {
            this.indexToScroll = monthsDistance(this.focusedDate, this.min);
        }
    };
    NavigationComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.scrollOnce(function (index) { return _this.virtualization.scrollToIndex(index); });
    };
    NavigationComponent.prototype.ngAfterViewChecked = function () {
        var _this = this;
        this.scrollOnce(function (index) { return _this.virtualization.animateToIndex(index); });
    };
    NavigationComponent.prototype.trackByDates = function (_, date) {
        return date.getFullYear() + "-" + date.getMonth();
    };
    NavigationComponent.prototype.pageChange = function (_a) {
        var skip = _a.skip;
        this.dates = generateDates(addMonths(this.min, skip), this.getTake(skip));
    };
    NavigationComponent.prototype.scrollChange = function (_a) {
        var offset = _a.offset;
        this.style = { transform: "translateY(" + offset + "px)" };
    };
    NavigationComponent.prototype.handleDateChange = function (candidate) {
        this.valueChange.emit(cloneDate(candidate));
    };
    NavigationComponent.prototype.getTake = function (skip) {
        return Math.min(this.total - skip, this.take);
    };
    NavigationComponent.prototype.scrollOnce = function (action) {
        if (this.indexToScroll !== -1) {
            action(this.indexToScroll);
            this.indexToScroll = -1;
        }
    };
    return NavigationComponent;
}());
export { NavigationComponent };
NavigationComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-calendar-navigation',
                template: "\n    <span class=\"k-calendar-navigation-highlight\"></span>\n    <kendo-calendar-virtualization\n        [skip]=\"skip\"\n        [take]=\"take\"\n        [total]=\"total\"\n        [itemHeight]=\"itemHeight\"\n        [topOffset]=\"topOffset\"\n        [bottomOffset]=\"bottomOffset\"\n        (pageChange)=\"pageChange($event)\"\n        (scrollChange)=\"scrollChange($event)\"\n    >\n        <ul [ngStyle]=\"style\" class=\"k-reset\">\n            <li *ngFor=\"let date of dates;trackBy: trackByDates\" (click)=\"handleDateChange(date)\">\n                <span *ngIf=\"!date.getMonth()\" class=\"k-calendar-navigation-marker\">{{date.getFullYear()}}</span>\n                <span *ngIf=\"date.getMonth()\">{{monthNames[date.getMonth()]}}</span>\n            </li>\n        </ul>\n    </kendo-calendar-virtualization>\n  "
            },] },
];
/** @nocollapse */
NavigationComponent.ctorParameters = function () { return [
    { type: DOMService, },
    { type: IntlService, },
]; };
NavigationComponent.propDecorators = {
    'min': [{ type: Input },],
    'max': [{ type: Input },],
    'focusedDate': [{ type: Input },],
    'valueChange': [{ type: Output },],
    'virtualization': [{ type: ViewChild, args: [VirtualizationComponent,] },],
    'getComponentClass': [{ type: HostBinding, args: ["class.k-calendar-navigation",] },],
};
