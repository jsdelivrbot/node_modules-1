"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var messages_1 = require("./messages");
/**
 * @hidden
 */
var LocalizedMessagesDirective = (function (_super) {
    __extends(LocalizedMessagesDirective, _super);
    function LocalizedMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    return LocalizedMessagesDirective;
}(messages_1.Messages));
LocalizedMessagesDirective.decorators = [
    { type: core_1.Directive, args: [{
                providers: [
                    {
                        provide: messages_1.Messages,
                        useExisting: core_1.forwardRef(function () { return LocalizedMessagesDirective; }) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: '[kendoDateInputLocalizedMessages]'
            },] },
];
/** @nocollapse */
LocalizedMessagesDirective.ctorParameters = function () { return [
    { type: kendo_angular_l10n_1.LocalizationService, },
]; };
exports.LocalizedMessagesDirective = LocalizedMessagesDirective;
