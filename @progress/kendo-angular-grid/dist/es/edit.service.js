import { Injectable, EventEmitter } from '@angular/core';
import { isPresent } from './utils';
/**
 * @hidden
 */
var isEqual = function (index) { return function (item) { return item.index === index; }; };
/**
 * @hidden
 */
var isNotEqual = function (index) { return function (item) { return item.index !== index; }; };
/**
 * @hidden
 */
var isNewRow = function (index) { return index === -1 || index === undefined; };
/**
 * @hidden
 */
var EditService = (function () {
    function EditService() {
        this.changes = new EventEmitter();
        this.editedIndices = [];
    }
    EditService.prototype.editRow = function (index, group) {
        if (group === void 0) { group = undefined; }
        this.editedIndices.push({ index: index, group: group });
    };
    EditService.prototype.addRow = function (group) {
        this.newItemGroup = { group: group };
    };
    Object.defineProperty(EditService.prototype, "hasNewItem", {
        get: function () {
            return isPresent(this.newItemGroup);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditService.prototype, "newDataItem", {
        get: function () {
            if (this.hasNewItem) {
                return this.newItemGroup.group.value;
            }
            return {};
        },
        enumerable: true,
        configurable: true
    });
    EditService.prototype.close = function (index) {
        if (isNewRow(index)) {
            this.newItemGroup = undefined;
            return;
        }
        this.editedIndices = this.editedIndices.filter(isNotEqual(index));
    };
    EditService.prototype.context = function (index) {
        if (isNewRow(index)) {
            return this.newItemGroup;
        }
        return this.editedIndices.find(isEqual(index));
    };
    EditService.prototype.isEdited = function (index) {
        return isPresent(this.context(index));
    };
    EditService.prototype.beginEdit = function (rowIndex) {
        this.changes.emit({ action: 'edit', rowIndex: rowIndex });
    };
    EditService.prototype.beginAdd = function () {
        this.changes.emit({ action: 'add' });
    };
    EditService.prototype.endEdit = function (rowIndex) {
        var formGroup = this.context(rowIndex).group;
        this.changes.emit({ action: 'cancel', rowIndex: rowIndex, formGroup: formGroup, isNew: isNewRow(rowIndex) });
    };
    EditService.prototype.save = function (rowIndex) {
        var formGroup = this.context(rowIndex).group;
        this.changes.emit({ action: 'save', rowIndex: rowIndex, formGroup: formGroup, isNew: isNewRow(rowIndex) });
    };
    EditService.prototype.remove = function (rowIndex) {
        this.changes.emit({ action: 'remove', rowIndex: rowIndex });
    };
    return EditService;
}());
export { EditService };
EditService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
EditService.ctorParameters = function () { return []; };
