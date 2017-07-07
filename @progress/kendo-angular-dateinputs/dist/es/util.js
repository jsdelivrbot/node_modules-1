/* tslint:disable:no-bitwise */
import { addMonths, cloneDate, firstDayOfMonth, lastDayOfMonth } from '@progress/kendo-date-math';
var isSet = function (value) { return value !== null && value !== undefined; };
/**
 * @hidden
 */
export var range = function (start, end) {
    var result = [];
    for (var i = start; i < end; i++) {
        result.push(i);
    }
    return result;
};
/**
 * @hidden
 */
export var isInDatesArray = function (date, dates) {
    if (dates === void 0) { dates = []; }
    return (!!dates.length && firstDayOfMonth(dates[0]) <= date && date <= lastDayOfMonth(dates[dates.length - 1]));
};
/**
 * @hidden
 */
export var isInRange = function (candidate, min, max) { return (!candidate || !((min && min > candidate) || (max && max < candidate))); };
/**
 * @hidden
 */
export var isValidRange = function (min, max) { return (!isSet(min) || !isSet(max) || min <= max); };
/**
 * @hidden
 */
export var dateInRange = function (candidate, min, max) {
    if (!candidate) {
        return candidate;
    }
    if (min && candidate < min) {
        return cloneDate(min);
    }
    if (max && candidate > max) {
        return cloneDate(max);
    }
    return candidate;
};
/**
 * @hidden
 */
export var guid = function () {
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
export var noop = function (_) { }; // tslint:disable-line:no-empty
/**
 * @hidden
 */
// tslint:disable-line:no-empty
export var isDocumentAvailable = function () {
    return typeof document !== 'undefined';
};
/**
 * @hidden
 */
export var cellContextToString = function (ctx) { return (ctx ? "" + ctx.isFocused + ctx.isSelected + ctx.isWeekend + ctx.id : 'null'); };
/**
 * @hidden
 */
export var stringifyClassObject = function (classes) {
    var pushToAcc = function (acc, cls) { return classes[cls] ? acc.concat(cls) : acc; };
    return Object.keys(classes).reduce(pushToAcc, []).join(' ');
};
/**
 * @hidden
 */
export var generateDates = function (start, count) { return (range(0, count).map(function (i) { return addMonths(start, i); })); };
/**
 * @hidden
 */
export var monthsDistance = function (d1, d2) { return (((d1.getFullYear() - d2.getFullYear())) * 12 + (d1.getMonth() - d2.getMonth())); };
/**
 * @hidden
 */
export var shiftWeekNames = function (names, offset) { return (names.slice(offset).concat(names.slice(0, offset))); };
/**
 * @hidden
 */
export var approximateStringMatching = function (oldTextOrigin, oldFormat, newTextOrigin, caret) {
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
