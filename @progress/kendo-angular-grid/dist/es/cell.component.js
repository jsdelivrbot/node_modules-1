import { Component, Input, Inject, Optional } from '@angular/core';
import { EditService } from './edit.service';
import { CommandColumnComponent } from './command-column.component';
import { isColumnComponent } from './column.component';
import { isPresent, isNullOrEmptyString, extractFormat } from './utils';
import { CELL_CONTEXT } from './cell-context';
/**
 * @hidden
 */
var CellComponent = (function () {
    function CellComponent(editService, cellContext) {
        this.editService = editService;
        this.cellContext = cellContext;
        this.isNew = false;
        this._templateContext = {};
    }
    Object.defineProperty(CellComponent.prototype, "rowIndex", {
        get: function () {
            return this._rowIndex;
        },
        set: function (index) {
            this._rowIndex = index;
            if (this.cellContext) {
                this.cellContext.rowIndex = index;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "isEdited", {
        get: function () {
            if (!this.isColumnEditable) {
                return false;
            }
            var editContext = this.editService.context(this.rowIndex);
            return this.isFieldEditable(editContext, this.column);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "formGroup", {
        get: function () {
            return this.editService.context(this.rowIndex).group;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "templateContext", {
        get: function () {
            this._templateContext.$implicit = this.formGroup;
            this._templateContext.isNew = this.isNew;
            this._templateContext.column = this.column;
            this._templateContext.dataItem = this.dataItem;
            this._templateContext.formGroup = this.formGroup;
            this._templateContext.rowIndex = this.rowIndex;
            return this._templateContext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "format", {
        get: function () {
            if (isColumnComponent(this.column) && !isNullOrEmptyString(this.column.format)) {
                return extractFormat(this.column.format);
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "isColumnEditable", {
        get: function () {
            if (!this.column || this.isCommand(this.column)) {
                return false;
            }
            return this.column.editable !== false;
        },
        enumerable: true,
        configurable: true
    });
    CellComponent.prototype.isCommand = function (column) {
        return column instanceof CommandColumnComponent;
    };
    CellComponent.prototype.isFieldEditable = function (editContext, column) {
        if (!isPresent(editContext)) {
            return false;
        }
        if (isPresent(column.editTemplate)) {
            return true;
        }
        return isPresent(editContext.group) && isPresent(editContext.group.get(column.field));
    };
    return CellComponent;
}());
export { CellComponent };
CellComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoGridCell]',
                template: "\n        <ng-container [ngSwitch]=\"isEdited\">\n            <ng-content *ngSwitchCase=\"false\"></ng-content>\n            <ng-container *ngSwitchCase=\"true\">\n                <ng-template\n                    *ngIf=\"column.editTemplateRef\"\n                    [ngTemplateOutlet]=\"column.editTemplateRef\"\n                    [ngOutletContext]=\"templateContext\">\n                </ng-template>\n                <ng-container [ngSwitch]=\"column.editor\" *ngIf=\"!column.editTemplate\">\n                    <kendo-numerictextbox\n                        *ngSwitchCase=\"'numeric'\"\n                        [format]=\"format\"\n                        [formControl]=\"formGroup.get(column.field)\"\n                    ></kendo-numerictextbox>\n\n                    <kendo-datepicker\n                        *ngSwitchCase=\"'date'\"\n                        [format]=\"format\"\n                        [formControl]=\"formGroup.get(column.field)\"\n                    ></kendo-datepicker>\n\n                    <input\n                        *ngSwitchCase=\"'boolean'\"\n                        type=\"checkbox\"\n                        [formControl]=\"formGroup.get(column.field)\"\n                    />\n\n                    <input\n                        *ngSwitchDefault\n                        type=\"text\"\n                        class=\"k-textbox\"\n                        [formControl]=\"formGroup.get(column.field)\"\n                    />\n                </ng-container>\n            </ng-container>\n        </ng-container>\n    "
            },] },
];
/** @nocollapse */
CellComponent.ctorParameters = function () { return [
    { type: EditService, },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [CELL_CONTEXT,] },] },
]; };
CellComponent.propDecorators = {
    'column': [{ type: Input },],
    'isNew': [{ type: Input },],
    'rowIndex': [{ type: Input },],
    'dataItem': [{ type: Input },],
};
