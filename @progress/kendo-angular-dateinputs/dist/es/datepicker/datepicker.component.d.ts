import { ElementRef, TemplateRef, EventEmitter, NgZone, OnChanges, OnDestroy } from '@angular/core';
import { AbstractControl, ControlValueAccessor } from '@angular/forms';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PopupService, PopupRef } from '@progress/kendo-angular-popup';
import { PopupSettings } from '../popup-settings.model';
import { PreventableEvent } from '../preventable-event';
import { CalendarComponent } from '../calendar/calendar.component';
import { CellTemplateDirective } from '../calendar/templates/cell-template.directive';
import { DateInputComponent } from '../dateinput/dateinput.component';
/**
 * Represents the Kendo UI DatePicker component for Angular.
 */
export declare class DatePickerComponent implements ControlValueAccessor, OnChanges, OnDestroy {
    zone: NgZone;
    localization: LocalizationService;
    private popupService;
    private rtl;
    calendar: CalendarComponent;
    input: DateInputComponent;
    popupTemplate: TemplateRef<any>;
    wrapper: ElementRef;
    cellTemplate: CellTemplateDirective;
    /**
     * Sets or gets the `disabled` property of the Calendar and determines whether the component is active.
     */
    disabled: boolean;
    /**
     * Configures the popup of the DatePicker.
     *
     * The available options are:
     * - `animation: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     */
    popupSettings: PopupSettings;
    /**
     * Specifies the smallest valid date.
     */
    min: Date;
    /**
     * Specifies the biggest valid date.
     */
    max: Date;
    /**
     * Specifies the focused date of the Calendar component.
     */
    focusedDate: Date;
    /**
     * Specifies the value of the DatePicker component.
     */
    value: Date;
    /**
     * Specifies the date format used to display the input value.
     */
    format: string;
    /**
     * Sets or gets the `tabIndex` property of the DatePicker.
     */
    tabIndex: number;
    /**
     * Sets the title of the input element of the DatePicker.
     */
    title: string;
    /**
     * Determines whether the built-in min or max validators are enforced when validating a form.
     */
    rangeValidation: boolean;
    /**
     * Fires each time the user selects a new value.
     */
    valueChange: EventEmitter<Date>;
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
    onFocus: EventEmitter<any>;
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
    onBlur: EventEmitter<any>;
    /**
     * Fires each time the popup is about to open.
     * This event is preventable. If you cancel the event, the popup will remain closed.
     */
    open: EventEmitter<PreventableEvent>;
    /**
     * Fires each time the popup is about to close.
     * This event is preventable. If you cancel the event, the popup will remain opened.
     */
    close: EventEmitter<PreventableEvent>;
    isActive: boolean;
    popupUID: string;
    popupRef: PopupRef;
    show: boolean;
    private _popupSettings;
    private _show;
    private onChange;
    private onTouched;
    private minValidateFn;
    private maxValidateFn;
    /**
     * @hidden
     */
    wrapperClasses(): boolean;
    /**
     * @hidden
     */
    handleKeydown(event: any): void;
    constructor(zone: NgZone, localization: LocalizationService, popupService: PopupService, rtl: boolean);
    /**
     * @hidden
     */
    ngOnChanges(changes: any): void;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
    /**
     * Returns the current open state of the popup.
     */
    readonly isOpen: boolean;
    /**
     * @hidden
     */
    writeValue(value: Date): void;
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
    focus(): void;
    /**
     * Blurs the DatePicker component.
     */
    blur(): void;
    /**
     * Toggles the visibility of the popup. If you use the `toggle` method to show or hide the popup,
     * the `open` and `close` events are not fired.
     *
     * @param show - The state of the popup.
     */
    toggle(show?: boolean): void;
    /**
     * @hidden
     */
    handleIconClick(): void;
    /**
     * @hidden
     */
    handleChange(value: Date): void;
    /**
     * @hidden
     */
    handleFocus(): void;
    /**
     * @hidden
     */
    handleBlur(): void;
    /**
     * @hidden
     */
    readonly popupClasses: string[];
    private _toggle(show);
    private hasActiveComponent();
    private verifySettings();
    private nextTick(f);
}
