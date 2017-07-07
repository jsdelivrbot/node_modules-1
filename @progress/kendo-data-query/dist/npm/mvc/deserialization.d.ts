import { GroupResult } from '../grouping/group-descriptor.interface';
import { AggregateResult } from '../transducers';
/**
 * Represents grouped result returned by the UI for ASP.NET MVC ToDataSourceResult
 */
export declare type ServerGroupResult = {
    /**
     * Contains either the subgroups or the data items.
     */
    Items: Object[];
    /**
     * Aggregated values for the group. [`AggregateResult`]({% slug api_kendo-data-query_aggregateresult_kendouiforangular %}) instance.
     */
    Aggregates: any;
    /**
     * The field by which the data items are grouped.
     */
    Member: string;
    /**
     * The group key.
     */
    Key: any;
    /**
     * Determines if Items contains subgroups
     */
    HasSubgroups: boolean;
};
/**
 * Converts the grouped result returned into the `Data` field of UI for ASP.NET MVC ToDataSourceResult method to comparable format.
 * @param data Value of the Data field of the response.
 * @returns {GroupResult[]} The converted result.
 */
export declare const translateDataSourceResultGroups: (data: any[]) => GroupResult[];
/**
 * Converts the `AggregateResults` field content returned by the UI for ASP.NET MVC ToDataSourceResult method to comparable format.
 * @param data Value of the AggregateResults field of the response
 * @returns {AggregateResult} The converted result
 */
export declare const translateAggregateResults: (data: any[]) => AggregateResult;
