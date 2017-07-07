"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/from");
/**
 * @hidden
 */
exports.isPresent = function (value) { return value !== null && value !== undefined; };
/**
 * @hidden
 */
exports.isBlank = function (value) { return value === null || value === undefined; };
/**
 * @hidden
 */
exports.isArray = function (value) { return Array.isArray(value); };
/**
 * @hidden
 */
exports.isTruthy = function (value) { return !!value; };
/**
 * @hidden
 */
exports.isNullOrEmptyString = function (value) { return exports.isBlank(value) || value.trim().length === 0; };
/**
 * @hidden
 */
exports.isChanged = function (propertyName, changes, skipFirstChange) {
    if (skipFirstChange === void 0) { skipFirstChange = true; }
    return (changes[propertyName] && (!changes[propertyName].isFirstChange() || !skipFirstChange) &&
        changes[propertyName].previousValue !== changes[propertyName].currentValue);
};
/**
 * @hidden
 */
exports.anyChanged = function (propertyNames, changes, skipFirstChange) {
    if (skipFirstChange === void 0) { skipFirstChange = true; }
    return propertyNames.some(function (name) { return exports.isChanged(name, changes, skipFirstChange); });
};
/**
 * @hidden
 */
exports.observe = function (list) { return Observable_1.Observable.from([list]).merge(list.changes); };
/**
 * @hidden
 */
exports.isUniversal = function () { return typeof document === 'undefined'; };
/**
 * @hidden
 */
exports.extractFormat = function (format) {
    if (!exports.isNullOrEmptyString(format) && format.startsWith('{0:')) {
        return format.slice(3, format.length - 1);
    }
    return format;
};
