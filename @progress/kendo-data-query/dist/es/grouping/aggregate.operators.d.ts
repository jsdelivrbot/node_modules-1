import { AggregateResult } from '../transducers';
/**
 * The aggregate operation.
 *
 * For more information, refer to the [`aggregateBy`]({% slug api_kendo-data-query_aggregateby_kendouiforangular %}) method.
 */
export interface AggregateDescriptor {
    /**
     * The name of the record field on which the function will be executed.
     */
    field: string;
    /**
     * The aggregate function to be calculated.
     */
    aggregate: 'count' | 'sum' | 'average' | 'min' | 'max';
}
/**
 * Applies the specified [`AggregateDescriptors`]({% slug api_kendo-data-query_aggregatedescriptor_kendouiforangular %}) to the data.
 *
 * Returns an [`AggregateResult`]({% slug api_kendo-data-query_aggregateresult_kendouiforangular %}) instance.
 *
 * @example
 * ```ts-no-run
 * const data = [
 *    { unitPrice: 23, unitsInStock: 21 },
 *    { unitPrice: 10, unitsInStock: 12 },
 *    { unitPrice: 20, unitsInStock: 33 }
 * ];
 *
 * const result = aggregateBy(data, [
 *   { aggregate: "sum", field: "unitPrice" },
 *   { aggregate: "sum", field: "unitsInStock" }
 * ]);
 *
 * //output:
 * // {
 * //     "unitPrice": { "sum": 53 },
 * //     "unitsInStock": { "sum": 66 }
 * // }
 * ```
 * @param {T[]} data - The data on which the calculation will be executed.
 * @param {AggregateDescriptor[]} descriptors - The aggregate operations to be executed.
 * @param {any} transformers - For internal use.
 * @returns {AggregateResult} - The aggregated result.
 * For more information, refer to the [`aggregateresult`]({% slug api_kendo-data-query_aggregateresult_kendouiforangular %}) configuration.
 */
export declare const aggregateBy: <T>(data: T[], descriptors?: AggregateDescriptor[], transformers?: (reduce: <T, U>(acc: U, curr: T) => T) => <T, U>(acc: U, curr: T, index: number) => U | {
    __value: U;
    reduced: boolean;
}) => AggregateResult;
