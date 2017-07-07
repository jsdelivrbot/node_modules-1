import { CompositeFilterDescriptor, FilterDescriptor } from './filter-descriptor.interface';
import { Predicate } from '../common.interfaces';
/**
 * Creates a function expression from the provided `CompositeFilterDescriptor`.
 * @hidden
 */
export declare const filterExpr: (descriptor: CompositeFilterDescriptor) => {
    expression: string;
    fields: any[];
    operators: any[];
};
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
export declare const compileFilter: (descriptor: CompositeFilterDescriptor) => Predicate;
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
export declare const filterBy: <T>(data: T[], descriptor: FilterDescriptor | CompositeFilterDescriptor) => T[];
