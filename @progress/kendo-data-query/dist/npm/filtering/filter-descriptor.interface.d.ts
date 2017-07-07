/**
 * A basic filter expression. Usually part of
 * [`CompositeFilterDescriptor`]({% slug api_kendo-data-query_compositefilterdescriptor_kendouiforangular %}).
 *
 * For more information, refer to the [`filterBy`]({% slug api_kendo-data-query_filterby_kendouiforangular %}) method.
 */
export interface FilterDescriptor {
    /**
     * The data item field to which the filter operator is applied.
     */
    field?: string | Function;
    /**
     * The filter operator (comparison).
     *
     * The supported operators are:
     *
     * * `"eq"` (equal to)
     * * `"neq"` (not equal to)
     * * `"isnull"` (is equal to null)
     * * `"isnotnull"` (is not equal to null)
     * * `"lt"` (less than)
     * * `"lte"` (less than or equal to)
     * * `"gt"` (greater than)
     * * `"gte"` (greater than or equal to)
     *
     * The following operators are supported for string fields only:
     *
     * * `"startswith"`
     * * `"endswith"`
     * * `"contains"`
     * * `"doesnotcontain"`
     * * `"isempty"`
     * * `"isnotempty"`
     */
    operator: string | Function;
    /**
     * The value to which the field is compared. Has to be of the same type as the field.
     */
    value?: any;
    /**
     * Determines if the string comparison is case-insensitive.
     */
    ignoreCase?: boolean;
}
/**
 * A complex filter expression.
 *
 * For more information, refer to the [`filterBy`]({% slug api_kendo-data-query_filterby_kendouiforangular %}) method.
 */
export interface CompositeFilterDescriptor {
    /**
     * The logical operation to use when the `filter.filters` option is set.
     *
     * The supported values are:
     * * `"and"`
     * * `"or"`
     */
    logic: 'or' | 'and';
    /**
     * The nested filter expressions&mdash;either
     * [`FilterDescriptor`]({% slug api_kendo-data-query_filterdescriptor_kendouiforangular %}), or
     * [`CompositeFilterDescriptor`]({% slug api_kendo-data-query_compositefilterdescriptor_kendouiforangular %}).
     * Supports the same options as `filter`. Filters can be nested indefinitely.
     */
    filters: Array<FilterDescriptor | CompositeFilterDescriptor>;
}
/**
 * @hidden
 * Type guard for `CompositeFilterDescriptor`.
 */
export declare const isCompositeFilterDescriptor: (source: FilterDescriptor | CompositeFilterDescriptor) => source is CompositeFilterDescriptor;
