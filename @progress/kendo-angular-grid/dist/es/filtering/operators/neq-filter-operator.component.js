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
 * Represents the `NotEqual` (**Is not equal to**) filter operator.
 */
var NotEqualFilterOperatorComponent = (function (_super) {
    __extends(NotEqualFilterOperatorComponent, _super);
    function NotEqualFilterOperatorComponent(localization) {
        return _super.call(this, "neq", localization) || this;
    }
    return NotEqualFilterOperatorComponent;
}(FilterOperatorBase));
export { NotEqualFilterOperatorComponent };
NotEqualFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(function () { return NotEqualFilterOperatorComponent; }) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-filter-neq-operator',
                template: ""
            },] },
];
/** @nocollapse */
NotEqualFilterOperatorComponent.ctorParameters = function () { return [
    { type: LocalizationService, },
]; };
