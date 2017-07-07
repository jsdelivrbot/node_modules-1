"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:component-selector-name  component-selector-type */
var core_1 = require("@angular/core");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var virtualization_component_1 = require("./virtualization.component");
var defaults_1 = require("../defaults");
var dom_service_1 = require("./services/dom.service");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var util_1 = require("../util");
/**
 * @hidden
 */
var NavigationComponent = (function () {
    function NavigationComponent(dom, intlService) {
        this.min = new Date(defaults_1.MIN_DATE);
        this.max = new Date(defaults_1.MAX_DATE);
        this.focusedDate = new Date();
        this.valueChange = new core_1.EventEmitter();
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
        var viewDate = util_1.dateInRange(this.focusedDate, this.min, this.max);
        var total = util_1.monthsDistance(this.max, this.min) + 1;
        var totalChanged = this.total && this.total !== total;
        this.skip = util_1.monthsDistance(viewDate, this.min);
        this.total = total;
        if (totalChanged || !util_1.isInDatesArray(viewDate, this.dates)) {
            this.dates = util_1.generateDates(kendo_date_math_1.firstDayOfMonth(viewDate), this.getTake(this.skip));
        }
        if (!!changes.focusedDate || totalChanged) {
            this.indexToScroll = util_1.monthsDistance(this.focusedDate, this.min);
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
        this.dates = util_1.generateDates(kendo_date_math_1.addMonths(this.min, skip), this.getTake(skip));
    };
    NavigationComponent.prototype.scrollChange = function (_a) {
        var offset = _a.offset;
        this.style = { transform: "translateY(" + offset + "px)" };
    };
    NavigationComponent.prototype.handleDateChange = function (candidate) {
        this.valueChange.emit(kendo_date_math_1.cloneDate(candidate));
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
NavigationComponent.decorators = [
    { type: core_1.Component, args: [{
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                selector: 'kendo-calendar-navigation',
                template: "\n    <span class=\"k-calendar-navigation-highlight\"></span>\n    <kendo-calendar-virtualization\n        [skip]=\"skip\"\n        [take]=\"take\"\n        [total]=\"total\"\n        [itemHeight]=\"itemHeight\"\n        [topOffset]=\"topOffset\"\n        [bottomOffset]=\"bottomOffset\"\n        (pageChange)=\"pageChange($event)\"\n        (scrollChange)=\"scrollChange($event)\"\n    >\n        <ul [ngStyle]=\"style\" class=\"k-reset\">\n            <li *ngFor=\"let date of dates;trackBy: trackByDates\" (click)=\"handleDateChange(date)\">\n                <span *ngIf=\"!date.getMonth()\" class=\"k-calendar-navigation-marker\">{{date.getFullYear()}}</span>\n                <span *ngIf=\"date.getMonth()\">{{monthNames[date.getMonth()]}}</span>\n            </li>\n        </ul>\n    </kendo-calendar-virtualization>\n  "
            },] },
];
/** @nocollapse */
NavigationComponent.ctorParameters = function () { return [
    { type: dom_service_1.DOMService, },
    { type: kendo_angular_intl_1.IntlService, },
]; };
NavigationComponent.propDecorators = {
    'min': [{ type: core_1.Input },],
    'max': [{ type: core_1.Input },],
    'focusedDate': [{ type: core_1.Input },],
    'valueChange': [{ type: core_1.Output },],
    'virtualization': [{ type: core_1.ViewChild, args: [virtualization_component_1.VirtualizationComponent,] },],
    'getComponentClass': [{ type: core_1.HostBinding, args: ["class.k-calendar-navigation",] },],
};
exports.NavigationComponent = NavigationComponent;
