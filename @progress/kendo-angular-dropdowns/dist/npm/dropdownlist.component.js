"use strict";
/* tslint:disable:max-line-length */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/observable/interval");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/take");
require("rxjs/add/operator/takeUntil");
require("rxjs/add/operator/concatMap");
require("rxjs/add/operator/merge");
require("rxjs/add/operator/skipWhile");
var keys_1 = require("./common/keys");
var util_1 = require("./util");
var kendo_dropdowns_common_1 = require("@telerik/kendo-dropdowns-common");
var selection_service_1 = require("./selection.service");
var navigation_service_1 = require("./navigation.service");
var item_template_directive_1 = require("./templates/item-template.directive");
var value_template_directive_1 = require("./templates/value-template.directive");
var header_template_directive_1 = require("./templates/header-template.directive");
var footer_template_directive_1 = require("./templates/footer-template.directive");
var no_data_template_directive_1 = require("./templates/no-data-template.directive");
var navigation_action_1 = require("./navigation-action");
var preventable_event_1 = require("./common/preventable-event");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
/**
 * @hidden
 */
exports.DROPDOWNLIST_VALUE_ACCESSOR = {
    multi: true,
    provide: forms_1.NG_VALUE_ACCESSOR,
    // tslint:disable-next-line:no-use-before-declare
    useExisting: core_1.forwardRef(function () { return DropDownListComponent; })
};
/**
 * Represents the Kendo UI DropDownList component for Angular.
 *
 * @example
 * ```ts
 * @@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-dropdownlist [data]="listItems">
 *  </kendo-dropdownlist>
 * `
 * })
 * class AppComponent {
 *   public listItems: Array<string> = ["Item 1", "Item 2", "Item 3", "Item 4"];
 * }
 * ```
 */
