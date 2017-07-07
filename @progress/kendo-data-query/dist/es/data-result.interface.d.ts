/**
 * The result of the [`process`]({% slug api_kendo-data-query_process_kendouiforangular%}) method applied to a data structure.
 */
export interface DataResult {
    /**
     * The data to be rendered by the Grid as an array.
     */
    data: any[];
    /**
     * The total number of records that is available.
     */
    total: number;
}
