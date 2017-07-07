import { SimpleChange } from '@angular/core';
import { GroupDescriptor } from '@progress/kendo-data-query';
import { ColumnBase } from './column-base';
import { DetailTemplateDirective } from './detail-template.directive';
import { DetailsService } from './details.service';
import { GroupsService } from './grouping/groups.service';
import { GroupItem, Item, GroupFooterItem } from './data.iterators';
import { ChangeNotificationService } from './change-notification.service';
import { NoRecordsTemplateDirective } from './no-records-template.directive';
import { EditService } from './edit.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { RowClassFn } from './row-class';
/**
 * @hidden
 */
export declare class TableBodyComponent {
    detailsService: DetailsService;
    groupsService: GroupsService;
    private changeNotification;
    editService: EditService;
    private localization;
    columns: Array<ColumnBase>;
    groups: Array<GroupDescriptor>;
    detailTemplate: DetailTemplateDirective;
    noRecordsTemplate: NoRecordsTemplateDirective;
    data: Array<GroupItem | Item | GroupFooterItem>;
    skip: number;
    selectable: boolean;
    noRecordsText: string;
    skipGroupDecoration: boolean;
    showGroupFooters: boolean;
    lockedColumnsCount: number;
    rowClass: RowClassFn;
    constructor(detailsService: DetailsService, groupsService: GroupsService, changeNotification: ChangeNotificationService, editService: EditService, localization: LocalizationService);
    readonly newDataItem: any;
    toggleRow(index: number, dataItem: any): boolean;
    trackByFn(_: number, item: GroupItem | Item): any;
    isExpanded(index: number): boolean;
    detailButtonStyles(index: number): any;
    isGroup(item: Item | GroupItem): boolean;
    isDataItem(item: Item | GroupItem): boolean;
    isFooter(item: Item | GroupItem | GroupFooterItem): boolean;
    isInExpandedGroup(item: Item): boolean;
    isParentGroupExpanded(item: any): boolean;
    isOdd(item: any): boolean;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    readonly columnsSpan: number;
    readonly colSpan: number;
    readonly footerColumns: ColumnBase[];
    protected isSpanColumn(column: any): boolean;
    protected childColumns(column: ColumnBase): ColumnBase[];
    protected isBoundColumn(column: any): boolean;
}
