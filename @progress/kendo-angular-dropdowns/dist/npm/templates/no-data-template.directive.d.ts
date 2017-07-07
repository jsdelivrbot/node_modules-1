import { TemplateRef } from '@angular/core';
/**
 * Used for rendering content when there is no data present.
 *
 * To define the no-data template, nest a `<ng-template>` tag with the `kendo<ComponentName>NoDataTemplate` directive inside the component tag.
 *
 * Use:
 * - The `kendoAutoCompleteNoDataTemplate` directive for the AutoComplete.
 * - The `kendoComboBoxNoDataTemplate` directive for the ComboBox.
 * - The `kendoDropDownListNoDataTemplate` directive for the DropDownList.
 * - The `kendoMultiSelectNoDataTemplate` directive for the MultiSelect.
 *
 *
 * @example
 * ```ts
 * @@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-combobox [data]="listItems">
 *    <ng-template kendoComboBoxNoDataTemplate>
 *      <h4>No data!</h4>
 *    </ng-template>
 *  </kendo-combobox>
 * `
 * })
 * class AppComponent {
 *   public listItems: Array<string> = [];
 * }
 * ```
 *
 * For more examples, refer to the article on [templates]({% slug overview_ddl_kendouiforangular %}#toc-templates).
 */
export declare class NoDataTemplateDirective {
    templateRef: TemplateRef<any>;
    constructor(templateRef: TemplateRef<any>);
}