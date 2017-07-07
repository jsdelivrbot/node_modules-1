"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var kendo_angular_dropdowns_1 = require("@progress/kendo-angular-dropdowns");
var kendo_angular_inputs_1 = require("@progress/kendo-angular-inputs");
var kendo_angular_dateinputs_1 = require("@progress/kendo-angular-dateinputs");
var filter_row_component_1 = require("./filter-row.component");
var filter_cell_component_1 = require("./filter-cell.component");
var filter_cell_template_directive_1 = require("./filter-cell-template.directive");
var numeric_filter_cell_component_1 = require("./numeric-filter-cell.component");
var filter_input_directive_1 = require("./filter-input.directive");
var filter_cell_wrapper_component_1 = require("./filter-cell-wrapper.component");
var string_filter_cell_component_1 = require("./string-filter-cell.component");
var filter_cell_operators_component_1 = require("./filter-cell-operators.component");
var filter_host_directive_1 = require("./filter-host.directive");
var autocomplete_filter_cell_component_1 = require("./autocomplete-filter-cell.component");
var boolean_filter_cell_component_1 = require("./boolean-filter-cell.component");
var date_filter_cell_component_1 = require("./date-filter-cell.component");
var contains_filter_operator_component_1 = require("./operators/contains-filter-operator.component");
var not_contains_filter_operator_component_1 = require("./operators/not-contains-filter-operator.component");
var ends_with_filter_operator_component_1 = require("./operators/ends-with-filter-operator.component");
var eq_filter_operator_component_1 = require("./operators/eq-filter-operator.component");
var is_empty_filter_operator_component_1 = require("./operators/is-empty-filter-operator.component");
var is_not_empty_filter_operator_component_1 = require("./operators/is-not-empty-filter-operator.component");
var is_not_null_filter_operator_component_1 = require("./operators/is-not-null-filter-operator.component");
var isnull_filter_operator_component_1 = require("./operators/isnull-filter-operator.component");
var neq_filter_operator_component_1 = require("./operators/neq-filter-operator.component");
var starts_with_filter_operator_component_1 = require("./operators/starts-with-filter-operator.component");
var gt_filter_operator_component_1 = require("./operators/gt-filter-operator.component");
var gte_filter_operator_component_1 = require("./operators/gte-filter-operator.component");
var lt_filter_operator_component_1 = require("./operators/lt-filter-operator.component");
var lte_filter_operator_component_1 = require("./operators/lte-filter-operator.component");
var FILTER_OPERATORS = [
    filter_cell_operators_component_1.FilterCellOperatorsComponent,
    contains_filter_operator_component_1.ContainsFilterOperatorComponent,
    not_contains_filter_operator_component_1.DoesNotContainFilterOperatorComponent,
    ends_with_filter_operator_component_1.EndsWithFilterOperatorComponent,
    eq_filter_operator_component_1.EqualFilterOperatorComponent,
    is_empty_filter_operator_component_1.IsEmptyFilterOperatorComponent,
    is_not_empty_filter_operator_component_1.IsNotEmptyFilterOperatorComponent,
    is_not_null_filter_operator_component_1.IsNotNullFilterOperatorComponent,
    isnull_filter_operator_component_1.IsNullFilterOperatorComponent,
    neq_filter_operator_component_1.NotEqualFilterOperatorComponent,
    starts_with_filter_operator_component_1.StartsWithFilterOperatorComponent,
    gt_filter_operator_component_1.GreaterFilterOperatorComponent,
    gte_filter_operator_component_1.GreaterOrEqualToFilterOperatorComponent,
    lt_filter_operator_component_1.LessFilterOperatorComponent,
    lte_filter_operator_component_1.LessOrEqualToFilterOperatorComponent
];
var INTERNAL_COMPONENTS = [
    filter_row_component_1.FilterRowComponent,
    filter_cell_component_1.FilterCellComponent,
    filter_cell_template_directive_1.FilterCellTemplateDirective,
    filter_cell_operators_component_1.FilterCellOperatorsComponent,
    string_filter_cell_component_1.StringFilterCellComponent,
    numeric_filter_cell_component_1.NumericFilterCellComponent,
    autocomplete_filter_cell_component_1.AutoCompleteFilterCellComponent,
    boolean_filter_cell_component_1.BooleanFilterCellComponent,
    filter_host_directive_1.FilterHostDirective,
    filter_cell_wrapper_component_1.FilterCellWrapperComponent,
    filter_input_directive_1.FilterInputDirective,
    date_filter_cell_component_1.DateFilterCellComponent
];
var importedModules = [
    common_1.CommonModule,
    forms_1.ReactiveFormsModule,
    forms_1.FormsModule,
    kendo_angular_dropdowns_1.DropDownListModule,
    kendo_angular_dropdowns_1.AutoCompleteModule,
    kendo_angular_inputs_1.InputsModule,
    kendo_angular_dateinputs_1.DatePickerModule
];
var ENTRY_COMPONENTS = [
    string_filter_cell_component_1.StringFilterCellComponent,
    numeric_filter_cell_component_1.NumericFilterCellComponent,
    boolean_filter_cell_component_1.BooleanFilterCellComponent,
    date_filter_cell_component_1.DateFilterCellComponent
];
/**
 * @hidden
 */
var RowFilterModule = (function () {
    function RowFilterModule() {
    }
    RowFilterModule.exports = function () {
        return [
            filter_row_component_1.FilterRowComponent,
            filter_cell_component_1.FilterCellComponent,
            filter_cell_template_directive_1.FilterCellTemplateDirective,
            filter_cell_operators_component_1.FilterCellOperatorsComponent,
            string_filter_cell_component_1.StringFilterCellComponent,
            numeric_filter_cell_component_1.NumericFilterCellComponent,
            autocomplete_filter_cell_component_1.AutoCompleteFilterCellComponent,
            boolean_filter_cell_component_1.BooleanFilterCellComponent,
            date_filter_cell_component_1.DateFilterCellComponent
        ].concat(FILTER_OPERATORS);
    };
    return RowFilterModule;
}());
RowFilterModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [INTERNAL_COMPONENTS, FILTER_OPERATORS],
                entryComponents: ENTRY_COMPONENTS,
                exports: [INTERNAL_COMPONENTS, FILTER_OPERATORS],
                imports: importedModules.slice()
            },] },
];
/** @nocollapse */
RowFilterModule.ctorParameters = function () { return []; };
exports.RowFilterModule = RowFilterModule;
