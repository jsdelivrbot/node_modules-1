import { EventEmitter, OnChanges, AfterViewChecked, AfterViewInit, TemplateRef } from '@angular/core';
import { VirtualizationComponent } from './virtualization.component';
import { DOMService } from './services/dom.service';
import { MonthViewService } from './services/month-view.service';
import { PageAction, ScrollAction } from './services/scroller.service';
/**
 * @hidden
 */
export declare class MonthViewComponent implements OnChanges, AfterViewInit, AfterViewChecked {
    service: MonthViewService;
    cellTemplateRef: TemplateRef<any>;
    cellUID: string;
    focusedDate: Date;
    isActive: boolean;
    min: Date;
    max: Date;
    value: Date;
    change: EventEmitter<Date>;
    virtualization: VirtualizationComponent;
    readonly getComponentClass: boolean;
    activeDate: Date;
    dates: Date[];
    style: any;
    take: number;
    skip: number;
    total: number;
    viewHeight: number;
    viewOffset: number;
    bottomOffset: number;
    private indexToScroll;
    private minViewsToRender;
    constructor(service: MonthViewService, dom: DOMService);
    ngOnChanges(changes: any): void;
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    trackByDates(_: number, date: Date): string;
    pageChange({skip}: PageAction): void;
    scrollChange({offset}: ScrollAction): void;
    setActiveDate(index: number): void;
    handleDateChange(candidate: Date): void;
    private getTake(skip);
    private getViewDate(date);
    private scrollOnce(action);
}
