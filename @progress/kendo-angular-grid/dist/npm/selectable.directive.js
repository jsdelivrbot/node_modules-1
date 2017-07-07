"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var selection_service_1 = require("./selection.service");
/**
 * @hidden
 */
var SelectableDirective = (function () {
    function SelectableDirective(selectionService) {
        this.selectionService = selectionService;
        this.ignored = /^(a|input|textarea|button)$/i;
    }
    Object.defineProperty(SelectableDirective.prototype, "kendoGridSelectable", {
        set: function (enabled) {
            this.enabled = enabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectableDirective.prototype, "className", {
        get: function () {
            return this.selectionService.isSelected(this.index);
        },
        enumerable: true,
        configurable: true
    });
    SelectableDirective.prototype.onClick = function (target) {
        if (!this.enabled) {
            return;
        }
        if (this.shouldSelect(target.tagName)) {
            this.selectionService.toggle(this.index);
        }
    };
    SelectableDirective.prototype.shouldSelect = function (tagName) {
        return !this.ignored.test(tagName);
    };
    return SelectableDirective;
}());
SelectableDirective.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[kendoGridSelectable]'
            },] },
];
/** @nocollapse */
SelectableDirective.ctorParameters = function () { return [
    { type: selection_service_1.SelectionService, },
]; };
SelectableDirective.propDecorators = {
    'index': [{ type: core_1.Input },],
    'kendoGridSelectable': [{ type: core_1.Input },],
    'className': [{ type: core_1.HostBinding, args: ['class.k-state-selected',] },],
    'onClick': [{ type: core_1.HostListener, args: ['click', ['$event.target'],] },],
};
exports.SelectableDirective = SelectableDirective;
