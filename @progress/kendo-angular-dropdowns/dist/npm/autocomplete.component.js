"use strict";
/* tslint:disable:no-null-keyword */
/* tslint:disable:max-line-length */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var searchbar_component_1 = require("./searchbar.component");
var item_template_directive_1 = require("./templates/item-template.directive");
var header_template_directive_1 = require("./templates/header-template.directive");
var footer_template_directive_1 = require("./templates/footer-template.directive");
var selection_service_1 = require("./selection.service");
var navigation_service_1 = require("./navigation.service");
var Observable_1 = require("rxjs/Observable");
var util_1 = require("./util");
var navigation_action_1 = require("./navigation-action");
var no_data_template_directive_1 = require("./templates/no-data-template.directive");
var keys_1 = require("./common/keys");
var preventable_event_1 = require("./common/preventable-event");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
/**
 * @hidden
 */
exports.AUTOCOMPLETE_VALUE_ACCESSOR = {
    multi: true,
    provide: forms_1.NG_VALUE_ACCESSOR,
    // tslint:disable-next-line:no-use-before-declare
    useExisting: core_1.forwardRef(function () { return AutoCompleteComponent; })
};
/**
 * Represents the Kendo UI AutoComplete component for Angular.
 *
 * @example
 * ```ts
 * @@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-autocomplete
 *      [data]="listItems"
 *      [placeholder]="placeholder"
 *  >
 * `
 * })
 * class AppComponent {
 *   public placeholder: string = 'Type "it" for suggestions';
 *   public listItems: Array<string> = ["Item 1", "Item 2", "Item 3", "Item 4"];
 * }
 * ```
 */
