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
// tslint:disable:no-access-missing-member
import { Component, ChangeDetectorRef, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core';
import { PagerElementComponent } from './pager-element.component';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PagerContextService } from "./pager-context.service";
/**
 * Displays a drop-down list for the page size selection.
 */
var PagerPageSizesComponent = (function (_super) {
    __extends(PagerPageSizesComponent, _super);
    function PagerPageSizesComponent(localization, cd, pagerContext) {
        var _this = _super.call(this, localization, pagerContext) || this;
        _this.cd = cd;
        _this.pagerContext = pagerContext;
        return _this;
    }
    Object.defineProperty(PagerPageSizesComponent.prototype, "classes", {
        /**
         * @hidden
         *
         * @readonly
         * @type {boolean}
         * @memberOf PagerPageSizesComponent
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerPageSizesComponent.prototype, "showInitialPageSize", {
        /**
         * @hidden
         *
         * @readonly
         * @type {boolean}
         * @memberOf PagerPageSizesComponent
         */
        get: function () {
            var _this = this;
            return this.pageSizes
                .filter(function (num) { return num === Number(_this.pageSize); })
                .length === 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     *
     * @param {*} value
     *
     * @memberOf PagerPageSizesComponent
     */
    PagerPageSizesComponent.prototype.pageSizeChange = function (value) {
        this.pageSize = parseInt(value, 10);
        this.pagerContext.changePageSize(this.pageSize);
    };
    PagerPageSizesComponent.prototype.onChanges = function (_a) {
        var total = _a.total, skip = _a.skip, pageSize = _a.pageSize;
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    };
    return PagerPageSizesComponent;
}(PagerElementComponent));
export { PagerPageSizesComponent };
PagerPageSizesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-pager-page-sizes',
                template: "\n        <select #select (change)=\"pageSizeChange(select.value)\">\n            <option *ngIf=\"showInitialPageSize\" [value]=\"pageSize\">{{pageSize}}</option>\n            <option *ngFor=\"let page of pageSizes\" [value]=\"page\" [selected]=\"page === pageSize ? true : undefined\">\n                {{page}}\n            </option>\n        </select>\n        {{textFor('pagerItemsPerPage')}}\n    "
            },] },
];
/** @nocollapse */
PagerPageSizesComponent.ctorParameters = function () { return [
    { type: LocalizationService, },
    { type: ChangeDetectorRef, },
    { type: PagerContextService, },
]; };
PagerPageSizesComponent.propDecorators = {
    'pageSizes': [{ type: Input },],
    'classes': [{ type: HostBinding, args: ["class.k-pager-sizes",] }, { type: HostBinding, args: ["class.k-label",] },],
};
