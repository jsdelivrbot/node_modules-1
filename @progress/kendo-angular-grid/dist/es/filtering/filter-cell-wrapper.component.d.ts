import { ColumnComponent } from '../column.component';
import { FilterService } from './filter.service';
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { BaseFilterCellComponent } from './base-filter-cell.component';
import { FilterInputDirective } from './filter-input.directive';
/**
 * @hidden
 */
export declare class FilterCellWrapperComponent extends BaseFilterCellComponent {
    readonly hostClasses: boolean;
    readonly overrideBaseClasses: boolean;
    showOperators: boolean;
    operators: Array<{
        text: string;
        value: string;
    }>;
    column: ColumnComponent;
    filter: CompositeFilterDescriptor;
    input: FilterInputDirective;
    readonly currentFilter: FilterDescriptor;
    readonly showButton: boolean;
    currentOperator: string;
    defaultOperator: string;
    private _defaultOperator;
    private _operator;
    private changeSubscription;
    constructor(filterService: FilterService);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    onChange(value: any): void;
    onClear(): void;
    protected applyNoValueFilter(operator: string): void;
}
