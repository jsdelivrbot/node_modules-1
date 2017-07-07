import { IntlService } from '@progress/kendo-angular-intl';
import { CellContext } from '../models/cell-context.interface';
/**
 * @hidden
 */
export declare class MonthViewService {
    private _intlService;
    constructor(_intlService: IntlService);
    prev(current: Date): Date;
    next(current: Date): Date;
    dayValue(current: Date): string;
    title(current: Date): string;
    viewData(options: any): CellContext[][];
    weekNumber(date: Date): number;
    isWeekend(date: Date): boolean;
    isEqual(candidate: Date, expected: Date): boolean;
    weekNames(): string[];
    private abbrMonthNames();
}
