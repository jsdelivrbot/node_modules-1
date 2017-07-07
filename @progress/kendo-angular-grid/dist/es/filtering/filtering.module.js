import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropDownListModule, AutoCompleteModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { FilterRowComponent } from './filter-row.component';
import { FilterCellComponent } from './filter-cell.component';
import { FilterCellTemplateDirective } from './filter-cell-template.directive';
import { NumericFilterCellComponent } from './numeric-filter-cell.component';
import { FilterInputDirective } from './filter-input.directive';
import { FilterCellWrapperComponent } from './filter-cell-wrapper.component';
import { StringFilterCellComponent } from './string-filter-cell.component';
import { FilterCellOperatorsComponent } from './filter-cell-operators.component';
import { FilterHostDirective } from './filter-host.directive';
import { AutoCompleteFilterCellComponent } from './autocomplete-filter-cell.component';
import { BooleanFilterCellComponent } from './boolean-filter-cell.component';
import { DateFilterCellComponent } from './date-filter-cell.component';
import { ContainsFilterOperatorComponent } from './operators/contains-filter-operator.component';
import { DoesNotContainFilterOperatorComponent } from './operators/not-contains-filter-operator.component';
import { EndsWithFilterOperatorComponent } from './operators/ends-with-filter-operator.component';
import { EqualFilterOperatorComponent } from './operators/eq-filter-operator.component';
import { IsEmptyFilterOperatorComponent } from './operators/is-empty-filter-operator.component';
import { IsNotEmptyFilterOperatorComponent } from './operators/is-not-empty-filter-operator.component';
import { IsNotNullFilterOperatorComponent } from './operators/is-not-null-filter-operator.component';
import { IsNullFilterOperatorComponent } from './operators/isnull-filter-operator.component';
import { NotEqualFilterOperatorComponent } from './operators/neq-filter-operator.component';
import { StartsWithFilterOperatorComponent } from './operators/starts-with-filter-operator.component';
import { GreaterFilterOperatorComponent } from './operators/gt-filter-operator.component';
import { GreaterOrEqualToFilterOperatorComponent } from './operators/gte-filter-operator.component';
import { LessFilterOperatorComponent } from './operators/lt-filter-operator.component';
import { LessOrEqualToFilterOperatorComponent } from './operators/lte-filter-operator.component';
var FILTER_OPERATORS = [
    FilterCellOperatorsComponent,
    ContainsFilterOperatorComponent,
    DoesNotContainFilterOperatorComponent,
    EndsWithFilterOperatorComponent,
    EqualFilterOperatorComponent,
    IsEmptyFilterOperatorComponent,
    IsNotEmptyFilterOperatorComponent,
    IsNotNullFilterOperatorComponent,
    IsNullFilterOperatorComponent,
    NotEqualFilterOperatorComponent,
    StartsWithFilterOperatorComponent,
    GreaterFilterOperatorComponent,
    GreaterOrEqualToFilterOperatorComponent,
    LessFilterOperatorComponent,
    LessOrEqualToFilterOperatorComponent
];
var INTERNAL_COMPONENTS = [
    FilterRowComponent,
    FilterCellComponent,
    FilterCellTemplateDirective,
    FilterCellOperatorsComponent,
    StringFilterCellComponent,
    NumericFilterCellComponent,
    AutoCompleteFilterCellComponent,
    BooleanFilterCellComponent,
    FilterHostDirective,
    FilterCellWrapperComponent,
    FilterInputDirective,
    DateFilterCellComponent
];
var importedModules = [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DropDownListModule,
    AutoCompleteModule,
    InputsModule,
    DatePickerModule
];
var ENTRY_COMPONENTS = [
    StringFilterCellComponent,
    NumericFilterCellComponent,
    BooleanFilterCellComponent,
    DateFilterCellComponent
];
/**
 * @hidden
 */
var RowFilterModule = (function () {
    function RowFilterModule() {
    }
    RowFilterModule.exports = function () {
        return [
            FilterRowComponent,
            FilterCellComponent,
            FilterCellTemplateDirective,
            FilterCellOperatorsComponent,
            StringFilterCellComponent,
            NumericFilterCellComponent,
            AutoCompleteFilterCellComponent,
            BooleanFilterCellComponent,
            DateFilterCellComponent
        ].concat(FILTER_OPERATORS);
    };
    return RowFilterModule;
}());
export { RowFilterModule };
RowFilterModule.decorators = [
    { type: NgModule, args: [{
                declarations: [INTERNAL_COMPONENTS, FILTER_OPERATORS],
                entryComponents: ENTRY_COMPONENTS,
                exports: [INTERNAL_COMPONENTS, FILTER_OPERATORS],
                imports: importedModules.slice()
            },] },
];
/** @nocollapse */
RowFilterModule.ctorParameters = function () { return []; };
