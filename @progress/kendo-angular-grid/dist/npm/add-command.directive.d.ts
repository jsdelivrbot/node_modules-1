import { EditService } from './edit.service';
/**
 * Represents the `add new item` command of the Grid.
 *
 * You can apply this directive to any `button` element inside a
 * [`ToolbarTemplate`]({% slug api_grid_commandcolumncomponent_kendouiforangular %}).
 *
 * When an associated button with the directive is clicked, the
 * [`add`]({% slug api_grid_gridcomponent_kendouiforangular %}#toc-add) event
 * is triggered. For more information, refer to the [editing example]({% slug editing_grid_kendouiforangular %}).
 *
 * @example
 * ```ts-no-run
 * <kendo-grid>
 *    <ng-template kendoGridToolbarTemplate>
 *       <button kendoGridAddCommand>Add new</button>
 *    </ng-template>
 * </kendo-grid>
 * ```
 */
export declare class AddCommandDirective {
    private editService;
    /**
     * @hidden
     */
    click(): void;
    /**
     * @hidden
     */
    readonly buttonClass: boolean;
    /**
     * @hidden
     */
    readonly commandClass: boolean;
    constructor(editService: EditService);
}
