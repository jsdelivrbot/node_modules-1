"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var month_view_service_1 = require("./services/month-view.service");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var util_1 = require("../util");
var defaults_1 = require("../defaults");
/**
 * @hidden
 */
var HeaderComponent = (function () {
    function HeaderComponent(service, localization) {
        this.service = service;
        this.localization = localization;
        this.isInRange = true;
        this.min = new Date(defaults_1.MIN_DATE);
        this.max = new Date(defaults_1.MAX_DATE);
        this.today = new core_1.EventEmitter();
    }
    Object.defineProperty(HeaderComponent.prototype, "getComponentClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    HeaderComponent.prototype.ngOnChanges = function (_) {
        this.title = this.currentDate ? this.service.title(this.currentDate) : '';
        this.isInRange = util_1.isInRange(kendo_date_math_1.getDate(new Date()), this.min, this.max);
        this.todayMessage = this.localization.get('today');
    };
    HeaderComponent.prototype.handleTodayClick = function () {
        if (this.isInRange) {
            this.today.emit(kendo_date_math_1.getDate(new Date()));
        }
    };
    return HeaderComponent;
}());
HeaderComponent.decorators = [
    { type: core_1.Component, args: [{
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                selector: 'kendo-calendar-header',
                template: "\n    <span class=\"k-title\">\n        {{title}}\n    </span>\n    <span class=\"k-today\" [class.k-state-disabled]=\"!isInRange\" (click)=\"handleTodayClick()\">\n        {{todayMessage}}\n    </span>\n  "
            },] },
];
/** @nocollapse */
HeaderComponent.ctorParameters = function () { return [
    { type: month_view_service_1.MonthViewService, },
    { type: kendo_angular_l10n_1.LocalizationService, },
]; };
HeaderComponent.propDecorators = {
    'currentDate': [{ type: core_1.Input },],
    'min': [{ type: core_1.Input },],
    'max': [{ type: core_1.Input },],
    'today': [{ type: core_1.Output },],
    'getComponentClass': [{ type: core_1.HostBinding, args: ["class.k-calendar-header",] },],
};
exports.HeaderComponent = HeaderComponent;
