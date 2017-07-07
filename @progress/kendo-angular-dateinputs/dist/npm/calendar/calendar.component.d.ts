import { EventEmitter, ElementRef, AfterViewChecked, OnChanges, OnDestroy } from '@angular/core';
import { AbstractControl, ControlValueAccessor, Validator } from '@angular/forms';
import { NavigationComponent } from './navigation.component';
import { MonthViewComponent } from './month-view.component';
import { NavigationService } from './services/navigation.service';
import { ScrollSyncService } from './services/scroll-sync.service';
import { CellTemplateDirective } from './templates/cell-template.directive';
import { KeyDown } from './models/keydown.interface';
/**
 * @hidden
 */
export declare const CALENDAR_VALUE_ACCESSOR: any;
/**
 * @hidden
 */
export declare const CALENDAR_RANGE_VALIDATORS: any;
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
export declare class CalendarComponent implements ControlValueAccessor, OnChanges, OnDestroy, AfterViewChecked, Validator {
    private element;
    private navigator;
    private scrollSyncService;
    /**
     * Sets or gets the `focusedDate` property of the Calendar and defines the focused date of the component.
     *
     * > If the Calendar is out of the min or max range, it normalizes the defined `focusedDate`.
     */
    focusedDate: Date;
    /**
     * Sets or gets the `min` property of the Calendar and defines the minimum allowed date value.
     */
    min: Date;
    /**
     * Sets or gets the `max` property of the Calendar and defines the maximum allowed date value.
     */
    max: Date;
    /**
     * Determines whether the built-in min or max validators are enforced when validating a form.
     */
    rangeValidation: boolean;
    /**
     * Sets or gets the `value` property of the Calendar and defines the selected value of the component.
     */
    value: Date;
    /**
     * Sets or gets the `disabled` property of the Calendar and determines whether the component is active.
     */
    disabled: boolean;
    /**
     * Sets or gets the `tabIndex` property of the Calendar. Based on the [HTML tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) behavior,
     * it determines whether the component is focusable.
     * .
     */
    tabIndex: number;
    /**
     * Sets or gets the `navigation` property of the Calendar and determines whether the navigation component is shown.
     */
    navigation: boolean;
    /**
     * Fires when the value is changed.
     *
     * For more details, refer to the section on [events]({% slug overview_calendar_kendouiforangular %}#toc-events).
     */
    valueChange: EventEmitter<Date>;
    /**
     * @hidden
     */
    cellTemplate: CellTemplateDirective;
    navigationView: NavigationComponent;
    monthView: MonthViewComponent;
    isActive: boolean;
    cellUID: string;
    private _min;
    private _max;
    private _focusedDate;
    private _value;
    private prevValue;
    private propagateChange;
    private propagateTouched;
    private minValidateFn;
    private maxValidateFn;
    private syncNavigation;
    readonly widgetRole: string;
    readonly widgetClasses: boolean;
    readonly calendarTabIndex: number;
    readonly ariaDisabled: boolean;
    readonly ariaActivedescendant: string;
    /**
     * @hidden
     */
    handleBlur(): void;
    /**
     * @hidden
     */
    handleFocus(): void;
    /**
     * @hidden
     */
    handleMousedown(event: any): void;
    /**
     * @hidden
     */
    handleClick(): void;
    /**
     * @hidden
     */
    keydown(event: KeyDown): void;
    /**
     * @hidden
     */
    enter(): void;
    constructor(element: ElementRef, navigator: NavigationService, scrollSyncService: ScrollSyncService);
    ngOnChanges(changes: any): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
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
    focus(): void;
    /**
     * Blurs the Calendar component.
     */
    blur(): void;
    /**
     * @hidden
     */
    handleNavigation(candidate: Date): void;
    /**
     * @hidden
     */
    handleDateChange(candidate: Date): void;
    /**
     * @hidden
     */
    writeValue(candidate: Date): void;
    /**
     * @hidden
     */
    registerOnChange(fn: any): void;
    /**
     * @hidden
     */
    registerOnTouched(fn: any): void;
    /**
     * @hidden
     */
    setDisabledState(isDisabled: boolean): void;
    /**
     * @hidden
     */
    validate(control: AbstractControl): {
        [key: string]: any;
    };
    private verifySettings();
}
