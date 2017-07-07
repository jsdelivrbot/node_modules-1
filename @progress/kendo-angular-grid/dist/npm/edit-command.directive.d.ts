import { EditService } from './edit.service';
import { CellContext } from './cell-context';
/**
 * Represents the `edit` command of the Grid.
 *
 * You can apply this directive to any `button` element inside a
 * [`CommandColumnComponent`]({% slug api_grid_commandcolumncomponent_kendouiforangular %}).
 *
 * When an associated button with the directive is clicked, the
 * [`edit`]({% slug api_grid_gridcomponent_kendouiforangular %}#toc-edit) event
 * is triggered. For more information, refer to this [editing example]({% slug editing_grid_kendouiforangular %}).
 *
 * @example
 * ```ts-no-run
 * <kendo-grid>
 *   <kendo-grid-command-column title="command">
 *     <ng-template kendoGridCellTemplate>
 *       <button kendoGridEditCommand class="k-primary">Edit</button>
 *     </ng-template>
 *   </kendo-grid-command-column>
 * </kendo-grid>
 * ```
 *
 * > When the row is in the edit mode, the button with `kendoGridEditCommand` is automatically hidden.
 */
export declare class EditCommandDirective {
    private editService;
    rowIndex: number;
    /**
     * @hidden
     */
    click(): void;
    /**
     * @hidden
     */
    readonly visible: string;
    /**
     * @hidden
     */
    readonly buttonClass: boolean;
    /**
     * @hidden
     */
    readonly commandClass: boolean;
    constructor(editService: EditService, cellContext: CellContext);
}
