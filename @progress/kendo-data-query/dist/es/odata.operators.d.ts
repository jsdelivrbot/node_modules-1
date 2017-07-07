import { State } from './state';
/**
 * Converts a [`State`]({% slug api_kendo-data-query_state_kendouiforangular %}) into an OData v4 compatible string.
 *
 * @param {State} state - The state to be serialized.
 * @returns {string} - The serialized state.
 */
export declare const toODataString: (state: State) => string;
