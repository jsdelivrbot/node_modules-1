import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommandColumnComponent } from './command-column.component';
import { CellTemplateDirective } from './cell-template.directive';
import { NoRecordsTemplateDirective } from './no-records-template.directive';
import { EditTemplateDirective } from './edit-template.directive';
import { SelectableDirective } from './selectable.directive';
import { TableBodyComponent } from './table-body.component';
import { CellComponent } from './cell.component';
import { EditCommandDirective } from './edit-command.directive';
import { CancelCommandDirective } from './cancel-command.directive';
import { SaveCommandDirective } from './save-command.directive';
import { RemoveCommandDirective } from './remove-command.directive';
import { AddCommandDirective } from './add-command.directive';
import { SharedModule } from "./shared.module";
import { GroupModule } from "./grouping/group.module";
import { NumericTextBoxModule } from "@progress/kendo-angular-inputs";
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
var exported = [
    CommandColumnComponent,
    CellTemplateDirective,
    EditTemplateDirective,
    SelectableDirective,
    TableBodyComponent,
    NoRecordsTemplateDirective,
    CellComponent,
    EditCommandDirective,
    CancelCommandDirective,
    SaveCommandDirective,
    RemoveCommandDirective,
    AddCommandDirective
];
var importedModules = [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    GroupModule,
    NumericTextBoxModule,
    DatePickerModule
];
/**
 * @hidden
 */
var BodyModule = (function () {
    function BodyModule() {
    }
    BodyModule.exports = function () {
        return [
            CommandColumnComponent,
            CellTemplateDirective,
            NoRecordsTemplateDirective,
            EditTemplateDirective,
            EditCommandDirective,
            CancelCommandDirective,
            SaveCommandDirective,
            RemoveCommandDirective,
            AddCommandDirective
        ];
    };
    return BodyModule;
}());
export { BodyModule };
BodyModule.decorators = [
    { type: NgModule, args: [{
                declarations: [exported],
                exports: [exported],
                imports: importedModules.slice()
            },] },
];
/** @nocollapse */
BodyModule.ctorParameters = function () { return []; };
