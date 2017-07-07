import { Injectable } from '@angular/core';
import { Action } from '../models/navigation-action.enum';
import { addDays, addWeeks, addMonths, firstDayOfMonth, lastDayOfMonth } from '@progress/kendo-date-math';
var KEY_TO_ACTION = {
    '33': Action.PrevView,
    '34': Action.NextView,
    '35': Action.LastInView,
    '36': Action.FirstInView,
    '37': Action.Left,
    '38': Action.Up,
    '39': Action.Right,
    '40': Action.Down,
    'meta+38': Action.PrevView,
    'meta+40': Action.NextView
};
//Month specific modifiers
var ACTIONS = (_a = {},
    _a[Action.Left] = function (date) { return addDays(date, -1); },
    _a[Action.Up] = function (date) { return addWeeks(date, -1); },
    _a[Action.Right] = function (date) { return addDays(date, 1); },
    _a[Action.Down] = function (date) { return addWeeks(date, 1); },
    _a[Action.PrevView] = function (date) { return addMonths(date, -1); },
    _a[Action.NextView] = function (date) { return addMonths(date, 1); },
    _a[Action.FirstInView] = function (date) { return firstDayOfMonth(date); },
    _a[Action.LastInView] = function (date) { return lastDayOfMonth(date); },
    _a);
/**
 * @hidden
 */
var NavigationService = (function () {
    function NavigationService() {
    }
    NavigationService.prototype.action = function (event) {
        var action = "" + (event.ctrlKey || event.metaKey ? 'meta+' : '') + event.keyCode;
        return KEY_TO_ACTION[action];
    };
    NavigationService.prototype.move = function (candidate, action) {
        var modifier = ACTIONS[action];
        if (!modifier) {
            return candidate;
        }
        return modifier(candidate);
    };
    return NavigationService;
}());
export { NavigationService };
NavigationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NavigationService.ctorParameters = function () { return []; };
var _a;
