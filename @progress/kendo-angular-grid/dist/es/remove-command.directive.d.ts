import { EditService } from './edit.service';
import { CellContext } from './cell-context';
/**
 * Represents the `remove` command of the Grid.
 *
 * You can apply this directive to any `button` element inside a
 * [`CommandColumnComponent`]({% slug api_grid_commandcolumncomponent_kendouiforangular %}).
 *
 * When an associated button with the directive is clicked, the
 * [`remove` event]({% slug api_grid_gridcomponent_kendouiforangular %}#toc-remove)
 * is triggered. For more information, refer to the [editing example]({% slug editing_grid_kendouiforangular %}).
 *
 * @example
 * ```ts-no-run
 * <kendo-grid>
 *   <kendo-grid-command-column title="command">
 *     <ng-template kendoGridCellTemplate>
 *       <button kendoGridRemoveCommand>Remove row</button>
 *     </ng-template>
 *   </kendo-grid-command-column>
 * </kendo-grid>
 * ```
 * > When the row *is* in the edit mode, the button with the `kendoGridRemoveCommand` is automatically hidden.
 */
export declare class RemoveCommandDirective {
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
