"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var Subscription_1 = require("rxjs/Subscription");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/observable/of");
/**
 * @hidden
 */
var ScrollSyncService = (function () {
    function ScrollSyncService(ngZone) {
        var _this = this;
        this.ngZone = ngZone;
        this.changes = new Subject_1.Subject();
        this.elements = [];
        this.subscriptions = new Subscription_1.Subscription(function () { });
        this.subscriptions.add(this.changes.subscribe(function (x) { return _this.scrollLeft(x); }));
    }
    ScrollSyncService.prototype.registerEmitter = function (el, sourceType) {
        var _this = this;
        if (this.elements.indexOf(el) !== -1) {
            return;
        }
        this.elements.push({ element: el, sourceType: sourceType });
        if (sourceType === "body" || sourceType === "header") {
            this.ngZone.runOutsideAngular(function () {
                var obs = Observable_1.Observable.fromEvent(el, "scroll")
                    .map(function (_a) {
                    var _b = _a.target, scrollLeft = _b.scrollLeft, scrollRight = _b.scrollRight;
                    return ({
                        scrollLeft: scrollLeft,
                        scrollRight: scrollRight,
                        sourceType: sourceType
                    });
                });
                _this.subscriptions.add(obs.filter(function (x) { return !_this.source || _this.source === x.sourceType; })
                    .do(function (x) { return _this.source = x.sourceType; })
                    .subscribe(function (x) { return _this.changes.next(x); }));
                _this.subscriptions.add(obs.filter(function (x) { return _this.source && _this.source !== x.sourceType; })
                    .subscribe(function () { return _this.source = undefined; }));
            });
        }
    };
    /**
     * destroy
     */
    ScrollSyncService.prototype.destroy = function () {
        this.subscriptions.unsubscribe();
    };
    ScrollSyncService.prototype.scrollLeft = function (_a) {
        var _this = this;
        var scrollLeft = _a.scrollLeft, sourceType = _a.sourceType;
        this.ngZone.runOutsideAngular(function () {
            _this.elements
                .filter(function (x) { return sourceType !== x.sourceType; })
                .forEach(function (_a) {
                var element = _a.element;
                return element.scrollLeft = scrollLeft;
            });
        });
    };
    return ScrollSyncService;
}());
ScrollSyncService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
ScrollSyncService.ctorParameters = function () { return [
    { type: core_1.NgZone, },
]; };
exports.ScrollSyncService = ScrollSyncService;
