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
 * Represents the `EndsWith` (**Ends with**) string filter operator.
 */
var EndsWithFilterOperatorComponent = (function (_super) {
    __extends(EndsWithFilterOperatorComponent, _super);
    function EndsWithFilterOperatorComponent(localization) {
        return _super.call(this, "endswith", localization) || this;
    }
    return EndsWithFilterOperatorComponent;
}(FilterOperatorBase));
export { EndsWithFilterOperatorComponent };
EndsWithFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(function () { return EndsWithFilterOperatorComponent; }) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-filter-endswith-operator',
                template: ""
            },] },
];
/** @nocollapse */
EndsWithFilterOperatorComponent.ctorParameters = function () { return [
    { type: LocalizationService, },
]; };
