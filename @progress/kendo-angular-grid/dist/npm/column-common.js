"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var span_column_component_1 = require("./span-column.component");
/**
 * @hidden
 */
exports.expandColumns = function (columns) { return (columns.reduce(function (acc, column) { return acc.concat(span_column_component_1.isSpanColumnComponent(column) ? column.childColumns.toArray() : [column]); }, []) // tslint:disable-line:align
); };
/**
 * @hidden
 */
exports.columnsToRender = function (columns) { return (exports.expandColumns(columns).filter(function (x) { return !x.hidden; })); };
/**
 * @hidden
 */
exports.columnsSpan = function (columns) {
    return (columns || []).reduce(function (acc, col) { return acc + col.colspan; }, 0);
};
