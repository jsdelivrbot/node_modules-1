import { EventEmitter, OnChanges, AfterViewChecked, AfterViewInit } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { VirtualizationComponent } from './virtualization.component';
import { DOMService } from './services/dom.service';
import { PageAction, ScrollAction } from './services/scroller.service';
/**
 * @hidden
 */
export declare class NavigationComponent implements OnChanges, AfterViewInit, AfterViewChecked {
    min: Date;
    max: Date;
    focusedDate: Date;
    valueChange: EventEmitter<Date>;
    virtualization: VirtualizationComponent;
    readonly getComponentClass: boolean;
    dates: Date[];
    monthNames: string[];
    style: any;
    take: number;
    skip: number;
    total: number;
    itemHeight: number;
    topOffset: number;
    bottomOffset: number;
    private indexToScroll;
    constructor(dom: DOMService, intlService: IntlService);
    ngOnChanges(changes: any): void;
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    trackByDates(_: number, date: Date): string;
    pageChange({skip}: PageAction): void;
    scrollChange({offset}: ScrollAction): void;
    handleDateChange(candidate: Date): void;
    private getTake(skip);
    private scrollOnce(action);
}
