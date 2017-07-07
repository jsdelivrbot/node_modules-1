import { expr } from '../accessor';
import { isPresent, isFunction } from '../utils';
import { isCompositeFilterDescriptor } from './filter-descriptor.interface';
import { operators, normalizeFilters } from './filter.operators';
var logic = { and: " && ", or: " || " };
var fieldProp = function (field, fieldFunctions) {
    if (isFunction(field)) {
        var prop = "__f[" + fieldFunctions.length + "](d)";
        return [prop, fieldFunctions.concat([field])];
    }
    return [expr(field), fieldFunctions];
};
var operatorExpression = function (filter, operatorFunctions, prop) {
    if (isFunction(filter.operator)) {
        var expression = "__o[" + operatorFunctions.length + "](" + prop + ", " + operators.quote(filter.value) + ")";
        return [expression, operatorFunctions.concat([filter.operator])];
    }
    var ignoreCase = isPresent(filter.ignoreCase) ? filter.ignoreCase : true;
    return [
        operators[filter.operator || 'eq'](prop, filter.value, ignoreCase),
        operatorFunctions
    ];
};
var fieldExpression = function (filter, expressions, operatorFunctions, fieldFunctions) {
    var _a = fieldProp(filter.field, fieldFunctions), prop = _a[0], fields = _a[1];
    var _b = operatorExpression(filter, operatorFunctions, prop), expression = _b[0], funcs = _b[1];
    return {
        expression: expressions.concat([expression]),
        fields: fields,
        operators: funcs
    };
};
var factory = (function () { return ({
    compositeFilterExpression: function (filter, expressions, operatorFunctions, fieldFunctions) {
        var inner = factory.filterExpr(filter);
        //Nested function fields or operators - update their index e.g. __o[0] -> __o[1]
        var expression = inner.expression
            .replace(/__o\[(\d+)\]/g, function (_, index) { return ("__o[" + (operatorFunctions.length + (+index)) + "]"); })
            .replace(/__f\[(\d+)\]/g, function (_, index) { return ("__f[" + (fieldFunctions.length + (+index)) + "]"); });
        return {
            expression: expressions.concat([expression]),
            fields: fieldFunctions.concat(inner.fields),
            operators: operatorFunctions.concat(inner.operators)
        };
    },
    createExpression: function (acc, filter) {
        if (isCompositeFilterDescriptor(filter)) {
            return factory.compositeFilterExpression(filter, acc.expression, acc.operators, acc.fields);
        }
        return fieldExpression(filter, acc.expression, acc.operators, acc.fields);
    },
    filterExpr: function (descriptor) {
        var filters = descriptor.filters;
        var result = { expression: [], fields: [], operators: [] };
        for (var idx = 0, length_1 = filters.length; idx < length_1; idx++) {
            result = factory.createExpression(result, filters[idx]);
        }
        return {
            expression: "(" + result.expression.join(logic[descriptor.logic]) + ")",
            fields: result.fields,
            operators: result.operators
        };
    }
}); })();
/**
 * Creates a function expression from the provided `CompositeFilterDescriptor`.
 * @hidden
 */
export var filterExpr = factory.filterExpr;
/**
 * Creates a [`Predicate`]({% slug api_kendo-data-query_predicate_kendouiforangular %}) function
 * for the specified [`CompositeFilterDescriptor`]({% slug api_kendo-data-query_compositefilterdescriptor_kendouiforangular %}).
 *
 * @param {CompositeFilterDescriptor} descriptor - The descriptor for which the predicate is created.
 * @returns {Predicate} - The created function instance.
 *
 * @example
 * ```ts-no-run
 * import { compileFilter } from '@progress/kendo-data-query';
 *
 * const data = [{ name: "Pork" }, { name: "Pepper" }, { name: "Beef" } ];
 * const predicate = compileFilter({ logic: "and", filters: [{ field: "name", operator: "startswith", value: "P" }] });
 * const result = data.filter(predicate);
 *
 * ```
 */
export var compileFilter = function (descriptor) {
    if (!descriptor || descriptor.filters.length === 0) {
        return function () { return true; };
    }
    var expr = filterExpr(descriptor);
    var predicate = new Function("d, __f, __o", "return " + expr.expression);
    var shouldWrap = expr.fields.length || expr.operators.length;
    return (!shouldWrap ? predicate : function (d) { return predicate(d, expr.fields, expr.operators); });
};
/**
 * Filters the provided array according to the specified
 * [`CompositeFilterDescriptor`]({% slug api_kendo-data-query_compositefilterdescriptor_kendouiforangular %}).
 *
 * @param {T[]} data - The data to be filtered.
 * @param {(CompositeFilterDescriptor | FilterDescriptor)} descriptor - The filter criteria to be applied.
 * @returns {T[]} - The filtered data.
 *
 * @example
 * ```ts-no-run
 * import { filterBy } from '@progress/kendo-data-query';
 *
 * const data = [
 *  { name: "Pork", category: "Food", subcategory: "Meat" },
 *  { name: "Pepper", category: "Food", subcategory: "Vegetables" },
 *  { name: "Beef", category: "Food", subcategory: "Meat" }
 * ];
 *
 * const result = filterBy(data, {
 *     logic: 'and',
 *     filters: [
 *           { field: "name", operator: "startswith", value: "p", ignoreCase: true },
 *           { field: "subcategory", operator: "eq", value: "Meat" },
 *     ]
 * });
 *
 * // output:
 * //[{ "name": "Pork", "category": "Food", "subcategory": "Meat" }]
 * ```
 */
export var filterBy = function (data, descriptor) {
    if (!isPresent(descriptor) || (isCompositeFilterDescriptor(descriptor) && descriptor.filters.length === 0)) {
        return data;
    }
    return data.filter(compileFilter(normalizeFilters(descriptor)));
};
