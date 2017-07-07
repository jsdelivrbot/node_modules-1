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
 * Represents the `Less` (**Is less than**) numeric filter operator.
 */
var LessFilterOperatorComponent = (function (_super) {
    __extends(LessFilterOperatorComponent, _super);
    function LessFilterOperatorComponent(localization) {
        return _super.call(this, "lt", localization) || this;
    }
    return LessFilterOperatorComponent;
}(filter_operator_base_1.FilterOperatorBase));
LessFilterOperatorComponent.decorators = [
    { type: core_1.Component, args: [{
                providers: [
                    {
                        provide: filter_operator_base_1.FilterOperatorBase,
                        useExisting: core_1.forwardRef(function () { return LessFilterOperatorComponent; }) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-filter-lt-operator',
                template: ""
            },] },
];
/** @nocollapse */
LessFilterOperatorComponent.ctorParameters = function () { return [
    { type: kendo_angular_l10n_1.LocalizationService, },
]; };
exports.LessFilterOperatorComponent = LessFilterOperatorComponent;
