import { EventEmitter, OnChanges, TemplateRef } from '@angular/core';
import { CellContext } from './models/cell-context.interface';
import { MonthViewService } from './services/month-view.service';
import { IntlService } from '@progress/kendo-angular-intl';
/**
 * @hidden
 */
export declare class MonthComponent implements OnChanges {
    service: MonthViewService;
    intl: IntlService;
    isActive: boolean;
    cellUID: string;
    focusedDate: Date;
    selectedDate: Date;
    viewDate: Date;
    min: Date;
    max: Date;
    showWeekNumbers: boolean;
    viewIndex: number;
    templateRef: TemplateRef<any>;
    change: EventEmitter<Date>;
    viewData: CellContext[][];
    title: string;
    private today;
    constructor(service: MonthViewService, intl: IntlService);
    ngOnChanges(_: any): void;
    handleClick(ctx: CellContext): void;
    trackRow(_: number, row: Array<CellContext>): string;
    trackCell(_: number, ctx: CellContext): string;
    firstDate(rowCtx: CellContext[]): Date;
    getStyles(context: CellContext): any;
}
