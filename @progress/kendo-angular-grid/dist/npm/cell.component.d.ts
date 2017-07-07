import { EditService } from './edit.service';
import { ColumnBase } from './column-base';
import { FormGroup } from '@angular/forms';
import { CellContext } from './cell-context';
/**
 * @hidden
 */
export declare class CellComponent {
    private editService;
    private cellContext;
    column: ColumnBase;
    isNew: boolean;
    rowIndex: number;
    dataItem: any;
    readonly isEdited: boolean;
    readonly formGroup: FormGroup;
    readonly templateContext: any;
    readonly format: string | undefined;
    private _rowIndex;
    private readonly isColumnEditable;
    private _templateContext;
    constructor(editService: EditService, cellContext: CellContext);
    private isCommand(column);
    private isFieldEditable(editContext, column);
}
