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
 * Represents the `StartsWith` (**Starts with**) filter operator.
 */
var StartsWithFilterOperatorComponent = (function (_super) {
    __extends(StartsWithFilterOperatorComponent, _super);
    function StartsWithFilterOperatorComponent(localization) {
        return _super.call(this, "startswith", localization) || this;
    }
    return StartsWithFilterOperatorComponent;
}(FilterOperatorBase));
export { StartsWithFilterOperatorComponent };
StartsWithFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(function () { return StartsWithFilterOperatorComponent; }) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-filter-startswith-operator',
                template: ""
            },] },
];
/** @nocollapse */
StartsWithFilterOperatorComponent.ctorParameters = function () { return [
    { type: LocalizationService, },
]; };
