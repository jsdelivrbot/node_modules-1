import { ExcelService } from './excel.service';
/**
 * Represents the **Export to Excel** command of the Grid.
 *
 * You can apply this directive to any `button` element inside a
 * [`ToolbarTemplate`]({% slug api_grid_commandcolumncomponent_kendouiforangular %}).
 *
 * When the user clicks a button associated with the directive, the
 * [`excelExport`]({% slug api_grid_gridcomponent_kendouiforangular %}#toc-excelexport) event
 * fires. For more information, refer to article on [exporting the Grid to Excel]({% slug excelexport_grid_kendouiforangular %}).
 *
 * @example
 * ```ts-no-run
 * <kendo-grid>
 *      <ng-template kendoGridToolbarTemplate>
 *          <button kendoGridExcelCommand>Export to PDF</button>
 *      </ng-template>
 *      <kendo-grid-excel fileName="Grid.xlsx">
 *      </kendo-grid-excel>
 * </kendo-grid>
 * ```
 */
export declare class ExcelCommandDirective {
    private excelService;
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
    readonly excelClass: boolean;
    constructor(excelService: ExcelService);
}
