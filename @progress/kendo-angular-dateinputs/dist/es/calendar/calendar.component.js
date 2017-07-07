/* tslint:disable:no-forward-ref max-line-length */
import { Component, ChangeDetectionStrategy, ContentChild, EventEmitter, ElementRef, isDevMode, forwardRef, HostBinding, HostListener, Input, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { cloneDate, getDate, isEqual } from '@progress/kendo-date-math';
import { NavigationComponent } from './navigation.component';
import { MonthViewComponent } from './month-view.component';
import { NavigationService } from './services/navigation.service';
import { ScrollSyncService } from './services/scroll-sync.service';
import { CellTemplateDirective } from './templates/cell-template.directive';
import { minValidator } from '../validators/min.validator';
import { maxValidator } from '../validators/max.validator';
import { MIN_DATE, MAX_DATE } from '../defaults';
import { dateInRange, guid, noop } from '../util';
var MIN_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-min';
var MAX_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-max';
var hasChange = function (changes, field) { return changes[field] && changes[field].currentValue; };
var virtualizationProp = function (x) { return x ? x.virtualization : null; };
/**
 * @hidden
 */
export var CALENDAR_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return CalendarComponent; }) //tslint:disable-line:no-use-before-declare
};
/**
 * @hidden
 */
export var CALENDAR_RANGE_VALIDATORS = {
    multi: true,
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return CalendarComponent; }) //tslint:disable-line:no-use-before-declare
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
        this.valueChange = new EventEmitter();
        this.isActive = false;
        this.cellUID = guid();
        this._min = new Date(MIN_DATE);
        this._max = new Date(MAX_DATE);
        this._focusedDate = getDate(new Date());
        this.propagateChange = noop;
        this.propagateTouched = noop;
        this.minValidateFn = noop;
        this.maxValidateFn = noop;
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
            this._focusedDate = focusedDate || getDate(new Date());
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
            this._min = min || new Date(MIN_DATE);
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
            this._max = max || new Date(MAX_DATE);
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
            this.prevValue = cloneDate(candidate);
            this._value = cloneDate(candidate);
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
            this.focusedDate = cloneDate(this.focusedDate);
            this.focus();
        }
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.keydown = function (event) {
        var candidate = dateInRange(this.navigator.move(this.focusedDate, this.navigator.action(event)), this.min, this.max);
        if (isEqual(this.focusedDate, candidate)) {
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
        this.focusedDate = dateInRange(cloneDate(focusedDate), this.min, this.max);
        if (changes.navigation) {
            this.syncNavigation = true;
        }
        if (changes.min || changes.max) {
            this.minValidateFn = this.rangeValidation ? minValidator(this.min) : noop;
            this.maxValidateFn = this.rangeValidation ? maxValidator(this.max) : noop;
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
        this.focusedDate = cloneDate(candidate) || this.focusedDate;
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.handleDateChange = function (candidate) {
        this.focusedDate = cloneDate(candidate) || this.focusedDate;
        if (this.disabled || isEqual(candidate, this.prevValue)) {
            return;
        }
        this.value = cloneDate(candidate);
        this.valueChange.emit(cloneDate(candidate));
        this.propagateChange(cloneDate(candidate));
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.writeValue = function (candidate) {
        this.focusedDate = dateInRange(cloneDate(candidate) || this.focusedDate, this.min, this.max);
        this.value = cloneDate(candidate);
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
        if (!isDevMode()) {
            return;
        }
        if (this.min > this.max) {
            throw new Error("The max value should be bigger than the min. See " + MIN_DOC_LINK + " and " + MAX_DOC_LINK + ".");
        }
    };
    return CalendarComponent;
}());
export { CalendarComponent };
CalendarComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                exportAs: 'kendo-calendar',
                providers: [
                    CALENDAR_VALUE_ACCESSOR,
                    CALENDAR_RANGE_VALIDATORS,
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.calendar'
                    },
                    ScrollSyncService
                ],
                selector: 'kendo-calendar',
                template: "\n    <ng-container kendoCalendarLocalizedMessages\n        i18n-today=\"kendo.calendar.today|The label for the today button in the calendar header\"\n        today=\"TODAY\"\n    >\n    </ng-container>\n    <kendo-calendar-navigation\n        *ngIf=\"navigation\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [focusedDate]=\"focusedDate\"\n        (valueChange)=\"handleNavigation($event)\"\n    >\n    </kendo-calendar-navigation>\n    <kendo-calendar-monthview\n        [isActive]=\"isActive\"\n        [cellTemplateRef]=\"cellTemplate?.templateRef\"\n        [cellUID]=\"cellUID\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [focusedDate]=\"focusedDate\"\n        [value]=\"value\"\n        (change)=\"handleDateChange($event)\"\n    >\n    </kendo-calendar-monthview>\n  "
            },] },
];
/** @nocollapse */
CalendarComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: NavigationService, },
    { type: ScrollSyncService, },
]; };
CalendarComponent.propDecorators = {
    'focusedDate': [{ type: Input },],
    'min': [{ type: Input },],
    'max': [{ type: Input },],
    'rangeValidation': [{ type: Input },],
    'value': [{ type: Input },],
    'disabled': [{ type: Input },],
    'tabIndex': [{ type: Input },],
    'navigation': [{ type: Input },],
    'valueChange': [{ type: Output },],
    'cellTemplate': [{ type: Input }, { type: ContentChild, args: [CellTemplateDirective,] },],
    'navigationView': [{ type: ViewChild, args: [NavigationComponent,] },],
    'monthView': [{ type: ViewChild, args: [MonthViewComponent,] },],
    'widgetRole': [{ type: HostBinding, args: ['attr.role',] },],
    'widgetClasses': [{ type: HostBinding, args: ["class.k-widget",] }, { type: HostBinding, args: ["class.k-calendar",] }, { type: HostBinding, args: ["class.k-calendar-infinite",] },],
    'calendarTabIndex': [{ type: HostBinding, args: ['attr.tabindex',] },],
    'ariaDisabled': [{ type: HostBinding, args: ['attr.aria-disabled',] }, { type: HostBinding, args: ['class.k-state-disabled',] },],
    'ariaActivedescendant': [{ type: HostBinding, args: ['attr.aria-activedescendant',] },],
    'handleBlur': [{ type: HostListener, args: ["blur",] },],
    'handleFocus': [{ type: HostListener, args: ["focus",] },],
    'handleMousedown': [{ type: HostListener, args: ["mousedown", ['$event'],] },],
    'handleClick': [{ type: HostListener, args: ["click",] },],
    'keydown': [{ type: HostListener, args: ["keydown", ["$event"],] },],
    'enter': [{ type: HostListener, args: ["keydown.enter",] },],
};
