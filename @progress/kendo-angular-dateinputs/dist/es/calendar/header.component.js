import { Component, ChangeDetectionStrategy, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { MonthViewService } from './services/month-view.service';
import { getDate } from '@progress/kendo-date-math';
import { isInRange } from '../util';
import { MIN_DATE, MAX_DATE } from '../defaults';
/**
 * @hidden
 */
var HeaderComponent = (function () {
    function HeaderComponent(service, localization) {
        this.service = service;
        this.localization = localization;
        this.isInRange = true;
        this.min = new Date(MIN_DATE);
        this.max = new Date(MAX_DATE);
        this.today = new EventEmitter();
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
        this.isInRange = isInRange(getDate(new Date()), this.min, this.max);
        this.todayMessage = this.localization.get('today');
    };
    HeaderComponent.prototype.handleTodayClick = function () {
        if (this.isInRange) {
            this.today.emit(getDate(new Date()));
        }
    };
    return HeaderComponent;
}());
export { HeaderComponent };
HeaderComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-calendar-header',
                template: "\n    <span class=\"k-title\">\n        {{title}}\n    </span>\n    <span class=\"k-today\" [class.k-state-disabled]=\"!isInRange\" (click)=\"handleTodayClick()\">\n        {{todayMessage}}\n    </span>\n  "
            },] },
];
/** @nocollapse */
HeaderComponent.ctorParameters = function () { return [
    { type: MonthViewService, },
    { type: LocalizationService, },
]; };
HeaderComponent.propDecorators = {
    'currentDate': [{ type: Input },],
    'min': [{ type: Input },],
    'max': [{ type: Input },],
    'today': [{ type: Output },],
    'getComponentClass': [{ type: HostBinding, args: ["class.k-calendar-header",] },],
};
