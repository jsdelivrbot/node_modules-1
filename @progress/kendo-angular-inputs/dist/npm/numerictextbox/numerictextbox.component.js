"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var enums_1 = require("../common/enums");
var max_validator_1 = require("../validators/max.validator");
var min_validator_1 = require("../validators/min.validator");
var forms_1 = require("@angular/forms");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var constants_1 = require("./constants");
var utils_1 = require("./utils");
var arrow_direction_1 = require("./arrow-direction");
/**
 * Represents the Kendo UI NumericTextBox component for Angular.
 */
var NumericTextBoxComponent = (function () {
    function NumericTextBoxComponent(intl, renderer, localizationService, rtl) {
        this.intl = intl;
        this.renderer = renderer;
        this.localizationService = localizationService;
        /**
         * Determines whether the component is disabled.
         */
        this.disabled = false;
        /**
         * Sets the title of the input element of the NumericTextBox.
         */
        this.title = '';
        /**
         * Specifies whether the value will be auto-corrected based on the min and max values.
         */
        this.autoCorrect = false;
        /**
         * Specifies the number of decimals that the user can enter when the input is focused.
         */
        this.decimals = null;
        /**
         * Specifies the value used to increment or decrement the component value.
         */
        this.step = 1;
        /**
         * Specifies whether the **Up** and **Down** spin buttons should be rendered.
         */
        this.spinners = true;
        /**
         * Determines whether the built-in min or max validators are enforced when validating a form.
         *
         * > The Angular 4.2.0 version introduces the `min` and `max` validation directives. As a result, even if you set `rangeValidation`
         * to `false`, the built-in Angular validators will be executed.
         */
        this.rangeValidation = true; //TODO: test
        /**
         * Sets or gets the `tabIndex` property of the NumericTextBox.
         * Based on the [HTML tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) behavior,
         * it determines whether the component is focusable.
         * .
         */
        this.tabIndex = 0;
        /**
         * Specifies the value of the NumericTextBox component.
         */
        this.value = null;
        /**
         * Fires each time the user selects a new value.
         */
        this.valueChange = new core_1.EventEmitter();
        /**
         * Fires each time the user focuses the input element.
         */
        this.onFocus = new core_1.EventEmitter(); //tslint:disable-line:no-output-rename
        //TODO: test
        /**
         * Fires each time the input element gets blurred.
         */
        this.onBlur = new core_1.EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * @hidden
         */
        this.focused = false;
        /**
         * @hidden
         */
        this.ArrowDirection = arrow_direction_1.ArrowDirection;
        /**
         * @hidden
         */
        this.arrowDirection = arrow_direction_1.ArrowDirection.None;
        this.inputValue = '';
        this.minValidateFn = utils_1.noop;
        this.maxValidateFn = utils_1.noop;
        this._format = "n2";
        //TODO: disable tslint and move those to the constructor level
        this.ngChange = function (_) { };
        this.ngTouched = function () { };
        this.direction = rtl ? 'rtl' : 'ltr';
    }
    Object.defineProperty(NumericTextBoxComponent.prototype, "format", {
        /**
         * Specifies the number format which is used when the component is not focused.
         * If set to `null` or `undefined`, the default format will be used.
         */
        get: function () {
            var format = this._format;
            return format !== null && format !== undefined ? format : 'n2';
        },
        set: function (value) {
            this._format = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericTextBoxComponent.prototype, "widgetClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.arrowPress = function (direction, e) {
        e.preventDefault();
        if (!this.disabled) {
            this.focused = true;
            this.focus();
            this.arrowDirection = direction;
            if (this.step) {
                this.spin(direction, constants_1.INITIAL_SPIN_DELAY);
            }
            else {
                this.setInputValue();
            }
        }
    };
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.releaseArrow = function () {
        clearTimeout(this.spinTimeout);
        this.arrowDirection = arrow_direction_1.ArrowDirection.None;
    };
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.ngOnChanges = function (changes) {
        this.verifySettings();
        if (utils_1.anyChanged(['min', 'max', 'rangeValidation'], changes)) {
            this.minValidateFn = this.rangeValidation ? min_validator_1.createMinValidator(this.min) : utils_1.noop;
            this.maxValidateFn = this.rangeValidation ? max_validator_1.createMaxValidator(this.max) : utils_1.noop;
        }
        if (utils_1.anyChanged(['autoCorrect', 'decimals', 'min'], changes)) {
            delete this.numericRegex;
        }
        if (utils_1.anyChanged(['value', 'format'], changes)) {
            this.value = this.restrictModelValue(this.value);
            this.setInputValue();
        }
    };
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.ngOnDestroy = function () {
        clearTimeout(this.spinTimeout);
    };
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.validate = function (control) {
        return this.minValidateFn(control) || this.maxValidateFn(control);
    };
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.writeValue = function (value) {
        var restrictedValue = this.restrictModelValue(value);
        this.value = restrictedValue;
        this.setInputValue();
    };
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.registerOnChange = function (fn) {
        this.ngChange = fn;
    };
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.registerOnTouched = function (fn) {
        this.ngTouched = fn;
    };
    /**
     * @hidden
     * Called when the status of the component changes to or from `disabled`.
     * Depending on the value, it enables or disables the appropriate DOM element.
     *
     * @param isDisabled
     */
    NumericTextBoxComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * Focuses the NumericTextBox component.
     *
     * @example
     * ```ts
     * @@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="numerictextbox.focus()">Focus NumericTextBox</button>
     *  <kendo-numerictextbox #numerictextbox></kendo-numerictextbox>
     * `
     * })
     * class AppComponent { }
     * ```
     */
    NumericTextBoxComponent.prototype.focus = function () {
        if (!this.numericInput) {
            return;
        }
        this.renderer.invokeElementMethod(this.numericInput.nativeElement, "focus");
    };
    /**
     * Blurs the NumericTextBox component.
     */
    NumericTextBoxComponent.prototype.blur = function () {
        if (!this.numericInput) {
            return;
        }
        this.renderer.invokeElementMethod(this.numericInput.nativeElement, "blur");
    };
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.handleInput = function () {
        var input = this.numericInput.nativeElement;
        var selectionStart = input.selectionStart, selectionEnd = input.selectionEnd, inputValue = input.value;
        var valid = this.isValid(inputValue);
        if (!valid) {
            input.value = this.inputValue;
            this.setSelection(selectionStart - 1, selectionEnd - 1);
            return;
        }
        var parsedValue = this.intl.parseNumber(inputValue);
        var value = this.restrictDecimals(parsedValue);
        if (this.autoCorrect) {
            value = this.limitValue(value);
        }
        if (parsedValue !== value) {
            this.setInputValue(value);
            this.setSelection(selectionStart, selectionEnd);
        }
        else {
            this.inputValue = inputValue;
        }
        this.updateValue(value);
    };
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.handleFocus = function () {
        var _this = this;
        if (!this.focused) {
            this.focused = true;
            this.setInputValue();
            setTimeout(function () {
                _this.setSelection(0, _this.inputValue.length);
            }, 0); /* tslint:disable-line  align */
        }
        this.onFocus.emit();
    };
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.handleBlur = function () {
        this.focused = false;
        this.ngTouched();
        this.setInputValue();
        this.onBlur.emit();
    };
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.handleKeyDown = function (e) {
        if (this.disabled) {
            return;
        }
        var step;
        if (e.keyCode === enums_1.Keys.down) {
            step = -1;
        }
        else if (e.keyCode === enums_1.Keys.up) {
            step = 1;
        }
        if (step && this.step) {
            e.preventDefault();
            this.addStep(step);
        }
    };
    Object.defineProperty(NumericTextBoxComponent.prototype, "incrementTitle", {
        /**
         * @hidden
         */
        get: function () {
            return this.localizationService.get('increment');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericTextBoxComponent.prototype, "decrementTitle", {
        /**
         * @hidden
         */
        get: function () {
            return this.localizationService.get('decrement');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericTextBoxComponent.prototype, "decimalSeparator", {
        get: function () {
            var numberSymbols = this.intl.numberSymbols();
            return numberSymbols.decimal;
        },
        enumerable: true,
        configurable: true
    });
    NumericTextBoxComponent.prototype.isValid = function (value) {
        if (!this.numericRegex) {
            this.numericRegex = utils_1.numericRegex({
                autoCorrect: this.autoCorrect,
                decimals: this.decimals,
                min: this.min,
                separator: this.decimalSeparator
            });
        }
        return this.numericRegex.test(value);
    };
    NumericTextBoxComponent.prototype.spin = function (step, timeout) {
        var _this = this;
        clearTimeout(this.spinTimeout);
        this.spinTimeout = setTimeout(function () {
            _this.spin(step, constants_1.SPIN_DELAY);
        }, timeout); /* tslint:disable-line  align */
        this.addStep(step);
    };
    NumericTextBoxComponent.prototype.addStep = function (step) {
        var value = utils_1.addValues(this.value || 0, this.step * step);
        value = this.limitValue(value);
        value = this.restrictDecimals(value);
        this.setInputValue(value);
        this.updateValue(value);
    };
    NumericTextBoxComponent.prototype.setSelection = function (start, end) {
        this.renderer.invokeElementMethod(this.numericInput.nativeElement, "setSelectionRange", [start, end]);
    };
    NumericTextBoxComponent.prototype.limitValue = function (value) {
        var result = value;
        if (value !== null) {
            if (utils_1.defined(this.max) && value > this.max) {
                result = this.max;
            }
            if (utils_1.defined(this.min) && value < this.min) {
                result = this.min;
            }
        }
        return result;
    };
    NumericTextBoxComponent.prototype.restrictModelValue = function (value) {
        var result = this.restrictDecimals(value, true);
        if (this.autoCorrect && this.limitValue(result) !== result) {
            result = null;
        }
        return result;
    };
    NumericTextBoxComponent.prototype.restrictDecimals = function (value, round) {
        var decimals = this.decimals;
        var result = value;
        if (value && decimals !== null && decimals >= 0) {
            if (round) {
                result = parseFloat(value.toFixed(Math.min(decimals, constants_1.MAX_PRECISION)));
            }
            else {
                var parts = String(value).split(constants_1.POINT);
                var fraction = parts[1];
                if (fraction && fraction.length > decimals) {
                    fraction = fraction.substr(0, decimals);
                    result = parseFloat("" + parts[0] + constants_1.POINT + fraction);
                }
            }
        }
        return result;
    };
    NumericTextBoxComponent.prototype.formatInputValue = function (value) {
        return String(value).replace(constants_1.POINT, this.decimalSeparator);
    };
    NumericTextBoxComponent.prototype.formatValue = function (value) {
        var formattedValue;
        if (value === null || !utils_1.defined(value) || value === '') {
            formattedValue = '';
        }
        else if (this.focused) {
            formattedValue = this.formatInputValue(value);
        }
        else {
            formattedValue = this.intl.formatNumber(value, this.format);
        }
        return formattedValue;
    };
    NumericTextBoxComponent.prototype.setInputValue = function (value) {
        if (value === void 0) { value = this.value; }
        var formattedValue = this.formatValue(value);
        this.renderer.setElementProperty(this.numericInput.nativeElement, "value", formattedValue);
        this.inputValue = formattedValue;
    };
    NumericTextBoxComponent.prototype.updateValue = function (candidate) {
        if (candidate === this.value) {
            return;
        }
        this.value = candidate;
        this.ngChange(candidate);
        this.valueChange.emit(candidate);
    };
    NumericTextBoxComponent.prototype.verifySettings = function () {
        if (!core_1.isDevMode()) {
            return;
        }
        if (this.min !== null && this.max !== null && this.min > this.max) {
            throw new Error("The max value should be bigger than the min. See " + constants_1.MIN_DOC_LINK + " and " + constants_1.MAX_DOC_LINK + ".");
        }
    };
    return NumericTextBoxComponent;
}());
NumericTextBoxComponent.decorators = [
    { type: core_1.Component, args: [{
                exportAs: 'kendoNumericTextBox',
                providers: [
                    kendo_angular_l10n_1.LocalizationService,
                    { provide: kendo_angular_l10n_1.L10N_PREFIX, useValue: 'kendo.numerictextbox' },
                    { provide: forms_1.NG_VALUE_ACCESSOR, useExisting: core_1.forwardRef(function () { return NumericTextBoxComponent; }), multi: true },
                    { provide: forms_1.NG_VALIDATORS, useExisting: core_1.forwardRef(function () { return NumericTextBoxComponent; }), multi: true } /* tslint:disable-line */
                ],
                selector: 'kendo-numerictextbox',
                template: "\n        <ng-container kendoNumericTextBoxLocalizedMessages\n            i18n-increment=\"kendo.numerictextbox.increment|The title for the **Increment** button in the NumericTextBox\"\n            increment=\"Increase value\"\n            i18n-decrement=\"kendo.numerictextbox.decrement|The title for the **Decrement** button in the NumericTextBox\"\n            decrement=\"Decrease value\"\n        >\n        </ng-container>\n        <span class=\"k-numeric-wrap\" [class.k-state-disabled]=\"disabled\" [class.k-state-focused]=\"focused\">\n            <input\n            role=\"spinbutton\"\n            [attr.aria-valuemin]=\"min\"\n            [attr.aria-valuemax]=\"max\"\n            [attr.aria-valuenow]=\"value\"\n            [attr.title]=\"title\"\n            [attr.placeholder]=\"placeholder\"\n            [tabindex]=\"tabIndex\"\n            class=\"k-input\"\n            [class.k-formatted-value]=\"!focused\"\n            [disabled]=\"disabled\"\n            (input)=\"handleInput()\"\n            (focus)=\"handleFocus()\"\n            (blur)=\"handleBlur()\"\n            (keydown)=\"handleKeyDown($event)\"\n            #numericInput />\n            <span class=\"k-select\" *ngIf=\"spinners\" (mouseup)=\"releaseArrow()\">\n                <span\n                    (mousedown)=\"arrowPress(ArrowDirection.Up, $event)\"\n                    (mouseleave)=\"releaseArrow()\"\n                    [attr.aria-label]=\"incrementTitle\"\n                    [title]=\"incrementTitle\"\n                    [class.k-state-active]=\"arrowDirection === ArrowDirection.Up\"\n                    class=\"k-link k-link-increase\"\n                >\n                    <span class=\"k-icon k-i-arrow-n\"></span>\n                </span>\n                <span\n                    (mousedown)=\"arrowPress(ArrowDirection.Down, $event)\"\n                    (mouseleave)=\"releaseArrow()\"\n                    [attr.aria-label]=\"decrementTitle\"\n                    [title]=\"decrementTitle\"\n                    [class.k-state-active]=\"arrowDirection === ArrowDirection.Down\"\n                    class=\"k-link k-link-decrease\"\n                >\n                    <span class=\"k-icon k-i-arrow-s\"></span>\n                </span>\n            </span>\n        </span>\n      "
            },] },
];
/** @nocollapse */
NumericTextBoxComponent.ctorParameters = function () { return [
    { type: kendo_angular_intl_1.IntlService, },
    { type: core_1.Renderer, },
    { type: kendo_angular_l10n_1.LocalizationService, },
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [kendo_angular_l10n_1.RTL,] },] },
]; };
NumericTextBoxComponent.propDecorators = {
    'disabled': [{ type: core_1.Input },],
    'title': [{ type: core_1.Input },],
    'autoCorrect': [{ type: core_1.Input },],
    'format': [{ type: core_1.Input },],
    'max': [{ type: core_1.Input },],
    'min': [{ type: core_1.Input },],
    'decimals': [{ type: core_1.Input },],
    'placeholder': [{ type: core_1.Input },],
    'step': [{ type: core_1.Input },],
    'spinners': [{ type: core_1.Input },],
    'rangeValidation': [{ type: core_1.Input },],
    'tabIndex': [{ type: core_1.Input },],
    'value': [{ type: core_1.Input },],
    'valueChange': [{ type: core_1.Output },],
    'onFocus': [{ type: core_1.Output, args: ['focus',] },],
    'onBlur': [{ type: core_1.Output, args: ['blur',] },],
    'numericInput': [{ type: core_1.ViewChild, args: ['numericInput',] },],
    'direction': [{ type: core_1.HostBinding, args: ['attr.dir',] },],
    'widgetClasses': [{ type: core_1.HostBinding, args: ['class.k-widget',] }, { type: core_1.HostBinding, args: ['class.k-numerictextbox',] },],
};
exports.NumericTextBoxComponent = NumericTextBoxComponent;
