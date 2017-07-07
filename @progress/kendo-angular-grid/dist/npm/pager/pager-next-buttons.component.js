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
// tslint:disable: no-access-missing-member
var core_1 = require("@angular/core");
var pager_context_service_1 = require("./pager-context.service");
var pager_element_component_1 = require("./pager-element.component");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
/**
 * Displays buttons for navigating to the next and the last page.
 */
var PagerNextButtonsComponent = (function (_super) {
    __extends(PagerNextButtonsComponent, _super);
    function PagerNextButtonsComponent(localization, pagerContext, cd) {
        var _this = _super.call(this, localization, pagerContext) || this;
        _this.cd = cd;
        return _this;
    }
    Object.defineProperty(PagerNextButtonsComponent.prototype, "disabled", {
        /**
         * @hidden
         *
         * @readonly
         * @type {boolean}
         * @memberOf PagerNextButtonsComponent
         */
        get: function () {
            return this.currentPage === this.totalPages || !this.total;
        },
        enumerable: true,
        configurable: true
    });
    PagerNextButtonsComponent.prototype.onChanges = function (_a) {
        var total = _a.total, skip = _a.skip, pageSize = _a.pageSize;
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    };
    return PagerNextButtonsComponent;
}(pager_element_component_1.PagerElementComponent));
PagerNextButtonsComponent.decorators = [
    { type: core_1.Component, args: [{
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                selector: 'kendo-pager-next-buttons',
                template: "\n        <a href=\"#\"\n            [title]=\"textFor('pagerNextPage')\"\n            (click)=\"currentPage !== totalPages ? changePage(currentPage) : false\"\n            [ngClass]=\"{\n                'k-link': true,\n                'k-pager-nav': true,\n                'k-state-disabled': disabled,\n                '': true\n            }\">\n            <span [attr.aria-label]=\"textFor('pagerNextPage')\"\n                [ngClass]=\"{\n                    'k-icon':true,\n                    'k-i-arrow-e': true\n                }\">\n            </span>\n        </a>\n        <a href=\"#\"\n            [title]=\"textFor('pagerLastPage')\"\n            (click)=\"currentPage !== totalPages ? changePage(totalPages-1) : false\"\n            [ngClass]=\"{\n                'k-link': true,\n                'k-pager-nav': true,\n                'k-state-disabled': disabled,\n                'k-pager-last': true\n            }\">\n            <span [attr.aria-label]=\"textFor('pagerLastPage')\"\n                [ngClass]=\"{\n                    'k-icon':true,\n                    'k-i-seek-e': true\n                }\">\n            </span>\n        </a>\n    "
            },] },
];
/** @nocollapse */
PagerNextButtonsComponent.ctorParameters = function () { return [
    { type: kendo_angular_l10n_1.LocalizationService, },
    { type: pager_context_service_1.PagerContextService, },
    { type: core_1.ChangeDetectorRef, },
]; };
exports.PagerNextButtonsComponent = PagerNextButtonsComponent;
