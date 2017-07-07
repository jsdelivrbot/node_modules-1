"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-forward-ref max-line-length */
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var navigation_component_1 = require("./navigation.component");
var month_view_component_1 = require("./month-view.component");
var navigation_service_1 = require("./services/navigation.service");
var scroll_sync_service_1 = require("./services/scroll-sync.service");
var cell_template_directive_1 = require("./templates/cell-template.directive");
var min_validator_1 = require("../validators/min.validator");
var max_validator_1 = require("../validators/max.validator");
var defaults_1 = require("../defaults");
var util_1 = require("../util");
var MIN_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-min';
var MAX_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-max';
var hasChange = function (changes, field) { return changes[field] && changes[field].currentValue; };
var virtualizationProp = function (x) { return x ? x.virtualization : null; };
/**
 * @hidden
 */
exports.CALENDAR_VALUE_ACCESSOR = {
    multi: true,
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return CalendarComponent; }) //tslint:disable-line:no-use-before-declare
};
/**
 * @hidden
 */
exports.CALENDAR_RANGE_VALIDATORS = {
    multi: true,
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return CalendarComponent; }) //tslint:disable-line:no-use-before-declare
};
/**
 * Represents the Kendo UI Calendar component for Angular.
 *
 * @example
 * ```ts
 * @@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-calendar></kendo-calendar>
 * `
 * })
 * class AppComponent { }
 * ```
 */
