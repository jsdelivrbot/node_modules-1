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
import { FilterOperatorBase } from './filter-operator.base';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/*
 * Represents the `Greater` (**Is greater than**) numeric filter operator.
 */
var GreaterFilterOperatorComponent = (function (_super) {
    __extends(GreaterFilterOperatorComponent, _super);
    function GreaterFilterOperatorComponent(localization) {
        return _super.call(this, "gt", localization) || this;
    }
    return GreaterFilterOperatorComponent;
}(FilterOperatorBase));
export { GreaterFilterOperatorComponent };
GreaterFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(function () { return GreaterFilterOperatorComponent; }) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-filter-gt-operator',
                template: ""
            },] },
];
/** @nocollapse */
GreaterFilterOperatorComponent.ctorParameters = function () { return [
    { type: LocalizationService, },
]; };
