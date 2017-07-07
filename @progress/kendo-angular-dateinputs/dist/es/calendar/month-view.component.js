/* tslint:disable:component-selector-name  component-selector-type */
import { Component, ChangeDetectionStrategy, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { VirtualizationComponent } from './virtualization.component';
import { MIN_DATE, MAX_DATE } from '../defaults';
import { DOMService } from './services/dom.service';
import { MonthViewService } from './services/month-view.service';
import { addMonths, cloneDate, firstDayOfMonth } from '@progress/kendo-date-math';
import { dateInRange, generateDates, isInDatesArray, monthsDistance } from '../util';
/**
 * @hidden
 */
var MonthViewComponent = (function () {
    function MonthViewComponent(service, dom) {
        this.service = service;
        this.isActive = true;
        this.min = new Date(MIN_DATE);
        this.max = new Date(MAX_DATE);
        this.change = new EventEmitter();
        this.dates = [];
        this.take = 3;
        this.indexToScroll = -1;
        this.minViewsToRender = 1;
        this.viewHeight = dom.monthViewHeight();
        this.viewOffset = -1 * dom.monthHeaderHeight();
        this.bottomOffset = dom.monthScrollableContentHeight() - this.viewHeight;
    }
    Object.defineProperty(MonthViewComponent.prototype, "getComponentClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    MonthViewComponent.prototype.ngOnChanges = function (changes) {
        var focusedDate = this.focusedDate;
        var viewDate = this.getViewDate(focusedDate);
        var total = monthsDistance(this.max, this.min) + 1;
        var totalChanged = this.total && this.total !== total;
        this.activeDate = cloneDate(focusedDate);
        this.skip = monthsDistance(viewDate, this.min);
        this.total = total;
        if (totalChanged || !isInDatesArray(focusedDate, this.dates)) {
            this.dates = generateDates(firstDayOfMonth(viewDate), this.getTake(monthsDistance(viewDate, this.min)));
        }
        if (!!changes.focusedDate || this.virtualization.isIndexVisible(this.skip)) {
            this.indexToScroll = monthsDistance(this.focusedDate, this.min);
        }
    };
    MonthViewComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.scrollOnce(function (index) { return _this.virtualization.scrollToIndex(index); });
    };
    MonthViewComponent.prototype.ngAfterViewChecked = function () {
        var _this = this;
        this.scrollOnce(function (index) { return _this.virtualization.animateToIndex(index); });
    };
    MonthViewComponent.prototype.trackByDates = function (_, date) {
        return date.getFullYear() + "-" + date.getMonth();
    };
    MonthViewComponent.prototype.pageChange = function (_a) {
        var skip = _a.skip;
        this.dates = generateDates(addMonths(this.min, skip), this.getTake(skip));
    };
    MonthViewComponent.prototype.scrollChange = function (_a) {
        var offset = _a.offset;
        this.style = { transform: "translateY(" + offset + "px)" };
    };
    MonthViewComponent.prototype.setActiveDate = function (index) {
        this.activeDate = addMonths(this.min, index);
    };
    MonthViewComponent.prototype.handleDateChange = function (candidate) {
        this.change.emit(candidate);
    };
    MonthViewComponent.prototype.getTake = function (skip) {
        return Math.min(this.total - skip, this.take);
    };
    MonthViewComponent.prototype.getViewDate = function (date) {
        var renderTwoViews = monthsDistance(this.max, date) < this.minViewsToRender;
        var candidate = renderTwoViews ? addMonths(date, -1) : date;
        return dateInRange(candidate, this.min, this.max);
    };
    MonthViewComponent.prototype.scrollOnce = function (action) {
        if (this.indexToScroll !== -1) {
            action(this.indexToScroll);
            this.indexToScroll = -1;
        }
    };
    return MonthViewComponent;
}());
export { MonthViewComponent };
MonthViewComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-calendar-monthview',
                template: "\n    <kendo-calendar-header\n        [currentDate]=\"activeDate\"\n        [min]=\"min\"\n        [max]=\"max\"\n        (today)=\"handleDateChange($event)\"\n    >\n    </kendo-calendar-header>\n    <table class=\"k-calendar-weekdays\">\n        <colgroup><col/><col/><col/><col/><col/><col/><col/></colgroup>\n        <thead>\n            <tr>\n                <th *ngFor=\"let name of service.weekNames()\">{{name}}</th>\n            </tr>\n        </thead>\n    </table>\n    <kendo-calendar-virtualization\n        [skip]=\"skip\"\n        [take]=\"take\"\n        [total]=\"total\"\n        [itemHeight]=\"viewHeight\"\n        [topOffset]=\"viewOffset\"\n        [bottomOffset]=\"bottomOffset\"\n        [scrollOffsetHeight]=\"viewOffset\"\n        (pageChange)=\"pageChange($event)\"\n        (scrollChange)=\"scrollChange($event)\"\n        (activeIndexChange)=\"setActiveDate($event)\"\n        >\n        <table [ngStyle]=\"style\">\n            <colgroup><col/><col/><col/><col/><col/><col/><col/></colgroup>\n            <tbody kendoCalendarMonth *ngFor=\"let date of dates;trackBy: trackByDates\"\n                   role=\"rowgroup\"\n                   [isActive]=\"isActive\"\n                   [min]=\"min\"\n                   [max]=\"max\"\n                   [cellUID]=\"cellUID\"\n                   [viewDate]=\"date\"\n                   [focusedDate]=\"focusedDate\"\n                   [selectedDate]=\"value\"\n                   [templateRef]=\"cellTemplateRef\"\n                   (change)=\"handleDateChange($event)\"\n            ></tbody>\n        </table>\n    </kendo-calendar-virtualization>\n  "
            },] },
];
/** @nocollapse */
MonthViewComponent.ctorParameters = function () { return [
    { type: MonthViewService, },
    { type: DOMService, },
]; };
MonthViewComponent.propDecorators = {
    'cellTemplateRef': [{ type: Input },],
    'cellUID': [{ type: Input },],
    'focusedDate': [{ type: Input },],
    'isActive': [{ type: Input },],
    'min': [{ type: Input },],
    'max': [{ type: Input },],
    'value': [{ type: Input },],
    'change': [{ type: Output },],
    'virtualization': [{ type: ViewChild, args: [VirtualizationComponent,] },],
    'getComponentClass': [{ type: HostBinding, args: ["class.k-calendar-monthview",] },],
};
