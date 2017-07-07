"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
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
        this.tickClick = new core_1.EventEmitter();
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
KendoSliderTicksComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'kendo-slider-ticks',
                template: "\n    <ul #container class=\"k-reset k-slider-items\">\n        <li #tickElement *ngFor=\"let tick of ticks\"\n            [ngClass]=\"tickClasses(tick)\"\n            title=\"{{title(tick.index * step)}}\"\n            (click)=\"onClick($event)\"\n            role=\"presentation\"\n         >&nbsp;</li>\n    </ul>\n  "
            },] },
];
/** @nocollapse */
KendoSliderTicksComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [kendo_angular_l10n_1.RTL,] },] },
]; };
KendoSliderTicksComponent.propDecorators = {
    'tickClick': [{ type: core_1.Output },],
    'vertical': [{ type: core_1.Input },],
    'ticksCount': [{ type: core_1.Input },],
    'title': [{ type: core_1.Input },],
    'step': [{ type: core_1.Input },],
    'container': [{ type: core_1.ViewChild, args: ['container',] },],
    'tickElements': [{ type: core_1.ViewChildren, args: ['tickElement',] },],
};
exports.KendoSliderTicksComponent = KendoSliderTicksComponent;
