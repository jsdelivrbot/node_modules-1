import { Component, EventEmitter, Inject, Input, Optional, Output, ViewChild, ViewChildren } from '@angular/core';
import { RTL } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
var SliderTick = (function () {
    function SliderTick(index) {
        this.index = index;
        this.first = false;
        this.last = false;
    }
    return SliderTick;
}());
/**
 * @hidden
 */
var KendoSliderTicksComponent = (function () {
    function KendoSliderTicksComponent(rtl) {
        this.rtl = rtl;
        this.tickClick = new EventEmitter();
        this.ticks = [];
    }
    KendoSliderTicksComponent.prototype.ngOnChanges = function (_) {
        this.createTicks();
    };
    KendoSliderTicksComponent.prototype.onClick = function (event) {
        this.tickClick.next(event);
    };
    KendoSliderTicksComponent.prototype.tickClasses = function (tick) {
        return {
            'k-first': (tick.first && !this.vertical) || (tick.last && this.vertical),
            'k-last': (tick.last && !this.vertical) || (tick.first && this.vertical),
            'k-tick': true
        };
    };
    KendoSliderTicksComponent.prototype.createTicks = function () {
        var result = [];
        for (var i = 0; i < this.ticksCount; i++) {
            result.push(new SliderTick(i));
        }
        if (this.rtl) {
            result = result.reverse();
        }
        if (result.length > 0) {
            result[0].first = true;
            result[result.length - 1].last = true;
        }
        this.ticks = result;
    };
    return KendoSliderTicksComponent;
}());
export { KendoSliderTicksComponent };
KendoSliderTicksComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-slider-ticks',
                template: "\n    <ul #container class=\"k-reset k-slider-items\">\n        <li #tickElement *ngFor=\"let tick of ticks\"\n            [ngClass]=\"tickClasses(tick)\"\n            title=\"{{title(tick.index * step)}}\"\n            (click)=\"onClick($event)\"\n            role=\"presentation\"\n         >&nbsp;</li>\n    </ul>\n  "
            },] },
];
/** @nocollapse */
KendoSliderTicksComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] },] },
]; };
KendoSliderTicksComponent.propDecorators = {
    'tickClick': [{ type: Output },],
    'vertical': [{ type: Input },],
    'ticksCount': [{ type: Input },],
    'title': [{ type: Input },],
    'step': [{ type: Input },],
    'container': [{ type: ViewChild, args: ['container',] },],
    'tickElements': [{ type: ViewChildren, args: ['tickElement',] },],
};
