import { isSpanColumnComponent } from "./span-column.component";
/**
 * @hidden
 */
export var expandColumns = function (columns) { return (columns.reduce(function (acc, column) { return acc.concat(isSpanColumnComponent(column) ? column.childColumns.toArray() : [column]); }, []) // tslint:disable-line:align
); };
/**
 * @hidden
 */
export var columnsToRender = function (columns) { return (expandColumns(columns).filter(function (x) { return !x.hidden; })); };
/**
 * @hidden
 */
export var columnsSpan = function (columns) {
    return (columns || []).reduce(function (acc, col) { return acc + col.colspan; }, 0);
};