var CalendarComponent = (function () {
    function CalendarComponent(element, navigator, scrollSyncService) {
        this.element = element;
        this.navigator = navigator;
        this.scrollSyncService = scrollSyncService;
        /**
         * Determines whether the built-in min or max validators are enforced when validating a form.
         */
        this.rangeValidation = false;
        /**
         * Sets or gets the `disabled` property of the Calendar and determines whether the component is active.
         */
        this.disabled = false;
        /**
         * Sets or gets the `tabIndex` property of the Calendar. Based on the [HTML tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) behavior,
         * it determines whether the component is focusable.
         * .
         */
        this.tabIndex = 0;
        /**
         * Sets or gets the `navigation` property of the Calendar and determines whether the navigation component is shown.
         */
        this.navigation = true;
        /**
         * Fires when the value is changed.
         *
         * For more details, refer to the section on [events]({% slug overview_calendar_kendouiforangular %}#toc-events).
         */
        this.valueChange = new core_1.EventEmitter();
        this.isActive = false;
        this.cellUID = util_1.guid();
        this._min = new Date(defaults_1.MIN_DATE);
        this._max = new Date(defaults_1.MAX_DATE);
        this._focusedDate = kendo_date_math_1.getDate(new Date());
        this.propagateChange = util_1.noop;
        this.propagateTouched = util_1.noop;
        this.minValidateFn = util_1.noop;
        this.maxValidateFn = util_1.noop;
        this.syncNavigation = true;
    }
    Object.defineProperty(CalendarComponent.prototype, "focusedDate", {
        get: function () {
            return this._focusedDate;
        },
        /**
         * Sets or gets the `focusedDate` property of the Calendar and defines the focused date of the component.
         *
         * > If the Calendar is out of the min or max range, it normalizes the defined `focusedDate`.
         */
        set: function (focusedDate) {
            this._focusedDate = focusedDate || kendo_date_math_1.getDate(new Date());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "min", {
        get: function () {
            return this._min;
        },
        /**
         * Sets or gets the `min` property of the Calendar and defines the minimum allowed date value.
         */
        set: function (min) {
            this._min = min || new Date(defaults_1.MIN_DATE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "max", {
        get: function () {
            return this._max;
        },
        /**
         * Sets or gets the `max` property of the Calendar and defines the maximum allowed date value.
         */
        set: function (max) {
            this._max = max || new Date(defaults_1.MAX_DATE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "value", {
        /**
         * Sets or gets the `value` property of the Calendar and defines the selected value of the component.
         */
        get: function () {
            return this._value;
        },
        set: function (candidate) {
            this.prevValue = kendo_date_math_1.cloneDate(candidate);
            this._value = kendo_date_math_1.cloneDate(candidate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "widgetRole", {
        get: function () {
            return 'grid';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "widgetClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "calendarTabIndex", {
        get: function () {
            return this.disabled ? undefined : this.tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "ariaDisabled", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "ariaActivedescendant", {
        get: function () {
            return this.cellUID + this.focusedDate.getTime();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    CalendarComponent.prototype.handleBlur = function () {
        this.propagateTouched();
        this.isActive = false;
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.handleFocus = function () {
        this.isActive = true;
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.handleMousedown = function (event) {
        event.preventDefault();
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.handleClick = function () {
        if (!this.isActive) {
            this.focusedDate = kendo_date_math_1.cloneDate(this.focusedDate);
            this.focus();
        }
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.keydown = function (event) {
        var candidate = util_1.dateInRange(this.navigator.move(this.focusedDate, this.navigator.action(event)), this.min, this.max);
        if (kendo_date_math_1.isEqual(this.focusedDate, candidate)) {
            return;
        }
        this.focusedDate = candidate;
        event.preventDefault();
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.enter = function () {
        this.handleDateChange(this.focusedDate);
    };
    CalendarComponent.prototype.ngOnChanges = function (changes) {
        this.verifySettings();
        var useValue = hasChange(changes, 'value') && !hasChange(changes, 'focusedDate'); //TODO: test
        var focusedDate = useValue ? this.value : this.focusedDate;
        this.focusedDate = util_1.dateInRange(kendo_date_math_1.cloneDate(focusedDate), this.min, this.max);
        if (changes.navigation) {
            this.syncNavigation = true;
        }
        if (changes.min || changes.max) {
            this.minValidateFn = this.rangeValidation ? min_validator_1.minValidator(this.min) : util_1.noop;
            this.maxValidateFn = this.rangeValidation ? max_validator_1.maxValidator(this.max) : util_1.noop;
        }
    };
    CalendarComponent.prototype.ngAfterViewChecked = function () {
        if (!this.syncNavigation) {
            return;
        }
        this.syncNavigation = false;
        this.scrollSyncService.sync(virtualizationProp(this.navigationView), virtualizationProp(this.monthView));
    };
    CalendarComponent.prototype.ngOnDestroy = function () {
        this.scrollSyncService.destroy();
    };
    /**
     * Focuses the host element of the Calendar.
     *
     * @example
     * ```ts
     * @@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="calendar.focus()">Focus calendar</button>
     *  <kendo-calendar #calendar></kendo-calendar>
     * `
     * })
     * class AppComponent { }
     * ```
     */
    CalendarComponent.prototype.focus = function () {
        if (!this.element) {
            return;
        }
        this.element.nativeElement.focus();
    };
    /**
     * Blurs the Calendar component.
     */
    CalendarComponent.prototype.blur = function () {
        if (!this.element) {
            return;
        }
        this.element.nativeElement.blur();
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.handleNavigation = function (candidate) {
        if (this.disabled) {
            return;
        }
        this.focusedDate = kendo_date_math_1.cloneDate(candidate) || this.focusedDate;
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.handleDateChange = function (candidate) {
        this.focusedDate = kendo_date_math_1.cloneDate(candidate) || this.focusedDate;
        if (this.disabled || kendo_date_math_1.isEqual(candidate, this.prevValue)) {
            return;
        }
        this.value = kendo_date_math_1.cloneDate(candidate);
        this.valueChange.emit(kendo_date_math_1.cloneDate(candidate));
        this.propagateChange(kendo_date_math_1.cloneDate(candidate));
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.writeValue = function (candidate) {
        this.focusedDate = util_1.dateInRange(kendo_date_math_1.cloneDate(candidate) || this.focusedDate, this.min, this.max);
        this.value = kendo_date_math_1.cloneDate(candidate);
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.registerOnTouched = function (fn) {
        this.propagateTouched = fn;
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.validate = function (control) {
        return this.minValidateFn(control) || this.maxValidateFn(control);
    };
    CalendarComponent.prototype.verifySettings = function () {
        if (!core_1.isDevMode()) {
            return;
        }
        if (this.min > this.max) {
            throw new Error("The max value should be bigger than the min. See " + MIN_DOC_LINK + " and " + MAX_DOC_LINK + ".");
        }
    };
    return CalendarComponent;
}());
CalendarComponent.decorators = [
    { type: core_1.Component, args: [{
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                exportAs: 'kendo-calendar',
                providers: [
                    exports.CALENDAR_VALUE_ACCESSOR,
                    exports.CALENDAR_RANGE_VALIDATORS,
                    kendo_angular_l10n_1.LocalizationService,
                    {
                        provide: kendo_angular_l10n_1.L10N_PREFIX,
                        useValue: 'kendo.calendar'
                    },
                    scroll_sync_service_1.ScrollSyncService
                ],
                selector: 'kendo-calendar',
                template: "\n    <ng-container kendoCalendarLocalizedMessages\n        i18n-today=\"kendo.calendar.today|The label for the today button in the calendar header\"\n        today=\"TODAY\"\n    >\n    </ng-container>\n    <kendo-calendar-navigation\n        *ngIf=\"navigation\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [focusedDate]=\"focusedDate\"\n        (valueChange)=\"handleNavigation($event)\"\n    >\n    </kendo-calendar-navigation>\n    <kendo-calendar-monthview\n        [isActive]=\"isActive\"\n        [cellTemplateRef]=\"cellTemplate?.templateRef\"\n        [cellUID]=\"cellUID\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [focusedDate]=\"focusedDate\"\n        [value]=\"value\"\n        (change)=\"handleDateChange($event)\"\n    >\n    </kendo-calendar-monthview>\n  "
            },] },
];
/** @nocollapse */
CalendarComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: navigation_service_1.NavigationService, },
    { type: scroll_sync_service_1.ScrollSyncService, },
]; };
CalendarComponent.propDecorators = {
    'focusedDate': [{ type: core_1.Input },],
    'min': [{ type: core_1.Input },],
    'max': [{ type: core_1.Input },],
    'rangeValidation': [{ type: core_1.Input },],
    'value': [{ type: core_1.Input },],
    'disabled': [{ type: core_1.Input },],
    'tabIndex': [{ type: core_1.Input },],
    'navigation': [{ type: core_1.Input },],
    'valueChange': [{ type: core_1.Output },],
    'cellTemplate': [{ type: core_1.Input }, { type: core_1.ContentChild, args: [cell_template_directive_1.CellTemplateDirective,] },],
    'navigationView': [{ type: core_1.ViewChild, args: [navigation_component_1.NavigationComponent,] },],
    'monthView': [{ type: core_1.ViewChild, args: [month_view_component_1.MonthViewComponent,] },],
    'widgetRole': [{ type: core_1.HostBinding, args: ['attr.role',] },],
    'widgetClasses': [{ type: core_1.HostBinding, args: ["class.k-widget",] }, { type: core_1.HostBinding, args: ["class.k-calendar",] }, { type: core_1.HostBinding, args: ["class.k-calendar-infinite",] },],
    'calendarTabIndex': [{ type: core_1.HostBinding, args: ['attr.tabindex',] },],
    'ariaDisabled': [{ type: core_1.HostBinding, args: ['attr.aria-disabled',] }, { type: core_1.HostBinding, args: ['class.k-state-disabled',] },],
    'ariaActivedescendant': [{ type: core_1.HostBinding, args: ['attr.aria-activedescendant',] },],
    'handleBlur': [{ type: core_1.HostListener, args: ["blur",] },],
    'handleFocus': [{ type: core_1.HostListener, args: ["focus",] },],
    'handleMousedown': [{ type: core_1.HostListener, args: ["mousedown", ['$event'],] },],
    'handleClick': [{ type: core_1.HostListener, args: ["click",] },],
    'keydown': [{ type: core_1.HostListener, args: ["keydown", ["$event"],] },],
    'enter': [{ type: core_1.HostListener, args: ["keydown.enter",] },],
};
exports.CalendarComponent = CalendarComponent;
