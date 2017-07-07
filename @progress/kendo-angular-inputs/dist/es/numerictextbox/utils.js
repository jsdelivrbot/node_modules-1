import { POINT, MAX_PRECISION } from './constants';
/**
 * @hidden
 */
export var numericRegex = function (options) {
    var autoCorrect = options.autoCorrect, decimals = options.decimals, min = options.min;
    var separator = options.separator;
    if (separator === POINT) {
        separator = '\\' + separator;
    }
    var signPattern = autoCorrect && min !== null && min >= 0 ? '' : '-?';
    var numberPattern;
    if (decimals === 0) {
        numberPattern = '\\d*';
    }
    else {
        numberPattern = "(?:(?:\\d+(" + separator + "\\d*)?)|(?:" + separator + "\\d*))?";
    }
    return new RegExp("^" + signPattern + numberPattern + "$");
};
/**
 * @hidden
 */
export var noop = function (_) { }; // tslint:disable-line:no-empty
var isChanged = function (propertyName, changes) { return (changes[propertyName] && changes[propertyName].previousValue !== changes[propertyName].currentValue); };
/**
 * @hidden
 */
export var anyChanged = function (propertyNames, changes) {
    return propertyNames.some(function (name) { return isChanged(name, changes); });
};
/**
 * @hidden
 */
export var defined = function (value) {
    return typeof value !== 'undefined';
};
var fractionLength = function (value) {
    return (value.split(POINT)[1] || "").length;
};
/**
 * @hidden
 */
export var addValues = function (value1, value2) {
    var value1String = String(value1);
    var value2String = String(value2);
    var maxPrecision = Math.min(Math.max(fractionLength(value1String), fractionLength(value2String)), MAX_PRECISION);
    return parseFloat((value1 + value2).toFixed(maxPrecision));
};
