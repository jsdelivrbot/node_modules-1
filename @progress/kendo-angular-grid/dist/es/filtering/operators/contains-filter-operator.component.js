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
import { FilterOperatorBase } from './filter-operator.base';
/**
 * Represents the `Contains` (**Contains**) filter operator.
 */
var ContainsFilterOperatorComponent = (function (_super) {
    __extends(ContainsFilterOperatorComponent, _super);
    function ContainsFilterOperatorComponent(localization) {
        return _super.call(this, "contains", localization) || this;
    }
    return ContainsFilterOperatorComponent;
}(FilterOperatorBase));
export { ContainsFilterOperatorComponent };
ContainsFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(function () { return ContainsFilterOperatorComponent; }) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-filter-contains-operator',
                template: ""
            },] },
];
/** @nocollapse */
ContainsFilterOperatorComponent.ctorParameters = function () { return [
    { type: LocalizationService, },
]; };
