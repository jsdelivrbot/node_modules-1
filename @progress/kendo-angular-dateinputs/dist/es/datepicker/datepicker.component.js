import { Component, EventEmitter, HostBinding, HostListener, Input, Output, ContentChild, ViewChild, NgZone, Inject, Optional, forwardRef, isDevMode } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { L10N_PREFIX, LocalizationService, RTL } from '@progress/kendo-angular-l10n';
import { PopupService } from '@progress/kendo-angular-popup';
import { cloneDate } from '@progress/kendo-date-math';
import { MIN_DATE, MAX_DATE } from '../defaults';
import { minValidator } from '../validators/min.validator';
import { maxValidator } from '../validators/max.validator';
import { PreventableEvent } from '../preventable-event';
import { CellTemplateDirective } from '../calendar/templates/cell-template.directive';
import { guid, noop, isValidRange } from '../util';
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
        this.min = cloneDate(MIN_DATE);
        /**
         * Specifies the biggest valid date.
         */
        this.max = cloneDate(MAX_DATE);
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
        this.valueChange = new EventEmitter();
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
        this.onFocus = new EventEmitter(); //tslint:disable-line:no-output-rename
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
        this.onBlur = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the popup is about to open.
         * This event is preventable. If you cancel the event, the popup will remain closed.
         */
        this.open = new EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel the event, the popup will remain opened.
         */
        this.close = new EventEmitter();
        this.isActive = false;
        this.popupUID = guid();
        this._popupSettings = { animate: true };
        this._show = false;
        this.onChange = noop;
        this.onTouched = noop;
        this.minValidateFn = noop;
        this.maxValidateFn = noop;
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
            var event = new PreventableEvent();
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
            this.minValidateFn = this.rangeValidation ? minValidator(this.min) : noop;
            this.maxValidateFn = this.rangeValidation ? maxValidator(this.max) : noop;
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
        this.value = cloneDate(value);
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
        this.valueChange.emit(cloneDate(value));
        this.onChange(cloneDate(value));
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
        if (!isDevMode()) {
            return;
        }
        if (!isValidRange(this.min, this.max)) {
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
export { DatePickerComponent };
DatePickerComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendo-datepicker',
                providers: [
                    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(function () { return DatePickerComponent; }), multi: true },
                    { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return DatePickerComponent; }), multi: true },
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.datepicker'
                    }
                ],
                selector: 'kendo-datepicker',
                template: "\n        <ng-container kendoDatePickerLocalizedMessages\n            i18n-today=\"kendo.datepicker.today|The label for the today button in the calendar header\"\n            today=\"TODAY\"\n\n            i18n-toggle=\"kendo.datepicker.toggle|The label for the toggle button in the datepicker component\"\n            toggle=\"Toggle calendar\"\n        >\n        </ng-container>\n        <span #wrapper\n            class=\"k-picker-wrap k-state-default\"\n            [class.k-state-disabled]=\"disabled\"\n            [class.k-state-focused]=\"isActive\"\n        >\n            <kendo-dateinput\n                #input\n                hasPopup=\"true\"\n                [isPopupOpen]=\"show\"\n                [disabled]=\"disabled\"\n                [tabIndex]=\"!show ? tabIndex : -1\"\n                [title]=\"title\"\n                [format]=\"format\"\n                [min]=\"min\"\n                [max]=\"max\"\n                [value]=\"value\"\n                (valueChange)=\"handleChange($event)\"\n                (focus)=\"handleFocus()\"\n                (blur)=\"handleBlur()\"\n            ></kendo-dateinput>\n            <span class=\"k-select\"\n                role=\"button\"\n                [attr.title]=\"localization.get('toggle')\"\n                [attr.aria-label]=\"localization.get('toggle')\"\n                [attr.aria-controls]=\"popupUID\"\n                (mousedown)=\"$event.preventDefault()\"\n                (click)=\"handleIconClick()\"\n            >\n                <span class=\"k-icon k-i-calendar\"></span>\n            </span>\n        </span>\n        <ng-template #popupTemplate>\n            <kendo-calendar\n                #calendar\n                [cellTemplate]=\"cellTemplate\"\n                [min]=\"min\"\n                [max]=\"max\"\n                [focusedDate]=\"focusedDate\"\n                [value]=\"value\"\n                (valueChange)=\"handleChange($event)\"\n                (focus)=\"handleFocus()\"\n                (blur)=\"handleBlur()\"\n            >\n                <kendo-calendar-messages [today]=\"localization.get('today')\">\n                </kendo-calendar-messages>\n            </kendo-calendar>\n        <ng-template>\n    "
            },] },
];
/** @nocollapse */
DatePickerComponent.ctorParameters = function () { return [
    { type: NgZone, },
    { type: LocalizationService, },
    { type: PopupService, },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] },] },
]; };
DatePickerComponent.propDecorators = {
    'calendar': [{ type: ViewChild, args: ['calendar',] },],
    'input': [{ type: ViewChild, args: ['input',] },],
    'popupTemplate': [{ type: ViewChild, args: ['popupTemplate',] },],
    'wrapper': [{ type: ViewChild, args: ['wrapper',] },],
    'cellTemplate': [{ type: ContentChild, args: [CellTemplateDirective,] },],
    'disabled': [{ type: Input },],
    'popupSettings': [{ type: Input },],
    'min': [{ type: Input },],
    'max': [{ type: Input },],
    'focusedDate': [{ type: Input },],
    'value': [{ type: Input },],
    'format': [{ type: Input },],
    'tabIndex': [{ type: Input },],
    'title': [{ type: Input },],
    'rangeValidation': [{ type: Input },],
    'valueChange': [{ type: Output },],
    'onFocus': [{ type: Output, args: ['focus',] },],
    'onBlur': [{ type: Output, args: ['blur',] },],
    'open': [{ type: Output },],
    'close': [{ type: Output },],
    'wrapperClasses': [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-datepicker',] }, { type: HostBinding, args: ['class.k-header',] },],
    'handleKeydown': [{ type: HostListener, args: ['keydown', ['$event'],] },],
};
