"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Observable_1 = require("rxjs/Observable");
var Subscription_1 = require("rxjs/Subscription");
var kendo_inputs_common_1 = require("@telerik/kendo-inputs-common");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var enums_1 = require("../common/enums");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/observable/interval");
require("rxjs/add/observable/merge");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/concatMap");
require("rxjs/add/operator/startWith");
require("rxjs/add/operator/takeUntil");
/**
 * Represents the Kendo UI Slider component for Angular.
 */
var SliderComponent = (function () {
    function SliderComponent(el, rtl) {
        var _this = this;
        this.rtl = rtl;
        /**
         * Sets the title of the **Increase** button of the Slider.
         */
        this.incrementTitle = 'increment';
        /**
         * Sets the title of the **Decrease** button of the Slider.
         */
        this.decrementTitle = 'decrement';
        /**
         * Makes the Slider side arrow buttons appear. When set to `false`, the buttons are not displayed.
         */
        this.showButtons = true;
        /**
         * Denotes the location of the tick marks in the Slider.
         *
         * The available options are:
         *   * `before`&mdash;Tick marks are located to the top side of the horizontal track or to the left side of a vertical track.
         *   * `after`&mdash;Tick marks are located to the bottom side of the horizontal track or to the right side of the vertical track.
         *   * `both`&mdash;Tick marks are located on both sides of the track.
         *   * `none`&mdash;Tick marks are not visible. The actual elements are not added to the DOM tree.
         */
        this.tickPlacement = 'both';
        /**
         * Defines the title of the ticks. The default title for each tick is its Slider value.
         * If a callback function is used, it accepts an argument holding the value of the component and returns a string with the new title.
         */
        this.title = kendo_inputs_common_1.SliderUtil.identity;
        /**
         * Changes the title attribute of the drag handle, so it can be localized.
         */
        this.dragHandleTitle = 'Drag';
        /**
         * If set to `true`, it changes the orientation of the Slider from horizontal to vertical.
         */
        this.vertical = false;
        /**
         * The minimum value of the Slider. The attribute accepts both integers and floating-point numbers.
         */
        this.min = 0;
        /**
         * The maximum value of the Slider. The attribute accepts both integers and floating-point numbers.
         */
        this.max = 10;
        /**
         * The step value of the Slider. The attribute accepts only positive numbers. Can be both integer or a float number.
         */
        this.smallStep = 1;
        /**
         * If set to `true`, it disables the Slider.
         */
        this.disabled = false;
        /**
         * The current value of the Slider when initially displayed.
         * The component can use either the `value` binging or `NgModel`, but not both of them at the same time.
         */
        this.value = 0;
        /**
         * Fires each time the user selects a new value.
         */
        this.valueChange = new core_1.EventEmitter();
        this.dragging = false;
        this.decreaseButtonSubscription = Subscription_1.Subscription.EMPTY;
        this.increaseButtonSubscription = Subscription_1.Subscription.EMPTY;
        /**
         * @hidden
         */
        this.ifEnabled = function (callback, event) {
            if (!_this.disabled) {
                callback.call(_this, event);
            }
        };
        this.ngChange = function (_) { };
        this.ngTouched = function () { };
        this.decreaseValue = function () {
            _this.changeValue(kendo_inputs_common_1.SliderUtil.decreaseValueToStep(_this.getProps()));
        };
        this.increaseValue = function () {
            _this.changeValue(kendo_inputs_common_1.SliderUtil.increaseValueToStep(_this.getProps()));
        };
        this.direction = rtl ? 'rtl' : 'ltr';
        this.wrapper = el.nativeElement;
    }
    Object.defineProperty(SliderComponent.prototype, "horizontalClass", {
        get: function () {
            return !this.vertical;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "verticalClass", {
        get: function () {
            return this.vertical;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "sliderClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "transitionsClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "widgetClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "stateDefaultClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "topLeftClass", {
        get: function () {
            return this.tickPlacement === 'before';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "bottomRightClass", {
        get: function () {
            return this.tickPlacement === 'after';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "disabledClass", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "tabIndex", {
        get: function () {
            return this.disabled ? undefined : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "ariaDisabled", {
        get: function () {
            return this.disabled ? true : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "ariaMin", {
        get: function () {
            return this.min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "ariaMax", {
        get: function () {
            return this.max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "ariaValue", {
        get: function () {
            return this.value ? this.value : this.min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "reverse", {
        get: function () {
            return this.rtl && !this.vertical;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "keyBinding", {
        get: function () {
            var reverse = this.reverse;
            var increment = function (_a) {
                var value = _a.value, smallStep = _a.smallStep;
                return value + smallStep;
            };
            var decrement = function (_a) {
                var value = _a.value, smallStep = _a.smallStep;
                return value - smallStep;
            };
            return _a = {},
                _a[enums_1.Keys.left] = reverse ? increment : decrement,
                _a[enums_1.Keys.right] = reverse ? decrement : increment,
                _a[enums_1.Keys.down] = decrement,
                _a[enums_1.Keys.up] = increment,
                _a[enums_1.Keys.home] = function (_a) {
                    var min = _a.min;
                    return min;
                },
                _a[enums_1.Keys.end] = function (_a) {
                    var max = _a.max;
                    return max;
                },
                _a;
            var _a;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     * Called when the status of the component changes to or from `disabled`.
     * Depending on the value, it enables or disables the appropriate DOM element.
     *
     * @param isDisabled
     */
    SliderComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @hidden
     */
    SliderComponent.prototype.active = function () {
        this.draghandle.nativeElement.focus();
    };
    /**
     * @hidden
     */
    SliderComponent.prototype.keydown = function (event) {
        this.onKeyDown(event);
    };
    /**
     * @hidden
     */
    SliderComponent.prototype.blur = function () {
        this.ngTouched();
    };
    SliderComponent.prototype.ngOnChanges = function (_) {
        this.ticksCount = kendo_inputs_common_1.SliderUtil.calculateTicksCount(this.max, this.min, this.smallStep);
    };
    SliderComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!this.isDocumentAvailable()) {
            return;
        }
        if (this.showButtons) {
            var incAction = this.reverse ? function () { return _this.decreaseValue(); } : function () { return _this.increaseValue(); };
            var decAction = this.reverse ? function () { return _this.increaseValue(); } : function () { return _this.decreaseValue(); };
            this.increaseButtonSubscription = this.setValueChangeInterval(this.increaseButton.nativeElement, incAction);
            this.decreaseButtonSubscription = this.setValueChangeInterval(this.decreaseButton.nativeElement, decAction);
        }
        this.sizeComponent(false);
        if (this.ticks) {
            this.ticks.tickElements
                .changes
                .subscribe(function () { return _this.sizeComponent(false); });
        }
    };
    SliderComponent.prototype.ngOnDestroy = function () {
        this.decreaseButtonSubscription.unsubscribe();
        this.increaseButtonSubscription.unsubscribe();
    };
    SliderComponent.prototype.onTickClick = function (event) {
        var ticks = this.ticks.tickElements.map(function (element) { return element.nativeElement; });
        var index = ticks.indexOf(event.target);
        this.changeValue(kendo_inputs_common_1.SliderUtil.calculateValueFromTick(index, this.getProps()));
    };
    /**
     * @hidden
     */
    SliderComponent.prototype.onTrackClick = function (event) {
        var trackClientRect = event.currentTarget.getBoundingClientRect();
        this.changeValue(kendo_inputs_common_1.SliderUtil.calculateValueFromTrack(trackClientRect, event, this.getProps()));
    };
    SliderComponent.prototype.onIncrement = function () {
        this.increaseValue();
    };
    SliderComponent.prototype.onDecrement = function () {
        this.decreaseValue();
    };
    SliderComponent.prototype.isDocumentAvailable = function () {
        return typeof document !== 'undefined';
    };
    /**
     * @hidden
     */
    SliderComponent.prototype.onHandleDrag = function (event) {
        this.dragging = true;
        var element = this.track.nativeElement.getBoundingClientRect();
        this.changeValue(kendo_inputs_common_1.SliderUtil.calculateValueFromTrack(element, event, this.getProps()));
    };
    /**
     * @hidden
     */
    SliderComponent.prototype.onKeyDown = function (e) {
        var options = this.getProps();
        var disabled = options.disabled, max = options.max, min = options.min;
        var handler = this.keyBinding[e.keyCode];
        if (handler && !disabled) {
            var value = handler(options);
            this.changeValue(kendo_inputs_common_1.SliderUtil.trimValue(max, min, value));
            e.preventDefault();
        }
    };
    /**
     * @hidden
     */
    SliderComponent.prototype.onHandleRelease = function () {
        this.dragging = false; //needed for animation
    };
    //ngModel binding
    /**
     * @hidden
     */
    SliderComponent.prototype.writeValue = function (value) {
        this.value = value;
        this.sizeComponent(true);
    };
    /**
     * @hidden
     */
    SliderComponent.prototype.registerOnChange = function (fn) {
        this.ngChange = fn;
    };
    /**
     * @hidden
     */
    SliderComponent.prototype.registerOnTouched = function (fn) {
        this.ngTouched = fn;
    };
    /**
     * @hidden
     */
    SliderComponent.prototype.changeValue = function (value) {
        this.value = value;
        this.ngChange(value);
        this.valueChange.emit(value);
        this.sizeComponent(true);
    };
    /**
     * @hidden
     */
    SliderComponent.prototype.sizeComponent = function (animate) {
        if (!this.isDocumentAvailable()) {
            return;
        }
        var wrapper = this.wrapper.children[0];
        var props = this.getProps();
        var model = new kendo_inputs_common_1.SliderModel(props, wrapper, this.track.nativeElement);
        model.resizeTrack();
        if (this.ticks) {
            model.resizeTicks(this.ticks.container.nativeElement, this.ticks.tickElements.map(function (element) { return element.nativeElement; }));
        }
        this.handleAnimation(animate); //first time the widget is initialized the selection should not be animated
        model.positionHandle(this.draghandle.nativeElement);
        model.positionSelection(this.draghandle.nativeElement, this.sliderSelection.nativeElement);
        if (this.fixedTickWidth) {
            model.resizeWrapper();
        }
    };
    SliderComponent.prototype.setValueChangeInterval = function (element, callback) {
        var _this = this;
        var mousedown = Observable_1.Observable.fromEvent(element, 'mousedown');
        var mouseup = Observable_1.Observable.fromEvent(element, 'mouseup');
        var mouseout = Observable_1.Observable.fromEvent(element, 'mouseout');
        var subscription = mousedown
            .filter(function (e) { return e.button === 0; })
            .filter(function () { return !_this.disabled; })
            .concatMap(function () {
            return Observable_1.Observable.interval(150)
                .startWith(-1)
                .takeUntil(Observable_1.Observable.merge(mouseup, mouseout));
        })
            .subscribe(function () { return callback(); });
        return subscription;
    };
    SliderComponent.prototype.handleAnimation = function (animate) {
        var transition = '';
        if (!animate) {
            transition = 'none';
        }
        this.draghandle.nativeElement.style.transition = transition;
        this.sliderSelection.nativeElement.style.transition = transition;
    };
    SliderComponent.prototype.getProps = function () {
        return {
            buttons: this.showButtons,
            disabled: this.disabled,
            fixedTickWidth: this.fixedTickWidth,
            max: this.max,
            min: this.min,
            reverse: this.reverse,
            smallStep: this.smallStep,
            value: kendo_inputs_common_1.SliderUtil.trimValue(this.max, this.min, this.value),
            vertical: this.vertical
        };
    };
    return SliderComponent;
}());
SliderComponent.decorators = [
    { type: core_1.Component, args: [{
                exportAs: 'kendoSlider',
                providers: [
                    { multi: true, provide: forms_1.NG_VALUE_ACCESSOR, useExisting: core_1.forwardRef(function () { return SliderComponent; }) } /* tslint:disable-line */
                ],
                selector: 'kendo-slider',
                template: "\n\n        <div [ngClass]=\"{'k-slider-wrap': true, 'k-slider-buttons': showButtons}\">\n            <a\n                #decreaseButton\n                *ngIf=\"showButtons\"\n                class=\"k-button k-button-decrease\"\n                [title]=\"decrementTitle\"\n                [attr.aria-label]=\"decrementTitle\"\n            >\n                <span\n                    [class.k-icon]=\"true\"\n                    [class.k-i-arrow-w]=\"!vertical\"\n                    [class.k-i-arrow-s]=\"vertical\"\n                >\n                </span>\n            </a>\n            <a\n                *ngIf=\"showButtons\"\n                #increaseButton\n                class=\"k-button k-button-increase\"\n                [title]=\"incrementTitle\"\n                [attr.aria-label]=\"incrementTitle\"\n            >\n                <span\n                    [class.k-icon]=\"true\"\n                    [class.k-i-arrow-e]=\"!vertical\"\n                    [class.k-i-arrow-n]=\"vertical\"\n                >\n                </span>\n            </a>\n            <kendo-slider-ticks\n                #ticks\n                *ngIf=\"tickPlacement !== 'none'\"\n                [title]=\"title\"\n                [vertical]=\"vertical\"\n                [ticksCount]=\"ticksCount\"\n                [step]=\"smallStep\"\n                (tickClick)=\"ifEnabled(onTickClick, $event)\"\n            >\n            </kendo-slider-ticks>\n        <div #track\n            class=\"k-slider-track\"\n            (click)=\"ifEnabled(onTrackClick, $event)\">\n            <div #sliderSelection\n                [class.k-slider-selection]=\"true\"\n                [class.k-pressed]=\"dragging\"\n                >\n            </div>\n                <a #draghandle\n                    [class.k-draghandle]=\"true\"\n                    [class.k-pressed]=\"dragging\"\n                    [title]=\"dragHandleTitle\"\n                    kendoDraggable\n                    (kendoDrag)=\"ifEnabled(onHandleDrag ,$event)\"\n                    (kendoRelease)=\"ifEnabled(onHandleRelease, $event)\"\n                >Drag</a>\n            </div>\n\n            <kendo-resize-sensor (resize)=\"sizeComponent(false)\"></kendo-resize-sensor>\n        </div>\n\n  "
            },] },
];
/** @nocollapse */
SliderComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [kendo_angular_l10n_1.RTL,] },] },
]; };
SliderComponent.propDecorators = {
    'incrementTitle': [{ type: core_1.Input },],
    'decrementTitle': [{ type: core_1.Input },],
    'showButtons': [{ type: core_1.Input },],
    'tickPlacement': [{ type: core_1.Input },],
    'title': [{ type: core_1.Input },],
    'dragHandleTitle': [{ type: core_1.Input },],
    'vertical': [{ type: core_1.Input },],
    'min': [{ type: core_1.Input },],
    'max': [{ type: core_1.Input },],
    'smallStep': [{ type: core_1.Input },],
    'fixedTickWidth': [{ type: core_1.Input },],
    'disabled': [{ type: core_1.Input },],
    'value': [{ type: core_1.Input },],
    'valueChange': [{ type: core_1.Output },],
    'track': [{ type: core_1.ViewChild, args: ['track',] },],
    'draghandle': [{ type: core_1.ViewChild, args: ['draghandle',] },],
    'sliderSelection': [{ type: core_1.ViewChild, args: ['sliderSelection',] },],
    'ticks': [{ type: core_1.ViewChild, args: ['ticks',] },],
    'decreaseButton': [{ type: core_1.ViewChild, args: ['decreaseButton',] },],
    'increaseButton': [{ type: core_1.ViewChild, args: ['increaseButton',] },],
    'direction': [{ type: core_1.HostBinding, args: ['attr.dir',] },],
    'horizontalClass': [{ type: core_1.HostBinding, args: ['class.k-slider-horizontal',] },],
    'verticalClass': [{ type: core_1.HostBinding, args: ['class.k-slider-vertical',] },],
    'sliderClass': [{ type: core_1.HostBinding, args: ['class.k-slider',] },],
    'transitionsClass': [{ type: core_1.HostBinding, args: ['class.k-slider-transitions',] },],
    'widgetClass': [{ type: core_1.HostBinding, args: ['class.k-widget',] },],
    'stateDefaultClass': [{ type: core_1.HostBinding, args: ['class.k-state-default',] },],
    'topLeftClass': [{ type: core_1.HostBinding, args: ['class.k-slider-topleft',] },],
    'bottomRightClass': [{ type: core_1.HostBinding, args: ['class.k-slider-bottomright',] },],
    'disabledClass': [{ type: core_1.HostBinding, args: ['class.k-state-disabled',] },],
    'tabIndex': [{ type: core_1.HostBinding, args: ['tabIndex',] },],
    'ariaDisabled': [{ type: core_1.HostBinding, args: ['attr.aria-disabled',] },],
    'ariaMin': [{ type: core_1.HostBinding, args: ['attr.aria-valuemin',] },],
    'ariaMax': [{ type: core_1.HostBinding, args: ['attr.aria-valuemax',] },],
    'ariaValue': [{ type: core_1.HostBinding, args: ['attr.aria-valuenow',] },],
    'active': [{ type: core_1.HostListener, args: ['click',] }, { type: core_1.HostListener, args: ['focus',] },],
    'keydown': [{ type: core_1.HostListener, args: ['keydown', ['$event'],] },],
    'blur': [{ type: core_1.HostListener, args: ['blur',] },],
};
exports.SliderComponent = SliderComponent;
