import { Injectable } from '@angular/core';
import { addDays, addMonths, dayOfWeek, getDate, firstDayOfMonth, lastDayOfMonth, weekInYear } from '@progress/kendo-date-math';
import { IntlService } from '@progress/kendo-angular-intl';
import { range, shiftWeekNames } from '../../util';
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
        return addMonths(current, -1);
    };
    MonthViewService.prototype.next = function (current) {
        return addMonths(current, 1);
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
        var firstMonthDate = firstDayOfMonth(viewDate);
        var lastMonthDate = lastDayOfMonth(viewDate);
        var backward = -1;
        var date = dayOfWeek(firstMonthDate, this._intlService.firstDay(), backward);
        var cells = range(0, CELLS_LENGTH);
        return range(0, ROWS_LENGTH).map(function (rowOffset) {
            var baseDate = addDays(date, rowOffset * 7);
            return cells.map(function (cellOffset) {
                var cellDate = addDays(baseDate, cellOffset);
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
        return weekInYear(date, this._intlService.firstDay());
    };
    MonthViewService.prototype.isWeekend = function (date) {
        var day = date.getDay();
        return day === SATURDAY || day === SUNDAY;
    };
    MonthViewService.prototype.isEqual = function (candidate, expected) {
        if (!candidate || !expected) {
            return false;
        }
        return getDate(candidate).getTime() === getDate(expected).getTime();
    };
    MonthViewService.prototype.weekNames = function () {
        return shiftWeekNames(this._intlService.dateFormatNames({ nameType: 'short', type: 'days' }), this._intlService.firstDay());
    };
    //TODO: rename this method as it doesn't return abbr, but wide month names
    MonthViewService.prototype.abbrMonthNames = function () {
        return this._intlService.dateFormatNames({ nameType: 'wide', type: 'months' });
    };
    return MonthViewService;
}());
export { MonthViewService };
MonthViewService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
MonthViewService.ctorParameters = function () { return [
    { type: IntlService, },
]; };
