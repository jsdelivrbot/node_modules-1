"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var util_1 = require("../../util");
var EMPTY_DATA = [[]];
var CELLS_LENGTH = 7;
var ROWS_LENGTH = 6;
var SATURDAY = 6;
var SUNDAY = 0;
/**
 * @hidden
 */
var MonthViewService = (function () {
    function MonthViewService(_intlService) {
        this._intlService = _intlService;
    }
    MonthViewService.prototype.prev = function (current) {
        return kendo_date_math_1.addMonths(current, -1);
    };
    MonthViewService.prototype.next = function (current) {
        return kendo_date_math_1.addMonths(current, 1);
    };
    MonthViewService.prototype.dayValue = function (current) {
        return current ? current.getDate().toString() : "";
    };
    MonthViewService.prototype.title = function (current) {
        return this.abbrMonthNames()[current.getMonth()] + " " + current.getFullYear();
    };
    MonthViewService.prototype.viewData = function (options) {
        var _this = this;
        var cellUID = options.cellUID, focusedDate = options.focusedDate, max = options.max, min = options.min, selectedDate = options.selectedDate, viewDate = options.viewDate;
        if (!viewDate) {
            return EMPTY_DATA;
        }
        var firstMonthDate = kendo_date_math_1.firstDayOfMonth(viewDate);
        var lastMonthDate = kendo_date_math_1.lastDayOfMonth(viewDate);
        var backward = -1;
        var date = kendo_date_math_1.dayOfWeek(firstMonthDate, this._intlService.firstDay(), backward);
        var cells = util_1.range(0, CELLS_LENGTH);
        return util_1.range(0, ROWS_LENGTH).map(function (rowOffset) {
            var baseDate = kendo_date_math_1.addDays(date, rowOffset * 7);
            return cells.map(function (cellOffset) {
                var cellDate = kendo_date_math_1.addDays(baseDate, cellOffset);
                var otherMonth = cellDate < firstMonthDate || cellDate > lastMonthDate;
                var outOfRange = cellDate < min || cellDate > max;
                if (otherMonth || outOfRange) {
                    return null;
                }
                return {
                    id: "" + cellUID + cellDate.getTime(),
                    isFocused: _this.isEqual(cellDate, focusedDate),
                    isSelected: _this.isEqual(cellDate, selectedDate),
                    isWeekend: _this.isWeekend(cellDate),
                    value: cellDate
                };
            });
        });
    };
    MonthViewService.prototype.weekNumber = function (date) {
        return kendo_date_math_1.weekInYear(date, this._intlService.firstDay());
    };
    MonthViewService.prototype.isWeekend = function (date) {
        var day = date.getDay();
        return day === SATURDAY || day === SUNDAY;
    };
    MonthViewService.prototype.isEqual = function (candidate, expected) {
        if (!candidate || !expected) {
            return false;
        }
        return kendo_date_math_1.getDate(candidate).getTime() === kendo_date_math_1.getDate(expected).getTime();
    };
    MonthViewService.prototype.weekNames = function () {
        return util_1.shiftWeekNames(this._intlService.dateFormatNames({ nameType: 'short', type: 'days' }), this._intlService.firstDay());
    };
    //TODO: rename this method as it doesn't return abbr, but wide month names
    MonthViewService.prototype.abbrMonthNames = function () {
        return this._intlService.dateFormatNames({ nameType: 'wide', type: 'months' });
    };
    return MonthViewService;
}());
MonthViewService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
MonthViewService.ctorParameters = function () { return [
    { type: kendo_angular_intl_1.IntlService, },
]; };
exports.MonthViewService = MonthViewService;
