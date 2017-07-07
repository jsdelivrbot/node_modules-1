import { AfterViewInit, ElementRef, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/takeUntil';
/**
 * Represents the Kendo UI Slider component for Angular.
 */
export declare class SliderComponent implements OnChanges, AfterViewInit, ControlValueAccessor, OnDestroy {
    private rtl;
    /**
     * Sets the title of the **Increase** button of the Slider.
     */
    incrementTitle: string;
    /**
     * Sets the title of the **Decrease** button of the Slider.
     */
    decrementTitle: string;
    /**
     * Makes the Slider side arrow buttons appear. When set to `false`, the buttons are not displayed.
     */
    showButtons: boolean;
    /**
     * Denotes the location of the tick marks in the Slider.
     *
     * The available options are:
     *   * `before`&mdash;Tick marks are located to the top side of the horizontal track or to the left side of a vertical track.
     *   * `after`&mdash;Tick marks are located to the bottom side of the horizontal track or to the right side of the vertical track.
     *   * `both`&mdash;Tick marks are located on both sides of the track.
     *   * `none`&mdash;Tick marks are not visible. The actual elements are not added to the DOM tree.
     */
    tickPlacement: string;
    /**
     * Defines the title of the ticks. The default title for each tick is its Slider value.
     * If a callback function is used, it accepts an argument holding the value of the component and returns a string with the new title.
     */
    title: Function | string;
    /**
     * Changes the title attribute of the drag handle, so it can be localized.
     */
    dragHandleTitle: string;
    /**
     * If set to `true`, it changes the orientation of the Slider from horizontal to vertical.
     */
    vertical: boolean;
    /**
     * The minimum value of the Slider. The attribute accepts both integers and floating-point numbers.
     */
    min: number;
    /**
     * The maximum value of the Slider. The attribute accepts both integers and floating-point numbers.
     */
    max: number;
    /**
     * The step value of the Slider. The attribute accepts only positive numbers. Can be both integer or a float number.
     */
    smallStep: number;
    /**
     * Sets the width between each two ticks along the track. The value has to be set in pixels.
     * If no `fixedTickWidth` is provided, the component automatically adjusts the tick width to
     * accommodate the elements within the size of the component.
     */
    fixedTickWidth: number;
    /**
     * If set to `true`, it disables the Slider.
     */
    disabled: boolean;
    /**
     * The current value of the Slider when initially displayed.
     * The component can use either the `value` binging or `NgModel`, but not both of them at the same time.
     */
    value: number;
    /**
     * Fires each time the user selects a new value.
     */
    valueChange: EventEmitter<any>;
    track: ElementRef;
    draghandle: ElementRef;
    sliderSelection: ElementRef;
    ticks: any;
    decreaseButton: ElementRef;
    increaseButton: ElementRef;
    direction: string;
    readonly horizontalClass: boolean;
    readonly verticalClass: boolean;
    readonly sliderClass: boolean;
    readonly transitionsClass: boolean;
    readonly widgetClass: boolean;
    readonly stateDefaultClass: boolean;
    readonly topLeftClass: boolean;
    readonly bottomRightClass: boolean;
    readonly disabledClass: boolean;
    readonly tabIndex: number;
    readonly ariaDisabled: boolean;
    readonly ariaMin: number;
    readonly ariaMax: number;
    readonly ariaValue: number;
    dragging: boolean;
    ticksCount: number;
    private wrapper;
    private decreaseButtonSubscription;
    private increaseButtonSubscription;
    private readonly reverse;
    private readonly keyBinding;
    /**
     * @hidden
     * Called when the status of the component changes to or from `disabled`.
     * Depending on the value, it enables or disables the appropriate DOM element.
     *
     * @param isDisabled
     */
    setDisabledState(isDisabled: boolean): void;
    /**
     * @hidden
     */
    active(): void;
    /**
     * @hidden
     */
    keydown(event: any): void;
    /**
     * @hidden
     */
    blur(): void;
    constructor(el: ElementRef, rtl: boolean);
    ngOnChanges(_: any): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    protected onTickClick(event: Event): void;
    /**
     * @hidden
     */
    onTrackClick(event: Event): void;
    protected onIncrement(): void;
    protected onDecrement(): void;
    protected isDocumentAvailable(): boolean;
    /**
     * @hidden
     */
    ifEnabled: Function;
    /**
     * @hidden
     */
    onHandleDrag(event: Event): void;
    /**
     * @hidden
     */
    onKeyDown(e: KeyboardEvent): void;
    /**
     * @hidden
     */
    onHandleRelease(): void;
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
     */
    changeValue(value: number): void;
    /**
     * @hidden
     */
    sizeComponent(animate: boolean): void;
    private setValueChangeInterval(element, callback);
    private ngChange;
    private ngTouched;
    private decreaseValue;
    private increaseValue;
    private handleAnimation(animate);
    private getProps();
}
