import { EventEmitter } from '@angular/core';
/**
 * The returned type of the `selection` event.
 */
export interface SelectionEvent {
    /**
     * The index of the affected row.
     */
    index: number;
    /**
     * The selected state of the row.
     */
    selected: boolean;
}
/**
 * @hidden
 */
export declare class SelectionService {
    changes: EventEmitter<SelectionEvent>;
    private selectedIndices;
    isSelected(index: number): boolean;
    select(index: number): void;
    unselect(index: number): void;
    toggle(index: number): void;
    readonly selected: number[];
}
