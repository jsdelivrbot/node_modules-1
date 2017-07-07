var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, forwardRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Messages } from './messages';
/**
 * Custom component messages override default component messages.
 */
var DatePickerCustomMessagesComponent = (function (_super) {
    __extends(DatePickerCustomMessagesComponent, _super);
    function DatePickerCustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(DatePickerCustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return DatePickerCustomMessagesComponent;
}(Messages));
export { DatePickerCustomMessagesComponent };
DatePickerCustomMessagesComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: Messages,
                        useExisting: forwardRef(function () { return DatePickerCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-datepicker-messages',
                template: ""
            },] },
];
/** @nocollapse */
DatePickerCustomMessagesComponent.ctorParameters = function () { return [
    { type: LocalizationService, },
]; };
