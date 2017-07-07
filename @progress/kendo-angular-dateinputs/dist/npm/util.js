"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-bitwise */
var kendo_date_math_1 = require("@progress/kendo-date-math");
var isSet = function (value) { return value !== null && value !== undefined; };
/**
 * @hidden
 */
exports.range = function (start, end) {
    var result = [];
    for (var i = start; i < end; i++) {
        result.push(i);
    }
    return result;
};
/**
 * @hidden
 */
exports.isInDatesArray = function (date, dates) {
    if (dates === void 0) { dates = []; }
    return (!!dates.length && kendo_date_math_1.firstDayOfMonth(dates[0]) <= date && date <= kendo_date_math_1.lastDayOfMonth(dates[dates.length - 1]));
};
/**
 * @hidden
 */
exports.isInRange = function (candidate, min, max) { return (!candidate || !((min && min > candidate) || (max && max < candidate))); };
/**
 * @hidden
 */
exports.isValidRange = function (min, max) { return (!isSet(min) || !isSet(max) || min <= max); };
/**
 * @hidden
 */
exports.dateInRange = function (candidate, min, max) {
    if (!candidate) {
        return candidate;
    }
    if (min && candidate < min) {
        return kendo_date_math_1.cloneDate(min);
    }
    if (max && candidate > max) {
        return kendo_date_math_1.cloneDate(max);
    }
    return candidate;
};
/**
 * @hidden
 */
exports.guid = function () {
    var id = "", random;
    for (var i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            id += "-";
        }
        id += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return id;
};
/**
 * @hidden
 */
exports.noop = function (_) { }; // tslint:disable-line:no-empty
/**
 * @hidden
 */
exports.isDocumentAvailable = function () {
    return typeof document !== 'undefined';
};
/**
 * @hidden
 */
exports.cellContextToString = function (ctx) { return (ctx ? "" + ctx.isFocused + ctx.isSelected + ctx.isWeekend + ctx.id : 'null'); };
/**
 * @hidden
 */
exports.stringifyClassObject = function (classes) {
    var pushToAcc = function (acc, cls) { return classes[cls] ? acc.concat(cls) : acc; };
    return Object.keys(classes).reduce(pushToAcc, []).join(' ');
};
/**
 * @hidden
 */
exports.generateDates = function (start, count) { return (exports.range(0, count).map(function (i) { return kendo_date_math_1.addMonths(start, i); })); };
/**
 * @hidden
 */
exports.monthsDistance = function (d1, d2) { return (((d1.getFullYear() - d2.getFullYear())) * 12 + (d1.getMonth() - d2.getMonth())); };
/**
 * @hidden
 */
exports.shiftWeekNames = function (names, offset) { return (names.slice(offset).concat(names.slice(0, offset))); };
/**
 * @hidden
 */
exports.approximateStringMatching = function (oldTextOrigin, oldFormat, newTextOrigin, caret) {
    // Remove the right part of the cursor.
    //oldFormat = oldFormat.substring(0, caret + oldText.length - newText.length);
    var oldTextSeparator = oldTextOrigin[caret + oldTextOrigin.length - newTextOrigin.length];
    var oldText = oldTextOrigin.substring(0, caret + oldTextOrigin.length - newTextOrigin.length);
    var newText = newTextOrigin.substring(0, caret);
    var diff = [];
    // Handle typing a single character over the same selection.
    if (oldText === newText && caret > 0) {
        diff.push([oldFormat[caret - 1], newText[caret - 1]]);
        return diff;
    }
    if (oldText.indexOf(newText) === 0 && (newText.length === 0 || oldFormat[newText.length - 1] !== oldFormat[newText.length])) {
        // Handle Delete/Backspace.
        var deletedSymbol = "";
        //XXX:
        // Whole text is replaced with a same char
        // Nasty patch required to keep the selection in the first segment
        if (newText.length === 1) {
            diff.push([oldFormat[0], newText[0]]);
        }
        for (var i = newText.length; i < oldText.length; i++) {
            if (oldFormat[i] !== deletedSymbol && oldFormat[i] !== "_") {
                deletedSymbol = oldFormat[i];
                diff.push([deletedSymbol, ""]);
            }
        }
        return diff;
    }
    // Handle inserting text (the new text is longer than the previous one).
    // Handle typing over a literal as well.
    if (newText.indexOf(oldText) === 0 || oldFormat[caret - 1] === "_") {
        var symbol = oldFormat[0];
        for (var i = Math.max(0, oldText.length - 1); i < oldFormat.length; i++) {
            if (oldFormat[i] !== "_") {
                symbol = oldFormat[i];
                break;
            }
        }
        return [[symbol, newText[caret - 1]]];
    }
    // Handle entering a space or a separator, for navigation to the next item.
    if (newText[newText.length - 1] === " " || newText[newText.length - 1] === oldTextSeparator) {
        return [[oldFormat[caret - 1], "_"]];
    }
    // Handle typing over a correctly selected part.
    return [[oldFormat[caret - 1], newText[caret - 1]]];
};
