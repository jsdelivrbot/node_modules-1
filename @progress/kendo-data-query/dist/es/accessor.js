import { isNullOrEmptyString } from './utils';
var empty = ["", ""];
var concat = function (left, right) { return [left[0] + right[0], left[1] + right[1]]; };
var notEmpty = function (member) { return !isNullOrEmptyString(member); };
var parseMember = function (member, idx, length) {
    var first = "(";
    var index = member.indexOf('[');
    if (index === -1) {
        member = "." + member;
    }
    else if (index > 0) {
        first += "(";
        member = "." + member.substring(0, index) + " || {})" + member.substring(index);
    }
    member += (idx < length - 1) ? " || {})" : ")";
    return [first, member];
};
var wrapExpression = function (members, paramName) { return (members
    .filter(notEmpty)
    .reduce(function (pair, member, idx, arr) { return concat(pair, parseMember(member, idx, arr.length)); }, empty)
    .join(paramName)); };
var getterCache = {};
/**
 * @hidden
 */
export var expr = function (expression, safe, paramName) {
    if (expression === void 0) { expression = ""; }
    if (safe === void 0) { safe = false; }
    if (paramName === void 0) { paramName = "d"; }
    if (expression && expression.charAt(0) !== "[") {
        expression = "." + expression;
    }
    if (safe) {
        expression = expression.replace(/"([^.]*)\.([^"]*)"/g, '"$1_$DOT$_$2"');
        expression = expression.replace(/'([^.]*)\.([^']*)'/g, "'$1_$DOT$_$2'");
        expression = wrapExpression(expression.split("."), paramName);
        expression = expression.replace(/_\$DOT\$_/g, ".");
    }
    else {
        expression = paramName + expression;
    }
    return expression;
};
/**
 * @hidden
 */
export var getter = function (expression, safe) {
    var key = expression + safe;
    return getterCache[key] = getterCache[key] || new Function("d", "return " + expr(expression, safe));
};
