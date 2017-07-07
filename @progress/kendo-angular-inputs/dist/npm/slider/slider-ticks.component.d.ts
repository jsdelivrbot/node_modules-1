import { ElementRef, EventEmitter, OnChanges, QueryList } from '@angular/core';
/**
 * @hidden
 */
export declare class KendoSliderTicksComponent implements OnChanges {
    private rtl;
    tickClick: EventEmitter<any>;
    vertical: boolean;
    ticksCount: number;
    title: string;
    step: number;
    container: ElementRef;
    tickElements: QueryList<ElementRef>;
    ticks: Array<any>;
    constructor(rtl: boolean);
    ngOnChanges(_: any): void;
    onClick(event: Event): void;
    tickClasses(tick: any): Object;
    private createTicks();
}
