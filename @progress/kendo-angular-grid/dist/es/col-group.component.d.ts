import { GroupDescriptor } from '@progress/kendo-data-query';
import { ColumnComponent } from './column.component';
import { DetailTemplateDirective } from './detail-template.directive';
import { ColumnBase } from "./column-base";
/**
 * @hidden
 */
export declare class ColGroupComponent {
    columns: Array<ColumnComponent>;
    groups: Array<GroupDescriptor>;
    detailTemplate: DetailTemplateDirective;
    readonly columnsToRender: Array<ColumnBase>;
}
