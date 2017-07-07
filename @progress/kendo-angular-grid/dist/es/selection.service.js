import { Injectable, EventEmitter } from '@angular/core';
import { isPresent } from './utils';
/**
 * @hidden
 */
var SelectionService = (function () {
    function SelectionService() {
        this.changes = new EventEmitter();
        this.selectedIndices = [];
    }
    SelectionService.prototype.isSelected = function (index) {
        return isPresent(this.selectedIndices.find(function (current) { return current === index; }));
    };
    SelectionService.prototype.select = function (index) {
        if (!this.isSelected(index)) {
            this.selectedIndices = [index];
            this.changes.emit({ index: index, selected: true });
        }
    };
    SelectionService.prototype.unselect = function (index) {
        if (this.isSelected(index)) {
            this.selectedIndices = [];
            this.changes.emit({ index: index, selected: false });
        }
    };
    SelectionService.prototype.toggle = function (index) {
        if (this.isSelected(index)) {
            this.unselect(index);
            return;
        }
        this.select(index);
    };
    Object.defineProperty(SelectionService.prototype, "selected", {
        get: function () {
            return this.selectedIndices;
        },
        enumerable: true,
        configurable: true
    });
    return SelectionService;
}());
export { SelectionService };
SelectionService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SelectionService.ctorParameters = function () { return []; };
