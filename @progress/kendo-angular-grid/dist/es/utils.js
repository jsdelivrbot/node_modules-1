import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
/**
 * @hidden
 */
export var isPresent = function (value) { return value !== null && value !== undefined; };
/**
 * @hidden
 */
export var isBlank = function (value) { return value === null || value === undefined; };
/**
 * @hidden
 */
export var isArray = function (value) { return Array.isArray(value); };
/**
 * @hidden
 */
export var isTruthy = function (value) { return !!value; };
/**
 * @hidden
 */
export var isNullOrEmptyString = function (value) { return isBlank(value) || value.trim().length === 0; };
/**
 * @hidden
 */
export var isChanged = function (propertyName, changes, skipFirstChange) {
    if (skipFirstChange === void 0) { skipFirstChange = true; }
    return (changes[propertyName] && (!changes[propertyName].isFirstChange() || !skipFirstChange) &&
        changes[propertyName].previousValue !== changes[propertyName].currentValue);
};
/**
 * @hidden
 */
export var anyChanged = function (propertyNames, changes, skipFirstChange) {
    if (skipFirstChange === void 0) { skipFirstChange = true; }
    return propertyNames.some(function (name) { return isChanged(name, changes, skipFirstChange); });
};
/**
 * @hidden
 */
export var observe = function (list) { return Observable.from([list]).merge(list.changes); };
/**
 * @hidden
 */
export var isUniversal = function () { return typeof document === 'undefined'; };
/**
 * @hidden
 */
export var extractFormat = function (format) {
    if (!isNullOrEmptyString(format) && format.startsWith('{0:')) {
        return format.slice(3, format.length - 1);
    }
    return format;
};
