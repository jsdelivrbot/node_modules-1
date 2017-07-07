"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var command_column_component_1 = require("./command-column.component");
var cell_template_directive_1 = require("./cell-template.directive");
var no_records_template_directive_1 = require("./no-records-template.directive");
var edit_template_directive_1 = require("./edit-template.directive");
var selectable_directive_1 = require("./selectable.directive");
var table_body_component_1 = require("./table-body.component");
var cell_component_1 = require("./cell.component");
var edit_command_directive_1 = require("./edit-command.directive");
var cancel_command_directive_1 = require("./cancel-command.directive");
var save_command_directive_1 = require("./save-command.directive");
var remove_command_directive_1 = require("./remove-command.directive");
var add_command_directive_1 = require("./add-command.directive");
var shared_module_1 = require("./shared.module");
var group_module_1 = require("./grouping/group.module");
var kendo_angular_inputs_1 = require("@progress/kendo-angular-inputs");
var kendo_angular_dateinputs_1 = require("@progress/kendo-angular-dateinputs");
var exported = [
    command_column_component_1.CommandColumnComponent,
    cell_template_directive_1.CellTemplateDirective,
    edit_template_directive_1.EditTemplateDirective,
    selectable_directive_1.SelectableDirective,
    table_body_component_1.TableBodyComponent,
    no_records_template_directive_1.NoRecordsTemplateDirective,
    cell_component_1.CellComponent,
    edit_command_directive_1.EditCommandDirective,
    cancel_command_directive_1.CancelCommandDirective,
    save_command_directive_1.SaveCommandDirective,
    remove_command_directive_1.RemoveCommandDirective,
    add_command_directive_1.AddCommandDirective
];
var importedModules = [
    common_1.CommonModule,
    forms_1.ReactiveFormsModule,
    forms_1.FormsModule,
    shared_module_1.SharedModule,
    group_module_1.GroupModule,
    kendo_angular_inputs_1.NumericTextBoxModule,
    kendo_angular_dateinputs_1.DatePickerModule
];
/**
 * @hidden
 */
var BodyModule = (function () {
    function BodyModule() {
    }
    BodyModule.exports = function () {
        return [
            command_column_component_1.CommandColumnComponent,
            cell_template_directive_1.CellTemplateDirective,
            no_records_template_directive_1.NoRecordsTemplateDirective,
            edit_template_directive_1.EditTemplateDirective,
            edit_command_directive_1.EditCommandDirective,
            cancel_command_directive_1.CancelCommandDirective,
            save_command_directive_1.SaveCommandDirective,
            remove_command_directive_1.RemoveCommandDirective,
            add_command_directive_1.AddCommandDirective
        ];
    };
    return BodyModule;
}());
BodyModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [exported],
                exports: [exported],
                imports: importedModules.slice()
            },] },
];
/** @nocollapse */
BodyModule.ctorParameters = function () { return []; };
exports.BodyModule = BodyModule;
