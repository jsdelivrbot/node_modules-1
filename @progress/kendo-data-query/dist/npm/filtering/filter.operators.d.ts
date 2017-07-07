import { CompositeFilterDescriptor, FilterDescriptor } from './filter-descriptor.interface';
/**
 * Converts a [`FilterDescriptor`]({% slug api_kendo-data-query_filterdescriptor_kendouiforangular %}) into a
 * [`CompositeFilterDescriptor`]({% slug api_kendo-data-query_compositefilterdescriptor_kendouiforangular %}).
 *
 * If a `CompositeFilterDescriptor` is passed, no modifications will be made.
 *
 * @param {CompositeFilterDescriptor | FilterDescriptor} descriptor - The descriptor to be normalized.
 * @returns {CompositeFilterDescriptor} - The normalized descriptor.
 */
export declare const normalizeFilters: (descriptor: FilterDescriptor | CompositeFilterDescriptor) => CompositeFilterDescriptor;
/**
 * @hidden
 */
export declare const operators: {
    contains: (a: string, b: string, ignore: boolean) => string;
    doesnotcontain: (a: string, b: string, ignore: boolean) => string;
    doesnotendwith: (a: string, b: string, ignore: boolean) => string;
    doesnotstartwith: (a: string, b: string, ignore: boolean) => string;
    endswith: (a: string, b: string, ignore: boolean) => string;
    eq: <T>(a: T, b: T, ignore: boolean) => string;
    gt: <T>(a: T, b: T, ignore: boolean) => string;
    gte: <T>(a: T, b: T, ignore: boolean) => string;
    isempty: (a: any) => string;
    isnotempty: (a: any) => string;
    isnotnull: (a: any) => string;
    isnull: (a: any) => string;
    lt: <T>(a: T, b: T, ignore: boolean) => string;
    lte: <T>(a: T, b: T, ignore: boolean) => string;
    neq: <T>(a: T, b: T, ignore: boolean) => string;
    quote: (value: any) => string;
    startswith: (a: string, b: string, ignore: boolean) => string;
};
