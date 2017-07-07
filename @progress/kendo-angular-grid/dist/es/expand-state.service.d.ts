import { EventEmitter } from '@angular/core';
/**
 * @hidden
 */
export declare abstract class ExpandStateService {
    changes: EventEmitter<{
        dataItem: any;
        expand: boolean;
        index: number;
    }>;
    private rowState;
    toggleRow(index: any, dataItem: any): void;
    isExpanded(index: any): boolean;
}
