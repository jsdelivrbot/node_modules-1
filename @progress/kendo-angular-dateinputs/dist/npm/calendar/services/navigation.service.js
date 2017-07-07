"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var navigation_action_enum_1 = require("../models/navigation-action.enum");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var KEY_TO_ACTION = {
    '33': navigation_action_enum_1.Action.PrevView,
    '34': navigation_action_enum_1.Action.NextView,
    '35': navigation_action_enum_1.Action.LastInView,
    '36': navigation_action_enum_1.Action.FirstInView,
    '37': navigation_action_enum_1.Action.Left,
    '38': navigation_action_enum_1.Action.Up,
    '39': navigation_action_enum_1.Action.Right,
    '40': navigation_action_enum_1.Action.Down,
    'meta+38': navigation_action_enum_1.Action.PrevView,
    'meta+40': navigation_action_enum_1.Action.NextView
};
//Month specific modifiers
var ACTIONS = (_a = {},
    _a[navigation_action_enum_1.Action.Left] = function (date) { return kendo_date_math_1.addDays(date, -1); },
    _a[navigation_action_enum_1.Action.Up] = function (date) { return kendo_date_math_1.addWeeks(date, -1); },
    _a[navigation_action_enum_1.Action.Right] = function (date) { return kendo_date_math_1.addDays(date, 1); },
    _a[navigation_action_enum_1.Action.Down] = function (date) { return kendo_date_math_1.addWeeks(date, 1); },
    _a[navigation_action_enum_1.Action.PrevView] = function (date) { return kendo_date_math_1.addMonths(date, -1); },
    _a[navigation_action_enum_1.Action.NextView] = function (date) { return kendo_date_math_1.addMonths(date, 1); },
    _a[navigation_action_enum_1.Action.FirstInView] = function (date) { return kendo_date_math_1.firstDayOfMonth(date); },
    _a[navigation_action_enum_1.Action.LastInView] = function (date) { return kendo_date_math_1.lastDayOfMonth(date); },
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
NavigationService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
NavigationService.ctorParameters = function () { return []; };
exports.NavigationService = NavigationService;
var _a;
