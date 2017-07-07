"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var utils_1 = require("./utils");
/**
 * @hidden
 */
var SelectionService = (function () {
    function SelectionService() {
        this.changes = new core_1.EventEmitter();
        this.selectedIndices = [];
    }
    SelectionService.prototype.isSelected = function (index) {
        return utils_1.isPresent(this.selectedIndices.find(function (current) { return current === index; }));
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
SelectionService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
SelectionService.ctorParameters = function () { return []; };
exports.SelectionService = SelectionService;
