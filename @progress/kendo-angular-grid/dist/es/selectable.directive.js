import { Directive, Input, HostBinding, HostListener } from '@angular/core';
import { SelectionService } from './selection.service';
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
export { SelectableDirective };
SelectableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridSelectable]'
            },] },
];
/** @nocollapse */
SelectableDirective.ctorParameters = function () { return [
    { type: SelectionService, },
]; };
SelectableDirective.propDecorators = {
    'index': [{ type: Input },],
    'kendoGridSelectable': [{ type: Input },],
    'className': [{ type: HostBinding, args: ['class.k-state-selected',] },],
    'onClick': [{ type: HostListener, args: ['click', ['$event.target'],] },],
};
