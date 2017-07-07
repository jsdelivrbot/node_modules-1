"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var defaults_1 = require("../defaults");
var min_validator_1 = require("../validators/min.validator");
var max_validator_1 = require("../validators/max.validator");
var preventable_event_1 = require("../preventable-event");
var cell_template_directive_1 = require("../calendar/templates/cell-template.directive");
var util_1 = require("../util");
var MIN_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/DatePickerComponent/#toc-min';
var MAX_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/DatePickerComponent/#toc-max';
/**
 * Represents the Kendo UI DatePicker component for Angular.
 */
var DatePickerComponent = (function () {
    //
    function DatePickerComponent(zone, localization, popupService, rtl) {
        this.zone = zone;
        this.localization = localization;
        this.popupService = popupService;
        this.rtl = rtl;
        /**
         * Sets or gets the `disabled` property of the Calendar and determines whether the component is active.
         */
        this.disabled = false;
        /**
         * Specifies the smallest valid date.
         */
        this.min = kendo_date_math_1.cloneDate(defaults_1.MIN_DATE);
        /**
         * Specifies the biggest valid date.
         */
        this.max = kendo_date_math_1.cloneDate(defaults_1.MAX_DATE);
        /**
         * Specifies the focused date of the Calendar component.
         */
        this.focusedDate = null;
        /**
         * Specifies the value of the DatePicker component.
         */
        this.value = null;
        /**
         * Specifies the date format used to display the input value.
         */
        this.format = "d";
        /**
         * Sets or gets the `tabIndex` property of the DatePicker.
         */
        this.tabIndex = 0;
        /**
         * Sets the title of the input element of the DatePicker.
         */
        this.title = "";
        /**
         * Determines whether the built-in min or max validators are enforced when validating a form.
         */
        this.rangeValidation = true;
        /**
         * Fires each time the user selects a new value.
         */
        this.valueChange = new core_1.EventEmitter();
        /**
         * Fires each time the user focuses the input element.
         *
         * @example
         * ```ts
         * @@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-datepicker (focus)="handleFocus()"></kendo-datepicker>
         * `
         * })
         * class AppComponent {
         *   public handleFocus(): void {
         *      console.log("Component is focused");
         *   }
         * }
         * ```
         *
         * > To wire the event programmatically, use the `onFocus` property.
         */
        this.onFocus = new core_1.EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the input element gets blurred.
         *
         * @example
         * ```ts
         * @@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-datepicker (blur)="handleBlur()"></kendo-datepicker>
         * `
         * })
         * class AppComponent {
         *   public handleBlur(): void {
         *      console.log("Component is blurred");
         *   }
         * }
         * ```
         *
         * > To wire the event programmatically, use the `onBlur` property.
         */
        this.onBlur = new core_1.EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the popup is about to open.
         * This event is preventable. If you cancel the event, the popup will remain closed.
         */
        this.open = new core_1.EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel the event, the popup will remain opened.
         */
        this.close = new core_1.EventEmitter();
        this.isActive = false;
        this.popupUID = util_1.guid();
        this._popupSettings = { animate: true };
        this._show = false;
        this.onChange = util_1.noop;
        this.onTouched = util_1.noop;
        this.minValidateFn = util_1.noop;
        this.maxValidateFn = util_1.noop;
    }
    Object.defineProperty(DatePickerComponent.prototype, "popupSettings", {
        get: function () {
            return this._popupSettings;
        },
        /**
         * Configures the popup of the DatePicker.
         *
         * The available options are:
         * - `animation: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
         * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
         */
        set: function (settings) {
            this._popupSettings = Object.assign({}, { animate: true }, settings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "show", {
        get: function () {
            return this._show;
        },
        set: function (show) {
            var event = new preventable_event_1.PreventableEvent();
            if (!this._show && show) {
                this.open.emit(event);
            }
            else if (this._show && !show) {
                this.close.emit(event);
            }
            if (event.isDefaultPrevented()) {
                return;
            }
            this._toggle(show);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DatePickerComponent.prototype.wrapperClasses = function () {
        return true;
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.handleKeydown = function (event) {
        var altKey = event.altKey, keyCode = event.keyCode;
        if (keyCode === 27) {
            this.show = false;
        }
        if (altKey) {
            if (keyCode === 40) {
                this.show = true;
            }
            if (keyCode === 38) {
                this.show = false;
            }
        }
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.ngOnChanges = function (changes) {
        this.verifySettings();
        if (changes.min || changes.max) {
            this.minValidateFn = this.rangeValidation ? min_validator_1.minValidator(this.min) : util_1.noop;
            this.maxValidateFn = this.rangeValidation ? max_validator_1.maxValidator(this.max) : util_1.noop;
        }
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.ngOnDestroy = function () {
        this.show = false;
    };
    Object.defineProperty(DatePickerComponent.prototype, "isOpen", {
        /**
         * Returns the current open state of the popup.
         */
        get: function () {
            return this.show;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DatePickerComponent.prototype.writeValue = function (value) {
        this.value = kendo_date_math_1.cloneDate(value);
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.validate = function (control) {
        return this.minValidateFn(control) || this.maxValidateFn(control);
    };
    /**
     * Focuses the DatePicker component.
     *
     * @example
     * ```ts
     * @@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="datepicker.focus()">Focus date picker</button>
     *  <kendo-datepicker #datepicker></kendo-datepicker>
     * `
     * })
     * class AppComponent { }
     * ```
     */
    DatePickerComponent.prototype.focus = function () {
        this.input.focus();
    };
    /**
     * Blurs the DatePicker component.
     */
    DatePickerComponent.prototype.blur = function () {
        (this.calendar || this.input)['blur'](); //tslint:disable-line:no-string-literal
    };
    /**
     * Toggles the visibility of the popup. If you use the `toggle` method to show or hide the popup,
     * the `open` and `close` events are not fired.
     *
     * @param show - The state of the popup.
     */
    DatePickerComponent.prototype.toggle = function (show) {
        var _this = this;
        if (this.disabled) {
            return;
        }
        Promise.resolve(null).then(function () {
            _this._toggle((show === undefined) ? !_this.show : show);
        });
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.handleIconClick = function () {
        this.input.focus();
        this.show = !this.show;
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.handleChange = function (value) {
        this.value = value;
        this.input.focus();
        this.show = false;
        this.valueChange.emit(kendo_date_math_1.cloneDate(value));
        this.onChange(kendo_date_math_1.cloneDate(value));
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.handleFocus = function () {
        var _this = this;
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        this.nextTick(function () {
            if (!_this.hasActiveComponent()) {
                return;
            }
            _this.onFocus.emit();
        });
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.handleBlur = function () {
        var _this = this;
        this.nextTick(function () {
            if (_this.hasActiveComponent()) {
                return;
            }
            _this.isActive = false;
            _this.show = false;
            _this.onTouched();
            _this.onBlur.emit();
        });
    };
    Object.defineProperty(DatePickerComponent.prototype, "popupClasses", {
        /**
         * @hidden
         */
        get: function () {
            return [
                'k-calendar-container',
                'k-group',
                'k-reset'
            ].concat(this.popupSettings.popupClass || []);
        },
        enumerable: true,
        configurable: true
    });
    DatePickerComponent.prototype._toggle = function (show) {
        var _this = this;
        this._show = show;
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
        if (this._show) {
            var direction = this.rtl ? 'right' : 'left';
            this.popupRef = this.popupService.open({
                anchor: this.wrapper,
                anchorAlign: { vertical: 'bottom', horizontal: direction },
                animate: this.popupSettings.animate,
                content: this.popupTemplate,
                popupAlign: { vertical: 'top', horizontal: direction },
                popupClass: this.popupClasses
            });
            this.popupRef.popupElement.setAttribute('id', this.popupUID);
            this.popupRef.popupAnchorViewportLeave.subscribe(function () { return _this.show = false; });
            this.popupRef.popupOpen.subscribe(function () {
                if (_this.isActive && _this.calendar) {
                    _this.calendar.focus();
                }
            });
            this.popupRef.popupClose.subscribe(function () {
                if (_this.isActive) {
                    _this.input.focus();
                }
            });
        }
    };
    DatePickerComponent.prototype.hasActiveComponent = function () {
        return this.input.isActive || (this.calendar && this.calendar.isActive);
    };
    DatePickerComponent.prototype.verifySettings = function () {
        if (!core_1.isDevMode()) {
            return;
        }
        if (!util_1.isValidRange(this.min, this.max)) {
            throw new Error("The max value should be bigger than the min. See " + MIN_DOC_LINK + " and " + MAX_DOC_LINK + ".");
        }
    };
    DatePickerComponent.prototype.nextTick = function (f) {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            //use setTimeout instead of resolved promise
            //as the latter doesn't wait enough
            setTimeout(function () { return _this.zone.run(f); });
        });
    };
    return DatePickerComponent;
}());
DatePickerComponent.decorators = [
    { type: core_1.Component, args: [{
                exportAs: 'kendo-datepicker',
                providers: [
                    { provide: forms_1.NG_VALUE_ACCESSOR, useExisting: core_1.forwardRef(function () { return DatePickerComponent; }), multi: true },
                    { provide: forms_1.NG_VALIDATORS, useExisting: core_1.forwardRef(function () { return DatePickerComponent; }), multi: true },
                    kendo_angular_l10n_1.LocalizationService,
                    {
                        provide: kendo_angular_l10n_1.L10N_PREFIX,
                        useValue: 'kendo.datepicker'
                    }
                ],
                selector: 'kendo-datepicker',
                template: "\n        <ng-container kendoDatePickerLocalizedMessages\n            i18n-today=\"kendo.datepicker.today|The label for the today button in the calendar header\"\n            today=\"TODAY\"\n\n            i18n-toggle=\"kendo.datepicker.toggle|The label for the toggle button in the datepicker component\"\n            toggle=\"Toggle calendar\"\n        >\n        </ng-container>\n        <span #wrapper\n            class=\"k-picker-wrap k-state-default\"\n            [class.k-state-disabled]=\"disabled\"\n            [class.k-state-focused]=\"isActive\"\n        >\n            <kendo-dateinput\n                #input\n                hasPopup=\"true\"\n                [isPopupOpen]=\"show\"\n                [disabled]=\"disabled\"\n                [tabIndex]=\"!show ? tabIndex : -1\"\n                [title]=\"title\"\n                [format]=\"format\"\n                [min]=\"min\"\n                [max]=\"max\"\n                [value]=\"value\"\n                (valueChange)=\"handleChange($event)\"\n                (focus)=\"handleFocus()\"\n                (blur)=\"handleBlur()\"\n            ></kendo-dateinput>\n            <span class=\"k-select\"\n                role=\"button\"\n                [attr.title]=\"localization.get('toggle')\"\n                [attr.aria-label]=\"localization.get('toggle')\"\n                [attr.aria-controls]=\"popupUID\"\n                (mousedown)=\"$event.preventDefault()\"\n                (click)=\"handleIconClick()\"\n            >\n                <span class=\"k-icon k-i-calendar\"></span>\n            </span>\n        </span>\n        <ng-template #popupTemplate>\n            <kendo-calendar\n                #calendar\n                [cellTemplate]=\"cellTemplate\"\n                [min]=\"min\"\n                [max]=\"max\"\n                [focusedDate]=\"focusedDate\"\n                [value]=\"value\"\n                (valueChange)=\"handleChange($event)\"\n                (focus)=\"handleFocus()\"\n                (blur)=\"handleBlur()\"\n            >\n                <kendo-calendar-messages [today]=\"localization.get('today')\">\n                </kendo-calendar-messages>\n            </kendo-calendar>\n        <ng-template>\n    "
            },] },
];
/** @nocollapse */
DatePickerComponent.ctorParameters = function () { return [
    { type: core_1.NgZone, },
    { type: kendo_angular_l10n_1.LocalizationService, },
    { type: kendo_angular_popup_1.PopupService, },
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [kendo_angular_l10n_1.RTL,] },] },
]; };
DatePickerComponent.propDecorators = {
    'calendar': [{ type: core_1.ViewChild, args: ['calendar',] },],
    'input': [{ type: core_1.ViewChild, args: ['input',] },],
    'popupTemplate': [{ type: core_1.ViewChild, args: ['popupTemplate',] },],
    'wrapper': [{ type: core_1.ViewChild, args: ['wrapper',] },],
    'cellTemplate': [{ type: core_1.ContentChild, args: [cell_template_directive_1.CellTemplateDirective,] },],
    'disabled': [{ type: core_1.Input },],
    'popupSettings': [{ type: core_1.Input },],
    'min': [{ type: core_1.Input },],
    'max': [{ type: core_1.Input },],
    'focusedDate': [{ type: core_1.Input },],
    'value': [{ type: core_1.Input },],
    'format': [{ type: core_1.Input },],
    'tabIndex': [{ type: core_1.Input },],
    'title': [{ type: core_1.Input },],
    'rangeValidation': [{ type: core_1.Input },],
    'valueChange': [{ type: core_1.Output },],
    'onFocus': [{ type: core_1.Output, args: ['focus',] },],
    'onBlur': [{ type: core_1.Output, args: ['blur',] },],
    'open': [{ type: core_1.Output },],
    'close': [{ type: core_1.Output },],
    'wrapperClasses': [{ type: core_1.HostBinding, args: ['class.k-widget',] }, { type: core_1.HostBinding, args: ['class.k-datepicker',] }, { type: core_1.HostBinding, args: ['class.k-header',] },],
    'handleKeydown': [{ type: core_1.HostListener, args: ['keydown', ['$event'],] },],
};
exports.DatePickerComponent = DatePickerComponent;
