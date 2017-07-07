import { ElementRef, EventEmitter, OnChanges, OnDestroy, Renderer } from '@angular/core';
import { ControlValueAccessor, AbstractControl } from '@angular/forms';
import { IntlService, NumberFormatOptions } from '@progress/kendo-angular-intl';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ArrowDirection } from './arrow-direction';
/**
 * Represents the Kendo UI NumericTextBox component for Angular.
 */
export declare class NumericTextBoxComponent implements ControlValueAccessor, OnChanges, OnDestroy {
    private intl;
    private renderer;
    private localizationService;
    /**
     * Determines whether the component is disabled.
     */
    disabled: boolean;
    /**
     * Sets the title of the input element of the NumericTextBox.
     */
    title: string;
    /**
     * Specifies whether the value will be auto-corrected based on the min and max values.
     */
    autoCorrect: boolean;
    /**
     * Specifies the number format which is used when the component is not focused.
     * If set to `null` or `undefined`, the default format will be used.
     */
    format: string | NumberFormatOptions | null | undefined;
    /**
     * Specifies the greatest value that is valid.
     */
    max: number;
    /**
     * Specifies the smallest value that is valid.
     */
    min: number;
    /**
     * Specifies the number of decimals that the user can enter when the input is focused.
     */
    decimals: number;
    /**
     * Specifies the input placeholder.
     */
    placeholder: string;
    /**
     * Specifies the value used to increment or decrement the component value.
     */
    step: number;
    /**
     * Specifies whether the **Up** and **Down** spin buttons should be rendered.
     */
    spinners: boolean;
    /**
     * Determines whether the built-in min or max validators are enforced when validating a form.
     *
     * > The Angular 4.2.0 version introduces the `min` and `max` validation directives. As a result, even if you set `rangeValidation`
     * to `false`, the built-in Angular validators will be executed.
     */
    rangeValidation: boolean;
    /**
     * Sets or gets the `tabIndex` property of the NumericTextBox.
     * Based on the [HTML tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) behavior,
     * it determines whether the component is focusable.
     * .
     */
    tabIndex: number;
    /**
     * Specifies the value of the NumericTextBox component.
     */
    value: number;
    /**
     * Fires each time the user selects a new value.
     */
    valueChange: EventEmitter<any>;
    /**
     * Fires each time the user focuses the input element.
     */
    onFocus: EventEmitter<any>;
    /**
     * Fires each time the input element gets blurred.
     */
    onBlur: EventEmitter<any>;
    /**
     * @hidden
     */
    numericInput: ElementRef;
    direction: string;
    /**
     * @hidden
     */
    focused: boolean;
    /**
     * @hidden
     */
    ArrowDirection: any;
    /**
     * @hidden
     */
    arrowDirection: ArrowDirection;
    private inputValue;
    private spinTimeout;
    private minValidateFn;
    private maxValidateFn;
    private numericRegex;
    private _format;
    readonly widgetClasses: boolean;
    constructor(intl: IntlService, renderer: Renderer, localizationService: LocalizationService, rtl: boolean);
    /**
     * @hidden
     */
    arrowPress(direction: ArrowDirection, e: any): void;
    /**
     * @hidden
     */
    releaseArrow(): void;
    /**
     * @hidden
     */
    ngOnChanges(changes: any): void;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    validate(control: AbstractControl): {
        [key: string]: any;
    };
    /**
     * @hidden
     */
    writeValue(value: number): void;
    /**
     * @hidden
     */
    registerOnChange(fn: () => any): void;
    /**
     * @hidden
     */
    registerOnTouched(fn: () => any): void;
    /**
     * @hidden
     * Called when the status of the component changes to or from `disabled`.
     * Depending on the value, it enables or disables the appropriate DOM element.
     *
     * @param isDisabled
     */
    setDisabledState(isDisabled: boolean): void;
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
    focus(): void;
    /**
     * Blurs the NumericTextBox component.
     */
    blur(): void;
    /**
     * @hidden
     */
    handleInput(): void;
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
    handleKeyDown(e: any): void;
    /**
     * @hidden
     */
    readonly incrementTitle: string;
    /**
     * @hidden
     */
    readonly decrementTitle: string;
    private readonly decimalSeparator;
    private isValid(value);
    private spin(step, timeout);
    private addStep(step);
    private setSelection(start, end);
    private limitValue(value);
    private restrictModelValue(value);
    private restrictDecimals(value, round?);
    private formatInputValue(value);
    private formatValue(value);
    private setInputValue(value?);
    private updateValue(candidate);
    private ngChange;
    private ngTouched;
    private verifySettings();
}
