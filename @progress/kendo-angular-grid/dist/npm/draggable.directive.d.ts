import { ElementRef, OnDestroy } from '@angular/core';
import { ColumnComponent } from './column.component';
import 'rxjs/add/operator/delay';
/**
 * @hidden
 */
export declare class DraggableDirective implements OnDestroy {
    kendoGridDraggable: ColumnComponent;
    kendo: any;
    column: ColumnComponent;
    private draggable;
    constructor(element: ElementRef);
    ngOnDestroy(): void;
}
