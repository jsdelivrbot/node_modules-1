import { EventEmitter, ElementRef, Directive, Input } from '@angular/core';
import Draggable from '@telerik/kendo-draggable';
import 'rxjs/add/operator/delay';
/**
 * @hidden
 */
var DraggableDirective = (function () {
    function DraggableDirective(element) {
        var _this = this;
        this.kendo = {
            drag: new EventEmitter(),
            press: new EventEmitter(),
            release: new EventEmitter()
        };
        if (typeof document !== 'undefined') {
            this.draggable = new Draggable({
                drag: function (e) { return _this.kendo.drag.delay(50).next(Object.assign({}, e, { column: _this.column })); },
                press: function (e) { return _this.kendo.press.next(Object.assign({}, e, { column: _this.column })); },
                release: function (e) { return _this.kendo.release.next(Object.assign({}, e, { column: _this.column })); }
            });
            this.draggable.bindTo(element.nativeElement);
        }
    }
    Object.defineProperty(DraggableDirective.prototype, "kendoGridDraggable", {
        set: function (column) {
            this.column = column;
        },
        enumerable: true,
        configurable: true
    });
    DraggableDirective.prototype.ngOnDestroy = function () {
        if (typeof document !== 'undefined') {
            this.draggable.destroy();
        }
    };
    return DraggableDirective;
}());
export { DraggableDirective };
DraggableDirective.decorators = [
    { type: Directive, args: [{
                outputs: ['kendo.press', 'kendo.drag', 'kendo.release'],
                selector: '[kendoGridDraggable]'
            },] },
];
/** @nocollapse */
DraggableDirective.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
DraggableDirective.propDecorators = {
    'kendoGridDraggable': [{ type: Input },],
};
