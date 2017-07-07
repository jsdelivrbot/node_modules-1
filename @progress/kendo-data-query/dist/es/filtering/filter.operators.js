import { isPresent, isString, isArray } from '../utils';
import { isCompositeFilterDescriptor } from './filter-descriptor.interface';
var dateRegExp = /^\/Date\((.*?)\)\/$/;
var newLineRegExp = /(\r+|\n+)/g;
var quoteRegExp = /(?=['\\])/g;
var operatorMap = function (key) { return ({
    "!=": "neq",
    "<": "lt",
    "<=": "lte",
    "==": "eq",
    ">": "gt",
    ">=": "gte",
    equal: "eq",
    equals: "eq",
    equalto: "eq",
    ge: "gte",
    greater: "gt",
    greaterthan: "gt",
    greaterthanequal: "gte",
    isempty: "isempty",
    isequalto: "eq",
    isgreaterthan: "gt",
    isgreaterthanorequalto: "gte",
    islessthan: "lt",
    islessthanorequalto: "lte",
    isnotempty: "isnotempty",
    isnotequalto: "neq",
    isnull: "isnull",
    le: "lte",
    less: "lt",
    lessthan: "lt",
    lessthanequal: "lte",
    ne: "neq",
    notequal: "neq",
    notequals: "neq",
    notequalto: "neq",
    notsubstringof: "doesnotcontain"
}[key.toLowerCase()] || key); };
var normalizeOperator = function (descriptor) {
    var filters = descriptor.filters || [];
    filters.forEach(function (filter) {
        if (!isCompositeFilterDescriptor(filter) && isString(filter.operator)) {
            filter.operator = operatorMap(filter.operator);
        }
        if (isCompositeFilterDescriptor(filter)) {
            normalizeOperator(filter);
        }
    });
};
var normalizeDescriptor = function (descriptor) {
    if (!isCompositeFilterDescriptor(descriptor)) {
        return {
            filters: isArray(descriptor) ? descriptor : [descriptor],
            logic: "and"
        };
    }
    return descriptor;
};
/**
 * Converts a [`FilterDescriptor`]({% slug api_kendo-data-query_filterdescriptor_kendouiforangular %}) into a
 * [`CompositeFilterDescriptor`]({% slug api_kendo-data-query_compositefilterdescriptor_kendouiforangular %}).
 *
 * If a `CompositeFilterDescriptor` is passed, no modifications will be made.
 *
 * @param {CompositeFilterDescriptor | FilterDescriptor} descriptor - The descriptor to be normalized.
 * @returns {CompositeFilterDescriptor} - The normalized descriptor.
 */
export var normalizeFilters = function (descriptor) {
    if (isPresent(descriptor)) {
        descriptor = normalizeDescriptor(descriptor);
        normalizeOperator(descriptor);
    }
    return descriptor;
};
/**
 * @hidden
 */
export var operators = (function () {
    var quote = function (value) { return (value.replace(quoteRegExp, "\\").replace(newLineRegExp, "")); };
    var operator = function (op, a, b, ignore) {
        if (b != null) {
            if (isString(b)) {
                b = quote(b);
                var date = dateRegExp.exec(b);
                if (date) {
                    b = new Date(+date[1]);
                }
                else if (ignore) {
                    b = "'" + b.toLowerCase() + "'";
                    a = "((" + a + " || '')+'').toLowerCase()";
                }
                else {
                    b = "'" + b + "'";
                }
            }
            if (b.getTime) {
                //b looks like a Date
                a = "(" + a + " && " + a + ".getTime?" + a + ".getTime():" + a + ")";
                b = b.getTime();
            }
        }
        return a + " " + op + " " + b;
    };
    var apply = function (template, a, b, ignore) {
        if (ignore) {
            a = "(" + a + " || '').toLowerCase()";
            if (b) {
                b = b.toLowerCase();
            }
        }
        if (b) {
            b = quote(b);
        }
        return template(a, b);
    };
    return {
        contains: function (a, b, ignore) {
            return apply(function (s1, s2) { return (s1 + ".indexOf('" + s2 + "') >= 0"); }, a, b, ignore);
        },
        doesnotcontain: function (a, b, ignore) {
            return apply(function (s1, s2) { return (s1 + ".indexOf('" + s2 + "') == -1"); }, a, b, ignore);
        },
        doesnotendwith: function (a, b, ignore) {
            return apply(function (s1, s2) { return (s1 + ".indexOf('" + s2 + "', " + s1 + ".length - " + (s2 || "").length + ") < 0"); }, a, b, ignore);
        },
        doesnotstartwith: function (a, b, ignore) {
            return apply(function (s1, s2) { return (s1 + ".lastIndexOf('" + s2 + "', 0) == -1"); }, a, b, ignore);
        },
        endswith: function (a, b, ignore) {
            return apply(function (s1, s2) { return (s1 + ".indexOf('" + s2 + "', " + s1 + ".length - " + (s2 || "").length + ") >= 0"); }, a, b, ignore);
        },
        eq: function (a, b, ignore) {
            return operator("==", a, b, ignore);
        },
        gt: function (a, b, ignore) {
            return operator(">", a, b, ignore);
        },
        gte: function (a, b, ignore) {
            return operator(">=", a, b, ignore);
        },
        isempty: function (a) {
            return a + " === ''";
        },
        isnotempty: function (a) {
            return a + " !== ''";
        },
        isnotnull: function (a) {
            return "(" + a + " !== null && " + a + " !== undefined)";
        },
        isnull: function (a) {
            return "(" + a + " === null || " + a + " === undefined)";
        },
        lt: function (a, b, ignore) {
            return operator("<", a, b, ignore);
        },
        lte: function (a, b, ignore) {
            return operator("<=", a, b, ignore);
        },
        neq: function (a, b, ignore) {
            return operator("!=", a, b, ignore);
        },
        quote: function (value) {
            if (value && value.getTime) {
                return "new Date(" + value.getTime() + ")";
            }
            if (isString(value)) {
                return "'" + quote(value) + "'";
            }
            return "" + value;
        },
        startswith: function (a, b, ignore) {
            return apply(function (s1, s2) { return (s1 + ".lastIndexOf('" + s2 + "', 0) == 0"); }, a, b, ignore);
        }
    };
})();
