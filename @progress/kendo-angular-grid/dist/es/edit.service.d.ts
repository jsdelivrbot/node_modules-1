import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
/**
 * @hidden
 */
export declare type Entity = {
    index: number;
    group: any;
};
/**
 * @hidden
 */
export declare type CommandAction = 'edit' | 'remove' | 'cancel' | 'save' | 'add';
/**
 * @hidden
 */
export declare type CommandEvent = {
    action: CommandAction;
    formGroup?: FormGroup;
    isNew?: boolean;
    rowIndex?: number;
};
/**
 * @hidden
 */
export declare class EditService {
    changes: EventEmitter<CommandEvent>;
    private editedIndices;
    private newItemGroup;
    editRow(index: number, group?: any): void;
    addRow(group: any): void;
    readonly hasNewItem: boolean;
    readonly newDataItem: any;
    close(index?: number): void;
    context(index?: number): Entity;
    isEdited(index: number): boolean;
    beginEdit(rowIndex: number): void;
    beginAdd(): void;
    endEdit(rowIndex?: number): void;
    save(rowIndex?: number): void;
    remove(rowIndex: number): void;
}
