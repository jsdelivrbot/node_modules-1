"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @hidden
 */
var ExpandStateService = (function () {
    function ExpandStateService() {
        this.changes = new core_1.EventEmitter();
        this.rowState = [];
    }
    ExpandStateService.prototype.toggleRow = function (index, dataItem) {
        var rowIndex = this.rowState.indexOf(index);
        var expand = rowIndex === -1;
        this.rowState = expand ? this.rowState.concat([index]) : this.rowState.slice(0, rowIndex).concat(this.rowState.slice(rowIndex + 1));
        this.changes.emit({ dataItem: dataItem, expand: expand, index: index });
    };
    ExpandStateService.prototype.isExpanded = function (index) {
        return this.rowState.indexOf(index) >= 0;
    };
    return ExpandStateService;
}());
exports.ExpandStateService = ExpandStateService;