var DropDownListComponent = (function () {
    function DropDownListComponent(rtl, popupService, selectionService, navigationService, _zone) {
        this.popupService = popupService;
        this.selectionService = selectionService;
        this.navigationService = navigationService;
        this._zone = _zone;
        /**
         * Sets the disabled state of the component.
         */
        this.disabled = false;
        /**
         * Enables the [filtering]({% slug overview_ddl_kendouiforangular %}#toc-filtering) functionality of the DropDownList.
         */
        this.filterable = false;
        /**
         * Enables a case-insensitive search. When `filtration` is disabled, use this option.
         */
        this.ignoreCase = true;
        /**
         * Sets the delay before an item search is performed. When `filtration` is disabled, use this option.
         */
        this.delay = 500;
        /**
         * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        this.tabIndex = 0;
        /**
         * Fires each time the value is changed.
         *
         * For more details, refer to the section on the [`valueChange`]({% slug overview_ddl_kendouiforangular %}#toc-on-value-change) event.
         */
        this.valueChange = new core_1.EventEmitter();
        /**
         * Fires each time the user types in the filter input. You can filter the source based on the passed filtration value.
         *
         * For more details, refer to the section on the [`filterChange`]({% slug overview_ddl_kendouiforangular %}#toc-on-filter-change) event.
         */
        this.filterChange = new core_1.EventEmitter();
        /**
         * Fires each time the item selection is changed.
         *
         * For more details, refer to the section on the [`selectionChange`]({% slug overview_ddl_kendouiforangular %}#toc-on-change-of-item-selection) event.
         */
        this.selectionChange = new core_1.EventEmitter();
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
        /**
         * Fires each time the user focuses the DropDownList component.
         */
        this.onFocus = new core_1.EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the DropDownList component gets blurred.
         */
        this.onBlur = new core_1.EventEmitter(); //tslint:disable-line:no-output-rename
        this.listBoxId = util_1.guid();
        this.optionPrefix = util_1.guid();
        this.filterText = "";
        this.isFocused = false;
        this.onTouchedCallback = function (_) { };
        this.onChangeCallback = function (_) { };
        this.word = "";
        this.last = "";
        this.filterFocused = new core_1.EventEmitter();
        this.wrapperBlurred = new core_1.EventEmitter();
        this._open = false;
        this._popupSettings = { height: 200, animate: true };
        this.direction = rtl ? 'rtl' : 'ltr';
        this.data = [];
        this.subscribeEvents();
        this.popupMouseDownHandler = this.onMouseDown.bind(this);
    }
    Object.defineProperty(DropDownListComponent.prototype, "width", {
        get: function () {
            var wrapperWidth = util_1.isDocumentAvailable() ? this.wrapper.nativeElement.offsetWidth : 0;
            var width = this.popupSettings.width || wrapperWidth;
            var minWidth = isNaN(wrapperWidth) ? wrapperWidth : wrapperWidth + "px";
            var maxWidth = isNaN(width) ? width : width + "px";
            return { min: minWidth, max: maxWidth };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "height", {
        get: function () {
            return this.popupSettings.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "popupOpen", {
        get: function () {
            return this._open;
        },
        set: function (open) {
            if (this.disabled || this.popupOpen === open) {
                return;
            }
            var eventArgs = new preventable_event_1.PreventableEvent();
            if (open) {
                this.open.emit(eventArgs);
            }
            else {
                this.close.emit(eventArgs);
            }
            if (eventArgs.isDefaultPrevented()) {
                return;
            }
            this._toggle(open);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "widgetTabIndex", {
        get: function () {
            return this.disabled ? undefined : this.tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "ariaHasPopup", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "ariaExpanded", {
        get: function () {
            return this.popupOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "ariaOwns", {
        get: function () {
            return this.listBoxId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "ariaActivedescendant", {
        get: function () {
            return this.optionPrefix + "-" + util_1.getter(this.value, this.valueField);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        /**
         * Sets the data of the DropDownList.
         *
         * > The data has to be provided in an array-like list.
         */
        set: function (data) {
            this._data = data || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        /**
         * Sets the value of the DropDownList. It could be either of the primitive (string, numbers) or of the complex (objects) type. To define the type, use the `valuePrimitive` option.
         *
         * > Selected values that are not present in the source are ignored.
         */
        set: function (newValue) {
            this.verifySettings(newValue);
            this._value = newValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "popupSettings", {
        get: function () {
            return this._popupSettings;
        },
        /**
         * Configures the popup of the DropDownList.
         *
         * The available options are:
         * - `animation: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
         * - `width: Number`&mdash;Sets the width of the popup container. By default, the width of the host element is used.
         * - `height: Number`&mdash;Sets the height of the popup container. By default, the height is 200px.
         * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
         */
        set: function (settings) {
            this._popupSettings = Object.assign({ height: 200, animate: true }, settings);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DropDownListComponent.prototype.blurComponent = function () {
        this.wrapperBlurred.emit();
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.focusComponent = function () {
        if (!this.isFocused) {
            this.isFocused = true;
            this.onFocus.emit();
        }
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.keydown = function (event) {
        var hasSelected = util_1.isPresent(this.selectionService.selected[0]);
        var focused = isNaN(this.selectionService.focused) ? 0 : this.selectionService.focused;
        var offset = 0;
        if (this.disabled) {
            return;
        }
        if (!hasSelected) {
            if (event.keyCode === keys_1.Keys.down) {
                offset = -1;
            }
            else if (event.keyCode === keys_1.Keys.up) {
                offset = 1;
            }
        }
        var eventData = event;
        var action = this.navigationService.process({
            current: focused + offset,
            max: this.data.length - 1,
            min: this.defaultItem ? -1 : 0,
            originalEvent: eventData
        });
        var leftRightKeys = (action === navigation_action_1.NavigationAction.Left) || (action === navigation_action_1.NavigationAction.Right);
        if (action !== navigation_action_1.NavigationAction.Undefined &&
            action !== navigation_action_1.NavigationAction.Tab &&
            action !== navigation_action_1.NavigationAction.Backspace &&
            action !== navigation_action_1.NavigationAction.Delete &&
            !(leftRightKeys && this.filterable) &&
            (action !== navigation_action_1.NavigationAction.Enter || (action === navigation_action_1.NavigationAction.Enter && this.popupOpen))) {
            eventData.preventDefault();
        }
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.keypress = function (event) {
        if (!this.filterable) {
            this.onKeyPress(event);
        }
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.click = function () {
        this.wrapper.nativeElement.focus();
        this.popupOpen = !this.popupOpen;
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.onResize = function () {
        if (this._open) {
            var popupWrapper = this.popupRef.popupElement;
            var _a = this.width, min = _a.min, max = _a.max;
            popupWrapper.style.minWidth = min;
            popupWrapper.style.width = max;
        }
    };
    Object.defineProperty(DropDownListComponent.prototype, "widgetClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DropDownListComponent.prototype.onFilterFocus = function () {
        this.filterFocused.emit();
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.popupOpened = function () {
        if (this.filterInput) {
            var nativeElement_1 = this.filterInput.nativeElement;
            var text_1 = this.filterText || nativeElement_1.value;
            this.nextTick(function () {
                nativeElement_1.focus();
                nativeElement_1.setSelectionRange(text_1.length, text_1.length);
            });
        }
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.ngOnDestroy = function () {
        this._toggle(false);
        this.unsubscribeEvents();
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.ngOnChanges = function (_changes) {
        if (this.valuePrimitive === undefined) {
            this.valuePrimitive = this.valueField ? false : true;
        }
        this.setState(this.value);
    };
    /**
     * Focuses the DropDownList component.
     */
    DropDownListComponent.prototype.focus = function () {
        if (!this.disabled) {
            this.wrapper.nativeElement.focus();
        }
    };
    /**
     * Blurs the DropDownList component.
     */
    DropDownListComponent.prototype.blur = function () {
        if (!this.disabled) {
            this.wrapper.nativeElement.blur();
        }
    };
    /**
     * Toggles the visibility of the popup. If you use the `toggle` method to open or close the popup, the `open` and `close` events will not be fired.
     *
     * @param open - The state of the popup.
     */
    DropDownListComponent.prototype.toggle = function (open) {
        var _this = this;
        Promise.resolve(null).then(function () {
            _this._toggle((open === undefined) ? !_this._open : open);
        });
    };
    Object.defineProperty(DropDownListComponent.prototype, "isOpen", {
        /**
         * Returns the current open state of the popup.
         */
        get: function () {
            return this.popupOpen;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Resets the value of the DropDownList.
     */
    DropDownListComponent.prototype.reset = function () {
        this.setState(undefined);
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.writeValue = function (newValue) {
        this.verifySettings(newValue);
        this.setState(newValue);
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    Object.defineProperty(DropDownListComponent.prototype, "listContainerClasses", {
        /**
         * @hidden
         */
        get: function () {
            var containerClasses = ['k-list-container', 'k-reset'];
            if (this.popupSettings.popupClass) {
                containerClasses.push(this.popupSettings.popupClass);
            }
            return containerClasses;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "buttonClasses", {
        /**
         * @hidden
         */
        get: function () {
            return _a = {},
                _a[this.iconClass] = !this.loading && this.iconClass,
                _a['k-i-arrow-s'] = !this.loading && !this.iconClass,
                _a['k-i-loading'] = this.loading,
                _a['k-icon'] = true,
                _a;
            var _a;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DropDownListComponent.prototype.setDefaultItemClasses = function () {
        return {
            'k-list-optionlabel': true
        };
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.getText = function () {
        return this.text;
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.getDefaultItemText = function () {
        return util_1.getter(this.defaultItem, this.textField);
    };
    DropDownListComponent.prototype._toggle = function (open) {
        var _this = this;
        this._open = open;
        if (this.popupRef) {
            this.popupRef.popupElement
                .removeEventListener('mousedown', this.popupMouseDownHandler);
            this.popupRef.close();
            this.popupRef = null;
        }
        if (this._open) {
            this.popupRef = this.popupService.open({
                anchor: this.wrapper,
                animate: this.popupSettings.animate,
                content: this.popupTemplate,
                popupClass: this.listContainerClasses
            });
            var popupWrapper = this.popupRef.popupElement;
            var _a = this.width, min = _a.min, max = _a.max;
            popupWrapper.addEventListener('mousedown', this.popupMouseDownHandler);
            popupWrapper.style.minWidth = min;
            popupWrapper.style.width = max;
            this.popupRef.popupOpen.subscribe(this.popupOpened.bind(this));
            this.popupRef.popupAnchorViewportLeave.subscribe(function () { return _this.popupOpen = false; });
        }
    };
    DropDownListComponent.prototype.subscribeEvents = function () {
        var _this = this;
        if (!util_1.isDocumentAvailable()) {
            return;
        }
        this.changeSubscription = this.selectionService.onChange.subscribe(this.handleItemChange.bind(this));
        this.selectSubscription = this.selectionService.onSelect.subscribe(this.handleItemSelect.bind(this));
        this.navigationSubscription = Observable_1.Observable.merge(this.navigationService.up, this.navigationService.down, this.navigationService.left.skipWhile(function () { return _this.filterable; }), this.navigationService.right.skipWhile(function () { return _this.filterable; }), this.navigationService.home, this.navigationService.end)
            .subscribe(function (event) { return _this.selectionService.select(event.index); });
        this.openSubscription = this.navigationService.open.subscribe(function () { return _this.popupOpen = true; });
        this.closeSubscription = this.navigationService.close.subscribe(function () {
            _this.popupOpen = false;
            _this.wrapper.nativeElement.focus();
        });
        this.enterSubscription = this.navigationService.enter
            .merge(this.navigationService.esc)
            .subscribe(this.handleEnter.bind(this));
        this._zone.runOutsideAngular(function () {
            _this.componentBlurredSubscription = _this.wrapperBlurred
                .concatMap(function () { return Observable_1.Observable.interval(10).take(1).takeUntil(_this.filterFocused); })
                .merge(_this.navigationService.tab)
                .filter(function () { return _this.isFocused; })
                .subscribe(function () { return _this._zone.run(function () {
                _this.componentBlur();
            }); });
        });
    };
    DropDownListComponent.prototype.unsubscribeEvents = function () {
        if (!util_1.isDocumentAvailable()) {
            return;
        }
        this.changeSubscription.unsubscribe();
        this.selectSubscription.unsubscribe();
        this.navigationSubscription.unsubscribe();
        this.openSubscription.unsubscribe();
        this.closeSubscription.unsubscribe();
        this.enterSubscription.unsubscribe();
        this.componentBlurredSubscription.unsubscribe();
    };
    DropDownListComponent.prototype.handleItemChange = function (event) {
        var index = event.indices.length ? event.indices[0] : undefined;
        if (!util_1.isPresent(index)) {
            return;
        }
        var dataItem = util_1.isPresent(this.data[index]) ? this.data[index] : this.defaultItem;
        this.change(dataItem);
    };
    DropDownListComponent.prototype.handleItemSelect = function (event) {
        var index = event.indices.length ? event.indices[0] : undefined;
        if (!util_1.isPresent(index)) {
            return;
        }
        var dataItem = util_1.isPresent(this.data[index]) ? this.data[index] : this.defaultItem;
        if (this.popupOpen) {
            this.dataItem = dataItem;
            this.value = this.valuePrimitive ? util_1.getter(dataItem, this.valueField) : dataItem;
            this.text = util_1.getter(dataItem, this.textField);
            this.selectionChange.emit(dataItem);
        }
        else {
            this.change(dataItem);
        }
    };
    DropDownListComponent.prototype.handleEnter = function () {
        if (this.popupOpen) {
            this.change(this.data[this.selectionService.focused]);
            this.wrapper.nativeElement.focus();
        }
    };
    DropDownListComponent.prototype.verifySettings = function (newValue) {
        var valueOrText = !util_1.isPresent(this.valueField) !== !util_1.isPresent(this.textField);
        if (!core_1.isDevMode()) {
            return;
        }
        if (this.defaultItem && this.valueField && typeof this.defaultItem !== "object") {
            throw new Error("defaultItem and data items must be of same type. See http://www.telerik.com/kendo-angular-ui/components/dropdowns/api/DropDownListComponent/#toc-defaultitem");
        }
        if (this.valuePrimitive === true && util_1.isPresent(newValue) && typeof newValue === "object") {
            throw new Error("Expected initial value of primitive type. See http://www.telerik.com/kendo-angular-ui/components/dropdowns/dropdownlist/#toc-value-selection");
        }
        if (this.valuePrimitive === false && util_1.isPresent(newValue) && typeof newValue !== "object") {
            throw new Error("Expected initial value of type Object. See http://www.telerik.com/kendo-angular-ui/components/dropdowns/dropdownlist/#toc-value-selection");
        }
        if (valueOrText) {
            throw new Error("Expected textField and valueField options to be set. See http://www.telerik.com/kendo-angular-ui/components/dropdowns/dropdownlist/#toc-bind-to-arrays-of-complex-data");
        }
    };
    DropDownListComponent.prototype.componentBlur = function () {
        if (util_1.getter(this._previousValue, this.valueField) !== util_1.getter(this.value, this.valueField)) {
            this.change(this.value);
        }
        else {
            this.popupOpen = false;
        }
        if (this.isFocused) {
            this.isFocused = false;
            this.onBlur.emit();
            this.onTouchedCallback();
        }
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.onMouseDown = function (event) {
        var tagName = event.target.tagName.toLowerCase();
        if (tagName !== "input") {
            event.preventDefault();
        }
    };
    DropDownListComponent.prototype.onKeyPress = function (event) {
        if (event.which === 0 || event.keyCode === keys_1.Keys.enter) {
            return;
        }
        var character = String.fromCharCode(event.charCode || event.keyCode);
        if (this.ignoreCase) {
            character = character.toLowerCase();
        }
        if (character === " ") {
            event.preventDefault();
        }
        this.word += character;
        this.last = character;
        this.search();
    };
    DropDownListComponent.prototype.search = function () {
        var _this = this;
        clearTimeout(this.typingTimeout);
        if (!this.filterable) {
            this.typingTimeout = setTimeout(function () { _this.word = ""; }, this.delay);
            this.selectNext();
        }
    };
    DropDownListComponent.prototype.selectNext = function () {
        var data = this.data.map(function (item, index) {
            return { item: item, itemIndex: index };
        });
        var isInLoop = kendo_dropdowns_common_1.DropDownsUtil.sameCharsOnly(this.word, this.last);
        var dataLength = data.length;
        var startIndex = isNaN(this.selectionService.selected[0]) ? 0 : this.selectionService.selected[0];
        var text, index, defaultItem;
        if (this.defaultItem) {
            defaultItem = { item: this.defaultItem, itemIndex: -1 };
            dataLength += 1;
            startIndex += 1;
        }
        startIndex += isInLoop ? 1 : 0;
        data = kendo_dropdowns_common_1.DropDownsUtil.shuffleData(data, startIndex, defaultItem);
        index = 0;
        for (; index < dataLength; index++) {
            text = util_1.getter(data[index].item, this.textField);
            var loopMatch = Boolean(isInLoop && kendo_dropdowns_common_1.DropDownsUtil.matchText(text, this.last, this.ignoreCase));
            var nextMatch = Boolean(kendo_dropdowns_common_1.DropDownsUtil.matchText(text, this.word, this.ignoreCase));
            if (loopMatch || nextMatch) {
                index = data[index].itemIndex;
                break;
            }
        }
        if (index !== dataLength) {
            this.navigate(index);
        }
    };
    DropDownListComponent.prototype.change = function (dataItem) {
        dataItem = dataItem || this.defaultItem;
        this.popupOpen = false;
        if (util_1.getter(this._previousValue, this.valueField) === util_1.getter(dataItem, this.valueField)) {
            return;
        }
        var primitiveValue = util_1.getter(dataItem, this.valueField);
        this.dataItem = dataItem;
        this.value = this.valuePrimitive ? primitiveValue : dataItem;
        this.text = util_1.getter(dataItem, this.textField);
        this._previousValue = this.value;
        this.selectionChange.emit(this.valuePrimitive ? primitiveValue : this.value);
        this.onChangeCallback(this.valuePrimitive ? primitiveValue : this.value);
        this.valueChange.emit(this.valuePrimitive ? primitiveValue : this.value);
        if (this.filterable && this.filterText) {
            this.filterText = "";
            this.filterChange.emit(this.filterText);
        }
    };
    DropDownListComponent.prototype.navigate = function (index) {
        this.selectionService.select(index);
    };
    DropDownListComponent.prototype.setState = function (value) {
        var newValue = util_1.isPresent(util_1.getter(value, this.valueField)) ? util_1.getter(value, this.valueField) : value;
        var dataItemCandidate;
        var valueCandidate;
        var textCandidate;
        if (!this.data.length) {
            if (util_1.isPresent(value)) {
                valueCandidate = dataItemCandidate = value;
            }
            else {
                valueCandidate = this.valuePrimitive ? util_1.getter(this.defaultItem, this.valueField) : this.defaultItem;
                dataItemCandidate = this.defaultItem;
            }
            textCandidate = util_1.getter(util_1.isPresent(value) ? value : this.defaultItem, this.textField);
        }
        else {
            this.verifySettings(value);
            var result = util_1.resolveValue({
                data: this.data,
                defaultItem: this.defaultItem,
                value: newValue,
                valueField: this.valueField
            });
            if (result.dataItem) {
                this.selectionService.resetSelection(result.selected);
                if (this.filterText) {
                    this.selectionService.focused = 0;
                }
                dataItemCandidate = result.dataItem;
                valueCandidate = this.valuePrimitive ? util_1.getter(result.dataItem, this.valueField) : result.dataItem;
                textCandidate = util_1.getter(result.dataItem, this.textField);
            }
            else if (util_1.isPresent(value)) {
                this.selectionService.resetSelection([]);
                this.selectionService.focused = 0;
                dataItemCandidate = this.dataItem;
                valueCandidate = this.value;
                textCandidate = this.text;
            }
            else {
                this.selectionService.resetSelection(this.defaultItem ? [-1] : []);
                this.selectionService.focused = 0;
                dataItemCandidate = this.defaultItem;
                valueCandidate = this.valuePrimitive ? util_1.getter(this.defaultItem, this.valueField) : this.defaultItem;
                textCandidate = util_1.getter(this.defaultItem, this.textField);
            }
        }
        this.dataItem = dataItemCandidate;
        this.value = valueCandidate;
        this.text = textCandidate;
        this._previousValue = this.value;
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.handleFilter = function (event) {
        this.filterChange.emit(event.target.value);
    };
    DropDownListComponent.prototype.nextTick = function (f) {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            //use setTimeout instead of resolved promise
            //as the latter doesn't wait enough
            setTimeout(function () { return _this._zone.run(f); });
        });
    };
    return DropDownListComponent;
}());
DropDownListComponent.decorators = [
    { type: core_1.Component, args: [{
                exportAs: 'kendoDropDownList',
                providers: [exports.DROPDOWNLIST_VALUE_ACCESSOR, selection_service_1.SelectionService, navigation_service_1.NavigationService],
                selector: 'kendo-dropdownlist',
                template: "\n        <span #wrapper unselectable=\"on\"\n          role=\"listbox\"\n          [ngClass]=\"{\n            'k-dropdown-wrap': true,\n            'k-state-default': !this.disabled,\n            'k-state-disabled': this.disabled,\n            'k-state-focused': this.isFocused\n          }\"\n          [attr.dir]=\"direction\"\n          [attr.tabindex]=\"widgetTabIndex\"\n          [attr.aria-disabled]=\"disabled\"\n          [attr.aria-haspopup]=\"ariaHasPopup\"\n          [attr.aria-expanded]=\"ariaExpanded\"\n          [attr.aria-owns]=\"ariaOwns\"\n          [attr.aria-activedescendant]=\"ariaActivedescendant\"\n          (focus)=\"focusComponent()\"\n          (blur)=\"blurComponent()\"\n          (keydown)=\"keydown($event)\"\n          (keypress)=\"keypress($event)\"\n          (click)=\"click()\"\n        >\n            <span [ngClass]=\"{ 'k-input': true }\" unselectable=\"on\">\n               <ng-template *ngIf=\"valueTemplate\"\n                   [templateContext]=\"{\n                       templateRef: valueTemplate.templateRef,\n                       $implicit: dataItem\n                   }\">\n               </ng-template>\n               <ng-template [ngIf]=\"!valueTemplate\">{{ getText() }}</ng-template>\n           </span>\n           <span [ngClass]=\"{ 'k-select': true}\" unselectable=\"on\">\n               <span [ngClass]=\"buttonClasses\"></span>\n           </span>\n           <ng-template #popupTemplate>\n               <!--filterable-->\n\n               <ng-template [ngIf]=\"filterable\">\n                   <span [ngClass]=\"{ 'k-list-filter': true }\" (click)=\"$event.stopImmediatePropagation()\">\n                       <input #filterInput\n                           [dir]=\"direction\"\n                           [(ngModel)]=\"filterText\"\n                           class=\"k-textbox\"\n                           (keydown)=\"keydown($event)\"\n                           (input)=\"handleFilter($event)\"\n                           (focus)=\"onFilterFocus()\"\n                           (blur)=\"blurComponent()\" />\n                       <span [ngClass]=\"{ 'k-icon': true, 'k-i-search': true }\" unselectable=\"on\"></span>\n                   </span>\n               </ng-template>\n               <!--default item-->\n               <ng-template [ngIf]=\"defaultItem && !itemTemplate\">\n                   <div [ngClass]=\"setDefaultItemClasses()\" kendoDropDownsSelectable [index]=\"-1\">\n                       {{ getDefaultItemText() }}\n                   </div>\n               </ng-template>\n               <ng-template [ngIf]=\"defaultItem && itemTemplate\">\n                   <div [ngClass]=\"setDefaultItemClasses()\" kendoDropDownsSelectable [index]=\"-1\">\n                       <ng-template\n                           [templateContext]=\"{\n                               templateRef: itemTemplate.templateRef,\n                               $implicit: defaultItem\n                           }\">\n                       </ng-template>\n                   </div>\n               </ng-template>\n               <!--header template-->\n               <ng-template *ngIf=\"headerTemplate\"\n                   [templateContext]=\"{\n                       templateRef: headerTemplate.templateRef\n                   }\">\n               </ng-template>\n               <!--list-->\n               <kendo-list\n                   [id]=\"listBoxId\"\n                   [optionPrefix]=\"optionPrefix\"\n                   [data]=\"data\"\n                   [textField]=\"textField\"\n                   [valueField]=\"valueField\"\n                   [template]=\"itemTemplate\"\n                   [height]=\"height\"\n                   [show]=\"popupOpen\"\n                   >\n               </kendo-list>\n               <!--no-data template-->\n               <div class=\"k-nodata\" *ngIf=\"data.length === 0\">\n                   <ng-template [ngIf]=\"noDataTemplate\"\n                       [templateContext]=\"{\n                           templateRef: noDataTemplate ? noDataTemplate.templateRef : undefined\n                       }\">\n                   </ng-template>\n                   <ng-template [ngIf]=\"!noDataTemplate\">\n                       <div>NO DATA FOUND.</div>\n                   </ng-template>\n               </div>\n               <!--footer template-->\n               <ng-template *ngIf=\"footerTemplate\"\n                   [templateContext]=\"{\n                       templateRef: footerTemplate.templateRef\n                   }\">\n               </ng-template>\n            </ng-template>\n        </span>\n        <kendo-resize-sensor (resize)=\"onResize()\"></kendo-resize-sensor>\n  "
            },] },
];
/** @nocollapse */
DropDownListComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [kendo_angular_l10n_1.RTL,] },] },
    { type: kendo_angular_popup_1.PopupService, },
    { type: selection_service_1.SelectionService, },
    { type: navigation_service_1.NavigationService, },
    { type: core_1.NgZone, },
]; };
DropDownListComponent.propDecorators = {
    'iconClass': [{ type: core_1.Input },],
    'loading': [{ type: core_1.Input },],
    'data': [{ type: core_1.Input },],
    'value': [{ type: core_1.Input },],
    'textField': [{ type: core_1.Input },],
    'valueField': [{ type: core_1.Input },],
    'popupSettings': [{ type: core_1.Input },],
    'defaultItem': [{ type: core_1.Input },],
    'disabled': [{ type: core_1.Input },],
    'filterable': [{ type: core_1.Input },],
    'ignoreCase': [{ type: core_1.Input },],
    'delay': [{ type: core_1.Input },],
    'valuePrimitive': [{ type: core_1.Input },],
    'tabIndex': [{ type: core_1.Input },],
    'valueChange': [{ type: core_1.Output },],
    'filterChange': [{ type: core_1.Output },],
    'selectionChange': [{ type: core_1.Output },],
    'open': [{ type: core_1.Output },],
    'close': [{ type: core_1.Output },],
    'onFocus': [{ type: core_1.Output, args: ['focus',] },],
    'onBlur': [{ type: core_1.Output, args: ['blur',] },],
    'itemTemplate': [{ type: core_1.ContentChild, args: [item_template_directive_1.ItemTemplateDirective,] },],
    'valueTemplate': [{ type: core_1.ContentChild, args: [value_template_directive_1.ValueTemplateDirective,] },],
    'headerTemplate': [{ type: core_1.ContentChild, args: [header_template_directive_1.HeaderTemplateDirective,] },],
    'footerTemplate': [{ type: core_1.ContentChild, args: [footer_template_directive_1.FooterTemplateDirective,] },],
    'noDataTemplate': [{ type: core_1.ContentChild, args: [no_data_template_directive_1.NoDataTemplateDirective,] },],
    'filterInput': [{ type: core_1.ViewChild, args: ['filterInput',] },],
    'popupTemplate': [{ type: core_1.ViewChild, args: ['popupTemplate',] },],
    'wrapper': [{ type: core_1.ViewChild, args: ['wrapper',] },],
    'widgetClasses': [{ type: core_1.HostBinding, args: ['class.k-widget',] }, { type: core_1.HostBinding, args: ['class.k-dropdown',] }, { type: core_1.HostBinding, args: ['class.k-header',] },],
};
exports.DropDownListComponent = DropDownListComponent;
