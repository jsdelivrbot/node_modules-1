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
var filter_operator_base_1 = require("./filter-operator.base");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
/**
 * Represents the `IsNotNull` (**Is not null**) filter operator.
 */
var IsNotNullFilterOperatorComponent = (function (_super) {
    __extends(IsNotNullFilterOperatorComponent, _super);
    function IsNotNullFilterOperatorComponent(localization) {
        return _super.call(this, "isnotnull", localization) || this;
    }
    return IsNotNullFilterOperatorComponent;
}(filter_operator_base_1.FilterOperatorBase));
IsNotNullFilterOperatorComponent.decorators = [
    { type: core_1.Component, args: [{
                providers: [
                    {
                        provide: filter_operator_base_1.FilterOperatorBase,
                        useExisting: core_1.forwardRef(function () { return IsNotNullFilterOperatorComponent; }) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-filter-isnotnull-operator',
                template: ""
            },] },
];
/** @nocollapse */
IsNotNullFilterOperatorComponent.ctorParameters = function () { return [
    { type: kendo_angular_l10n_1.LocalizationService, },
]; };
exports.IsNotNullFilterOperatorComponent = IsNotNullFilterOperatorComponent;
