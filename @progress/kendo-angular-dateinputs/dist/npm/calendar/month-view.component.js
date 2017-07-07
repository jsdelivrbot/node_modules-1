"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:component-selector-name  component-selector-type */
var core_1 = require("@angular/core");
var virtualization_component_1 = require("./virtualization.component");
var defaults_1 = require("../defaults");
var dom_service_1 = require("./services/dom.service");
var month_view_service_1 = require("./services/month-view.service");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var util_1 = require("../util");
/**
 * @hidden
 */
var MonthViewComponent = (function () {
    function MonthViewComponent(service, dom) {
        this.service = service;
        this.isActive = true;
        this.min = new Date(defaults_1.MIN_DATE);
        this.max = new Date(defaults_1.MAX_DATE);
        this.change = new core_1.EventEmitter();
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
        var total = util_1.monthsDistance(this.max, this.min) + 1;
        var totalChanged = this.total && this.total !== total;
        this.activeDate = kendo_date_math_1.cloneDate(focusedDate);
        this.skip = util_1.monthsDistance(viewDate, this.min);
        this.total = total;
        if (totalChanged || !util_1.isInDatesArray(focusedDate, this.dates)) {
            this.dates = util_1.generateDates(kendo_date_math_1.firstDayOfMonth(viewDate), this.getTake(util_1.monthsDistance(viewDate, this.min)));
        }
        if (!!changes.focusedDate || this.virtualization.isIndexVisible(this.skip)) {
            this.indexToScroll = util_1.monthsDistance(this.focusedDate, this.min);
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
        this.dates = util_1.generateDates(kendo_date_math_1.addMonths(this.min, skip), this.getTake(skip));
    };
    MonthViewComponent.prototype.scrollChange = function (_a) {
        var offset = _a.offset;
        this.style = { transform: "translateY(" + offset + "px)" };
    };
    MonthViewComponent.prototype.setActiveDate = function (index) {
        this.activeDate = kendo_date_math_1.addMonths(this.min, index);
    };
    MonthViewComponent.prototype.handleDateChange = function (candidate) {
        this.change.emit(candidate);
    };
    MonthViewComponent.prototype.getTake = function (skip) {
        return Math.min(this.total - skip, this.take);
    };
    MonthViewComponent.prototype.getViewDate = function (date) {
        var renderTwoViews = util_1.monthsDistance(this.max, date) < this.minViewsToRender;
        var candidate = renderTwoViews ? kendo_date_math_1.addMonths(date, -1) : date;
        return util_1.dateInRange(candidate, this.min, this.max);
    };
    MonthViewComponent.prototype.scrollOnce = function (action) {
        if (this.indexToScroll !== -1) {
            action(this.indexToScroll);
            this.indexToScroll = -1;
        }
    };
    return MonthViewComponent;
}());
MonthViewComponent.decorators = [
    { type: core_1.Component, args: [{
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                selector: 'kendo-calendar-monthview',
                template: "\n    <kendo-calendar-header\n        [currentDate]=\"activeDate\"\n        [min]=\"min\"\n        [max]=\"max\"\n        (today)=\"handleDateChange($event)\"\n    >\n    </kendo-calendar-header>\n    <table class=\"k-calendar-weekdays\">\n        <colgroup><col/><col/><col/><col/><col/><col/><col/></colgroup>\n        <thead>\n            <tr>\n                <th *ngFor=\"let name of service.weekNames()\">{{name}}</th>\n            </tr>\n        </thead>\n    </table>\n    <kendo-calendar-virtualization\n        [skip]=\"skip\"\n        [take]=\"take\"\n        [total]=\"total\"\n        [itemHeight]=\"viewHeight\"\n        [topOffset]=\"viewOffset\"\n        [bottomOffset]=\"bottomOffset\"\n        [scrollOffsetHeight]=\"viewOffset\"\n        (pageChange)=\"pageChange($event)\"\n        (scrollChange)=\"scrollChange($event)\"\n        (activeIndexChange)=\"setActiveDate($event)\"\n        >\n        <table [ngStyle]=\"style\">\n            <colgroup><col/><col/><col/><col/><col/><col/><col/></colgroup>\n            <tbody kendoCalendarMonth *ngFor=\"let date of dates;trackBy: trackByDates\"\n                   role=\"rowgroup\"\n                   [isActive]=\"isActive\"\n                   [min]=\"min\"\n                   [max]=\"max\"\n                   [cellUID]=\"cellUID\"\n                   [viewDate]=\"date\"\n                   [focusedDate]=\"focusedDate\"\n                   [selectedDate]=\"value\"\n                   [templateRef]=\"cellTemplateRef\"\n                   (change)=\"handleDateChange($event)\"\n            ></tbody>\n        </table>\n    </kendo-calendar-virtualization>\n  "
            },] },
];
/** @nocollapse */
MonthViewComponent.ctorParameters = function () { return [
    { type: month_view_service_1.MonthViewService, },
    { type: dom_service_1.DOMService, },
]; };
MonthViewComponent.propDecorators = {
    'cellTemplateRef': [{ type: core_1.Input },],
    'cellUID': [{ type: core_1.Input },],
    'focusedDate': [{ type: core_1.Input },],
    'isActive': [{ type: core_1.Input },],
    'min': [{ type: core_1.Input },],
    'max': [{ type: core_1.Input },],
    'value': [{ type: core_1.Input },],
    'change': [{ type: core_1.Output },],
    'virtualization': [{ type: core_1.ViewChild, args: [virtualization_component_1.VirtualizationComponent,] },],
    'getComponentClass': [{ type: core_1.HostBinding, args: ["class.k-calendar-monthview",] },],
};
exports.MonthViewComponent = MonthViewComponent;
