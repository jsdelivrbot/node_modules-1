import { ColumnComponent } from '../column.component';
import { FilterService } from './filter.service';
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { BaseFilterCellComponent } from './base-filter-cell.component';
import { FilterComponent } from './filter-component.interface';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * Represents a date filter-cell component.
 *
 * @example
 *
 *  ```ts-no-run
 *      <kendo-grid-column field="OrderDate" title="Order Date">
 *          <ng-template kendoGridFilterCellTemplate let-filter let-column="column">
 *          <kendo-grid-date-filter-cell
 *              [showOperators]="false"
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-grid-date-filter-cell>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
export declare class DateFilterCellComponent extends BaseFilterCellComponent implements FilterComponent {
    protected localization: LocalizationService;
    /**
     * Determines if the drop-down filter operators should be shown. The default value is `true`.
     * @type {boolean}
     */
    showOperators: boolean;
    /**
     * The column with which the filter is associated.
     * @type {ColumnComponent}
     */
    column: ColumnComponent;
    /**
     * The current root filter.
     * @type {CompositeFilterDescriptor}
     */
    filter: CompositeFilterDescriptor;
    /**
     * The default filter operator. Defaults to `contains`.
     * @type {string}
     */
    operator: string;
    /**
     * The current filter for the associated column field.
     * @readonly
     * @type {FilterDescriptor}
     */
    readonly currentFilter: FilterDescriptor;
    /**
     * Specifies the date format used when the component is not focused.
     * By default, the `column.format` value is used, if set.
     *
     * @readonly
     * @type {string}
     */
    /**
     * Specifies the date format used when the component is not focused.
     * By default, the `column.format` value is used, if set.
     */
    format: string;
    /**
     * Specifies the smallest value that is valid.
     * @type {Date}
     */
    min: Date;
    /**
     * Specifies the greatest value that is valid.
     * @type {Date}
     */
    max: Date;
    private readonly columnFormat;
    /**
     * The current filter operator for the associated column field.
     * @readonly
     * @type {string}
     */
    readonly currentOperator: string;
    protected defaultOperators: Array<{
        text: string;
        value: string;
    }>;
    private _format;
    constructor(filterService: FilterService, localization: LocalizationService);
}
