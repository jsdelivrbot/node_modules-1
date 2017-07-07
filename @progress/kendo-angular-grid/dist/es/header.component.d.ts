import { EventEmitter, QueryList, OnDestroy } from '@angular/core';
import { ColumnComponent } from './column.component';
import { ColumnBase } from './column-base';
import { DetailTemplateDirective } from './detail-template.directive';
import { SortDescriptor } from '@progress/kendo-data-query';
import { SortSettings } from './sort-settings';
import { GroupDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { DraggableDirective } from './draggable.directive';
import { GroupDragService } from './grouping/group-connection.service';
/**
 * @hidden
 */
export declare class HeaderComponent implements OnDestroy {
    private groupDragService;
    /**
     * @hidden
     */
    totalColumnLevels: number;
    columns: Array<ColumnBase>;
    groups: Array<GroupDescriptor>;
    detailTemplate: DetailTemplateDirective;
    scrollable: boolean;
    filterable: boolean;
    sort: Array<SortDescriptor>;
    filter: CompositeFilterDescriptor;
    sortable: SortSettings;
    groupable: boolean;
    lockedColumnsCount: number;
    sortChange: EventEmitter<Array<SortDescriptor>>;
    readonly headerClass: boolean;
    draggables: QueryList<DraggableDirective>;
    private draggablesSubscription;
    constructor(groupDragService: GroupDragService);
    sortColumn(column: ColumnComponent, event: any, link: any, icon: any): boolean;
    sortIcon(field: string): any;
    toggleSort(column: ColumnComponent): Array<SortDescriptor>;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    isFirstOnRow(column: ColumnComponent, index: number): boolean;
    protected isSortable(column: ColumnComponent): boolean;
    protected toggleDirection(field: string, allowUnsort: boolean): SortDescriptor;
    protected columnsForLevel(level: number): Array<ColumnBase>;
    protected isColumnGroupComponent(column: ColumnBase): boolean;
    private sortDescriptor(field);
    private readonly columnLevels;
    readonly leafColumns: ColumnBase[];
}