var AutoCompleteComponent = (function () {
    function AutoCompleteComponent(rtl, popupService, selectionService, navigationService, wrapper) {
        this.popupService = popupService;
        this.selectionService = selectionService;
        this.navigationService = navigationService;
        /**
         * The hint displayed when the component is empty.
         *
         */
        this.placeholder = "";
        /**
         * @hidden
         *
         * Unless this options is set to `false`, a button will appear when hovering over the component. Clicking that button resets the component value to undefined and triggers the `change` event.
         */
        this.clearButton = true;
        /**
         * Sets the disabled state of the component.
         */
        this.disabled = false;
        /**
         * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        this.tabIndex = 0;
        /**
         * Enables the filter functionality. If set to `true`, the component emits the `filterChange` event.
         */
        this.filterable = false;
        /**
         * Fires each time the value is changed.
         *
         * For more details, refer to the section on the [`valueChange`]({% slug overview_autocomplete_kendouiforangular %}#toc-on-value-change) event.
         */
        this.valueChange = new core_1.EventEmitter();
        /**
         * Fires each time the user types in the input. You can filter the source based on the passed filtration value.
         *
         * For more details, refer to the section on the [`filterChange`]({% slug overview_autocomplete_kendouiforangular %}#toc-on-filter-change) event.
         */
        this.filterChange = new core_1.EventEmitter();
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
         * Fires each time the user focuses the AutoComplete component.
         */
        this.onFocus = new core_1.EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the AutoComplete component gets blurred.
         */
        this.onBlur = new core_1.EventEmitter(); //tslint:disable-line:no-output-rename
        this.listBoxId = util_1.guid();
        this.optionPrefix = util_1.guid();
        this.onChangeCallback = function (_value) { };
        this.onTouchedCallback = function (_) { };
        this.popupMouseDownHandler = function (event) { return event.preventDefault(); };
        this._popupSettings = { height: 200, animate: true };
        this._open = false;
        this._value = "";
        this._isFocused = false;
        this.direction = rtl ? 'rtl' : 'ltr';
        this.wrapper = wrapper.nativeElement;
        this.data = [];
        this.subscribeEvents();
        this.selectionService.resetSelection([-1]);
    }
    Object.defineProperty(AutoCompleteComponent.prototype, "width", {
        get: function () {
            var wrapperOffsetWidth = 0;
            if (util_1.isDocumentAvailable()) {
                wrapperOffsetWidth = this.wrapper.offsetWidth;
            }
            var width = this.popupSettings.width || wrapperOffsetWidth;
            var minWidth = isNaN(wrapperOffsetWidth) ? wrapperOffsetWidth : wrapperOffsetWidth + "px";
            var maxWidth = isNaN(width) ? width : width + "px";
            return { min: minWidth, max: maxWidth };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteComponent.prototype, "height", {
        get: function () {
            return this.popupSettings.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteComponent.prototype, "listContainerClasses", {
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
    Object.defineProperty(AutoCompleteComponent.prototype, "suggestion", {
        get: function () {
            if (!this.value || !this.suggestedText) {
                this.suggestedText = undefined;
                return;
            }
            var hasMatch = this.suggestedText.toLowerCase().startsWith(this.value.toLowerCase());
            var shouldSuggest = this.suggest && !this.backspacePressed;
            if (shouldSuggest && hasMatch) {
                return this.suggestedText;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteComponent.prototype, "popupOpen", {
        get: function () {
            return this._open;
        },
        set: function (open) {
            if (this.disabled || this.popupOpen === open) {
                return;
            }
            var eventArgs = new preventable_event_1.PreventableEvent();
            if (open && !this.popupOpen) {
                this.open.emit(eventArgs);
            }
            if (!open && this.popupOpen) {
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
    Object.defineProperty(AutoCompleteComponent.prototype, "activeDescendant", {
        get: function () {
            return this.optionPrefix + "-" + this.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        /**
         * Sets the data of the AutoComplete.
         *
         * > The data has to be provided in an array-like list.
         */
        set: function (data) {
            this._data = data || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        /**
         * Sets the value of the AutoComplete.
         *
         */
        set: function (newValue) {
            this.verifySettings(newValue);
            this._value = newValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteComponent.prototype, "popupSettings", {
        get: function () {
            return this._popupSettings;
        },
        /**
         * Configures the popup of the AutoComplete.
         *
         * The available options are:
         * - `animation: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
         * - `width: Number | String`&mdash;Sets the width of the popup container. By default, the width of the host element is used  If set to `auto`, the component automatically adjusts the width of the popup, so no item labels are wrapped.
         * - `height: Number`&mdash;Sets the height of the popup container. By default, the height is 200px.
         * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
         */
        set: function (settings) {
            this._popupSettings = Object.assign({ height: 200, animate: true }, settings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteComponent.prototype, "widgetClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteComponent.prototype, "isFocused", {
        get: function () {
            return this._isFocused;
        },
        set: function (isFocused) {
            this._isFocused = isFocused;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteComponent.prototype, "isDisabled", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteComponent.prototype, "widgetHeight", {
        get: function () {
            return this.popupSettings.height + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    AutoCompleteComponent.prototype.ngOnDestroy = function () {
        this._toggle(false);
        this.unsubscribeEvents();
    };
    AutoCompleteComponent.prototype.ngOnChanges = function (_changes) {
        var shouldSuggest = this.suggest && this.data && this.data.length && this.value;
        if (shouldSuggest) {
            this.suggestedText = util_1.getter(this.data[0], this.valueField);
        }
    };
    /**
     * Toggles the visibility of the popup. If you use the `toggle` method to open or close the popup, the `open` and `close` events will not be fired.
     *
     * @param open - The state of the popup.
     */
    AutoCompleteComponent.prototype.toggle = function (open) {
        var _this = this;
        Promise.resolve(null).then(function () {
            _this._toggle((open === undefined) ? !_this._open : open);
        });
    };
    Object.defineProperty(AutoCompleteComponent.prototype, "isOpen", {
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
     * Resets the value of the AutoComplete.
     */
    AutoCompleteComponent.prototype.reset = function () {
        this._previousValue = undefined;
        this.value = undefined;
    };
    /**
     * @hidden
     */
    AutoCompleteComponent.prototype.clearValue = function (event) {
        event.stopImmediatePropagation();
        if (this.filterable) {
            this.filterChange.emit("");
        }
        if (this._previousValue !== undefined) {
            this._previousValue = this.value;
        }
        this.change(undefined);
        this.selectionService.resetSelection([]);
    };
    /**
     * @hidden
     */
    AutoCompleteComponent.prototype.writeValue = function (value) {
        this._previousValue = this.value;
        this.value = value;
    };
    /**
     * @hidden
     */
    AutoCompleteComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @hidden
     */
    AutoCompleteComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @hidden
     */
    AutoCompleteComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @hidden
     */
    AutoCompleteComponent.prototype.popupOpened = function () {
        this.popupWidth = this.width.max;
        this.popupMinWidth = this.width.min;
    };
    /**
     * Focuses the AutoComplete component.
     */
    AutoCompleteComponent.prototype.focus = function () {
        if (!this.disabled) {
            this.searchbar.focus();
        }
    };
    /**
     * Blurs the AutoComplete component.
     */
    AutoCompleteComponent.prototype.blur = function () {
        if (!this.disabled) {
            this.searchbar.blur();
        }
    };
    /**
     * @hidden
     */
    AutoCompleteComponent.prototype.onResize = function () {
        if (this._open) {
            var popupWrapper = this.popupRef.popupElement;
            var _a = this.width, min = _a.min, max = _a.max;
            popupWrapper.style.minWidth = min;
            popupWrapper.style.width = max;
        }
    };
    AutoCompleteComponent.prototype.verifySettings = function (newValue) {
        if (!core_1.isDevMode()) {
            return;
        }
        if (util_1.isPresent(newValue) && typeof newValue !== "string") {
            throw new Error("Expected value of type string. See http://www.telerik.com/kendo-angular-ui/components/dropdowns/autocomplete/#toc-value");
        }
    };
    AutoCompleteComponent.prototype.search = function (text) {
        var _this = this;
        var index = this.data.findIndex(function (item) {
            var itemText = util_1.getter(item, _this.valueField);
            itemText = itemText === undefined ? "" : itemText.toString().toLowerCase();
            return itemText.startsWith(text.toLowerCase());
        });
        this.selectionService.focus(index);
        if (this.suggest) {
            this.suggestedText = util_1.getter(this.data[index], this.valueField);
        }
    };
    AutoCompleteComponent.prototype.navigate = function (index) {
        if (!this.popupOpen) {
            return;
        }
        if (index < 0 || index > this.data.length) {
            index = 0;
        }
        this.selectionService.focus(index);
    };
    /**
     * @hidden
     */
    AutoCompleteComponent.prototype.handleNavigate = function (event) {
        var focused = isNaN(this.selectionService.focused) ? 0 : this.selectionService.focused;
        var hasFocused = util_1.isPresent(focused);
        var offset = 0;
        if (this.disabled) {
            return;
        }
        if (!hasFocused) {
            if (event.keyCode === keys_1.Keys.down) {
                offset = -1;
            }
            else if (event.keyCode === keys_1.Keys.up) {
                offset = 1;
            }
        }
        var action = this.navigationService.process({
            current: focused + offset,
            max: this.data.length - 1,
            min: 0,
            originalEvent: event
        });
        if (action !== navigation_action_1.NavigationAction.Undefined &&
            action !== navigation_action_1.NavigationAction.Backspace &&
            action !== navigation_action_1.NavigationAction.Delete &&
            action !== navigation_action_1.NavigationAction.Home &&
            action !== navigation_action_1.NavigationAction.End &&
            action !== navigation_action_1.NavigationAction.Left &&
            action !== navigation_action_1.NavigationAction.Right &&
            ((action === navigation_action_1.NavigationAction.Enter && this.popupOpen) || action !== navigation_action_1.NavigationAction.Enter)) {
            event.preventDefault();
        }
    };
    AutoCompleteComponent.prototype.handleEnter = function (event) {
        var focused = this.selectionService.focused;
        var value;
        if (this.popupOpen) {
            event.originalEvent.preventDefault();
        }
        if (focused >= 0) {
            value = util_1.getter(this.data[focused], this.valueField);
        }
        else {
            var match = this.suggest && this.suggestedText && this.data.length &&
                util_1.getter(this.data[0], this.valueField, true).toLowerCase() === this.searchbar.value.toLowerCase();
            if (this.popupOpen && match) {
                value = this.suggestedText;
            }
            else {
                value = this.searchbar.value;
            }
        }
        this.change(value);
    };
    /**
     * @hidden
     */
    AutoCompleteComponent.prototype.searchBarChange = function (text) {
        var currentTextLength = this.value ? this.value.length : 0;
        this.backspacePressed = (text.length < currentTextLength) ? true : false;
        this.value = text;
        this.popupOpen = text.length > 0;
        if (this.filterable) {
            this.selectionService.focused = -1;
            this.filterChange.emit(text);
        }
        else {
            this.search(text);
        }
    };
    /**
     * @hidden
     */
    AutoCompleteComponent.prototype.handleFocus = function () {
        this._previousValue = this.value;
        this.isFocused = true;
        this.onFocus.emit();
    };
    /**
     * @hidden
     */
    AutoCompleteComponent.prototype.handleBlur = function () {
        if (this.value === undefined) {
            this.popupOpen = false;
            this.isFocused = false;
            this.onBlur.emit();
            this.onTouchedCallback();
            return;
        }
        var focused = this.selectionService.focused;
        var dataItem;
        var text;
        var value = this.value;
        if (focused !== -1) {
            dataItem = this.data[focused];
            text = util_1.getter(dataItem, this.valueField) || "";
        }
        else {
            text = this.searchbar.value;
        }
        if (text === this.searchbar.value) {
            value = text;
        }
        else if (text && text.toLowerCase() === this.searchbar.value.toLowerCase()) {
            this.selectionService.resetSelection([]);
            value = this.searchbar.value;
        }
        this.change(value);
        this.popupOpen = false;
        this.isFocused = false;
        this.onBlur.emit();
        this.onTouchedCallback();
    };
    AutoCompleteComponent.prototype.change = function (candidate) {
        this.popupOpen = false;
        if (candidate === this._previousValue) {
            this.value = candidate;
            return;
        }
        this.value = candidate;
        this._previousValue = this.value;
        this.onChangeCallback(this.value);
        this.valueChange.emit(this.value);
    };
    AutoCompleteComponent.prototype.subscribeEvents = function () {
        var _this = this;
        if (!util_1.isDocumentAvailable()) {
            return;
        }
        this.changeSubscribtion = this.selectionService.onChange.subscribe(this.handleItemChange.bind(this));
        this.focusSubscribtion = this.selectionService.onFocus.subscribe(this.handleItemFocus.bind(this));
        this.navigationSubscribtion = Observable_1.Observable.merge(this.navigationService.up, this.navigationService.down).subscribe(function (event) { return _this.navigate(event.index); });
        this.closeSubscription = this.navigationService.close.subscribe(function () { return _this.popupOpen = false; });
        this.enterSubscription = this.navigationService.enter.subscribe(this.handleEnter.bind(this));
        this.escSubscription = this.navigationService.esc.subscribe(this.handleBlur.bind(this));
    };
    AutoCompleteComponent.prototype.unsubscribeEvents = function () {
        if (!util_1.isDocumentAvailable()) {
            return;
        }
        this.changeSubscribtion.unsubscribe();
        this.navigationSubscribtion.unsubscribe();
        this.closeSubscription.unsubscribe();
        this.enterSubscription.unsubscribe();
        this.escSubscription.unsubscribe();
    };
    AutoCompleteComponent.prototype.handleItemChange = function (event) {
        var index = event.indices.length ? event.indices[0] : undefined;
        this.selectionService.resetSelection([-1]);
        if (!util_1.isPresent(index)) {
            return;
        }
        var text = util_1.getter(this.data[index], this.valueField);
        this.change(text);
    };
    AutoCompleteComponent.prototype.handleItemFocus = function (_event) {
        var focused = this.selectionService.focused;
        var shouldSuggest = Boolean(this.suggest && this.data && this.data.length && focused >= 0);
        if (shouldSuggest) {
            this.suggestedText = util_1.getter(this.data[focused], this.valueField);
        }
    };
    AutoCompleteComponent.prototype._toggle = function (open) {
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
            this.popupRef.popupAnchorViewportLeave.subscribe(function () { return _this.popupOpen = false; });
        }
    };
    return AutoCompleteComponent;
}());
AutoCompleteComponent.decorators = [
    { type: core_1.Component, args: [{
                exportAs: 'kendoAutoComplete',
                providers: [exports.AUTOCOMPLETE_VALUE_ACCESSOR, selection_service_1.SelectionService, navigation_service_1.NavigationService],
                selector: 'kendo-autocomplete',
                template: "\n        <kendo-searchbar #searchbar\n            [role]=\"'textbox'\"\n            [id]=\"listBoxId\"\n            [activeDescendant]=\"activeDescendant\"\n            [userInput]=\"value\"\n            [suggestedText]=\"suggestion\"\n            [disabled]=\"disabled\"\n            [tabIndex]=\"tabIndex\"\n            [popupOpen]=\"popupOpen\"\n            [placeholder]=\"placeholder\"\n            (onNavigate)=\"handleNavigate($event)\"\n            (valueChange)=\"searchBarChange($event)\"\n            (onBlur)=\"handleBlur()\"\n            (onFocus)=\"handleFocus()\"\n        ></kendo-searchbar>\n        <span *ngIf=\"!loading && (clearButton && value?.length)\" class=\"k-icon k-clear-value k-i-close\" title=\"clear\" role=\"button\" tabindex=\"-1\" (click)=\"clearValue($event)\" (mousedown)=\"$event.preventDefault()\">\n</span>\n        <span *ngIf=\"loading\" class=\"k-icon k-i-loading\"></span>\n        <ng-template #popupTemplate>\n            <!--header template-->\n            <ng-template *ngIf=\"headerTemplate\"\n                [templateContext]=\"{\n                    templateRef: headerTemplate.templateRef\n                }\">\n            </ng-template>\n            <!--list-->\n            <kendo-list\n                [id]=\"listBoxId\"\n                [optionPrefix]=\"optionPrefix\"\n                [data]=\"data\"\n                [textField]=\"valueField\"\n                [valueField]=\"valueField\"\n                [template]=\"template\"\n                [height]=\"height\"\n                [show]=\"popupOpen\"\n            >\n            </kendo-list>\n            <!--no-data template-->\n            <div class=\"k-nodata\" *ngIf=\"data.length === 0\">\n                <ng-template [ngIf]=\"noDataTemplate\"\n                    [templateContext]=\"{\n                        templateRef: noDataTemplate?.templateRef\n                    }\">\n                </ng-template>\n                <ng-template [ngIf]=\"!noDataTemplate\">\n                    <div>NO DATA FOUND.</div>\n                </ng-template>\n            </div>\n            <!--footer template-->\n            <ng-template *ngIf=\"footerTemplate\"\n                [templateContext]=\"{\n                    templateRef: footerTemplate.templateRef\n                }\">\n            </ng-template>\n        </ng-template>\n        <kendo-resize-sensor (resize)=\"onResize()\"></kendo-resize-sensor>\n  "
            },] },
];
/** @nocollapse */
AutoCompleteComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [kendo_angular_l10n_1.RTL,] },] },
    { type: kendo_angular_popup_1.PopupService, },
    { type: selection_service_1.SelectionService, },
    { type: navigation_service_1.NavigationService, },
    { type: core_1.ElementRef, },
]; };
AutoCompleteComponent.propDecorators = {
    'data': [{ type: core_1.Input },],
    'value': [{ type: core_1.Input },],
    'valueField': [{ type: core_1.Input },],
    'placeholder': [{ type: core_1.Input },],
    'popupSettings': [{ type: core_1.Input },],
    'loading': [{ type: core_1.Input },],
    'clearButton': [{ type: core_1.Input },],
    'suggest': [{ type: core_1.Input },],
    'disabled': [{ type: core_1.Input },],
    'tabIndex': [{ type: core_1.Input },],
    'filterable': [{ type: core_1.Input },],
    'valueChange': [{ type: core_1.Output },],
    'filterChange': [{ type: core_1.Output },],
    'open': [{ type: core_1.Output },],
    'close': [{ type: core_1.Output },],
    'onFocus': [{ type: core_1.Output, args: ['focus',] },],
    'onBlur': [{ type: core_1.Output, args: ['blur',] },],
    'template': [{ type: core_1.ContentChild, args: [item_template_directive_1.ItemTemplateDirective,] },],
    'headerTemplate': [{ type: core_1.ContentChild, args: [header_template_directive_1.HeaderTemplateDirective,] },],
    'footerTemplate': [{ type: core_1.ContentChild, args: [footer_template_directive_1.FooterTemplateDirective,] },],
    'noDataTemplate': [{ type: core_1.ContentChild, args: [no_data_template_directive_1.NoDataTemplateDirective,] },],
    'popupTemplate': [{ type: core_1.ViewChild, args: ['popupTemplate',] },],
    'searchbar': [{ type: core_1.ViewChild, args: [searchbar_component_1.SearchBarComponent,] },],
    'widgetClasses': [{ type: core_1.HostBinding, args: ['class.k-widget',] }, { type: core_1.HostBinding, args: ['class.k-autocomplete',] }, { type: core_1.HostBinding, args: ['class.k-header',] },],
    'isFocused': [{ type: core_1.HostBinding, args: ['class.k-state-focused',] },],
    'isDisabled': [{ type: core_1.HostBinding, args: ['class.k-state-disabled',] },],
    'widgetHeight': [{ type: core_1.HostBinding, args: ['style.max-height',] },],
    'dir': [{ type: core_1.HostBinding, args: ['attr.dir',] },],
};
exports.AutoCompleteComponent = AutoCompleteComponent;
