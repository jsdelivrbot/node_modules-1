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
/*
 * Represents the `Greater` (**Is greater than**) numeric filter operator.
 */
var GreaterFilterOperatorComponent = (function (_super) {
    __extends(GreaterFilterOperatorComponent, _super);
    function GreaterFilterOperatorComponent(localization) {
        return _super.call(this, "gt", localization) || this;
    }
    return GreaterFilterOperatorComponent;
}(filter_operator_base_1.FilterOperatorBase));
GreaterFilterOperatorComponent.decorators = [
    { type: core_1.Component, args: [{
                providers: [
                    {
                        provide: filter_operator_base_1.FilterOperatorBase,
                        useExisting: core_1.forwardRef(function () { return GreaterFilterOperatorComponent; }) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-filter-gt-operator',
                template: ""
            },] },
];
/** @nocollapse */
GreaterFilterOperatorComponent.ctorParameters = function () { return [
    { type: kendo_angular_l10n_1.LocalizationService, },
]; };
exports.GreaterFilterOperatorComponent = GreaterFilterOperatorComponent;
