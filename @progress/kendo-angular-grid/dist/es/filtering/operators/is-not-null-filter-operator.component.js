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
/**
 * Represents the `IsNotNull` (**Is not null**) filter operator.
 */
var IsNotNullFilterOperatorComponent = (function (_super) {
    __extends(IsNotNullFilterOperatorComponent, _super);
    function IsNotNullFilterOperatorComponent(localization) {
        return _super.call(this, "isnotnull", localization) || this;
    }
    return IsNotNullFilterOperatorComponent;
}(FilterOperatorBase));
export { IsNotNullFilterOperatorComponent };
IsNotNullFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(function () { return IsNotNullFilterOperatorComponent; }) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-filter-isnotnull-operator',
                template: ""
            },] },
];
/** @nocollapse */
IsNotNullFilterOperatorComponent.ctorParameters = function () { return [
    { type: LocalizationService, },
]; };
