import { EventEmitter, OnChanges } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { MonthViewService } from './services/month-view.service';
/**
 * @hidden
 */
export declare class HeaderComponent implements OnChanges {
    private service;
    localization: LocalizationService;
    isInRange: boolean;
    todayMessage: string;
    title: string;
    currentDate: Date;
    min: Date;
    max: Date;
    today: EventEmitter<Date>;
    readonly getComponentClass: boolean;
    constructor(service: MonthViewService, localization: LocalizationService);
    ngOnChanges(_: any): void;
    handleTodayClick(): void;
}
