"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/operator/map");
require("rxjs/add/operator/merge");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/do");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/debounceTime");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var row_height_service_1 = require("./row-height.service");
var scroller_service_1 = require("./scroller.service");
var utils_1 = require("./utils");
var details_service_1 = require("./details.service");
var columns_container_1 = require("./columns-container");
var change_notification_service_1 = require("./change-notification.service");
var row_sync_1 = require("./row-sync");
var suspend_service_1 = require("./suspend.service");
var groups_service_1 = require("./grouping/groups.service");
var column_common_1 = require("./column-common");
var scroll_sync_service_1 = require("./scroll-sync.service");
/**
 * @hidden
 */
exports.SCROLLER_FACTORY_TOKEN = new core_1.OpaqueToken('grid-scroll-service-factory');
/**
 * @hidden
 */
function DEFAULT_SCROLLER_FACTORY(observable) {
    return new scroller_service_1.ScrollerService(observable);
}
exports.DEFAULT_SCROLLER_FACTORY = DEFAULT_SCROLLER_FACTORY;
var wheelDeltaY = function (e) {
    var deltaY = e.wheelDeltaY;
    if (e.wheelDelta && (deltaY === undefined || deltaY)) {
        return e.wheelDelta;
    }
    else if (e.detail && e.axis === e.VERTICAL_AXIS) {
        return (-e.detail) * 10;
    }
    return 0;
};
var preventLockedScroll = function (el) { return function (event) {
    if (el.scrollHeight > el.offsetHeight + el.scrollTop && el.scrollTop > 0) {
        event.preventDefault();
    }
}; };
var translateY = function (renderer, value) { return function (el) { return renderer.setStyle(el, "transform", "translateY(" + value + "px)"); }; };
var firstChild = function (el) { return el ? el.nativeElement.children[0] : null; };
/**
 * @hidden
 */
var ListComponent = (function () {
    function ListComponent(scrollerFactory, detailsService, changeNotification, suspendService, rtl, groupsService, ngZone, renderer, scrollSyncService) {
        if (rtl === void 0) { rtl = false; }
        var _this = this;
        this.changeNotification = changeNotification;
        this.suspendService = suspendService;
        this.rtl = rtl;
        this.groupsService = groupsService;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.scrollSyncService = scrollSyncService;
        this.groups = [];
        this.skip = 0;
        this.columns = new columns_container_1.ColumnsContainer(function () { return []; });
        this.groupable = false;
        this.pageChange = new core_1.EventEmitter();
        this.dispatcher = new Subject_1.Subject();
        this.scroller = scrollerFactory(this.dispatcher);
        this.subscriptions = detailsService.changes.subscribe(function (x) { return _this.detailExpand(x); });
    }
    Object.defineProperty(ListComponent.prototype, "hostClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "showFooter", {
        get: function () {
            return this.groupable && this.groupable.showFooter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "lockedLeafColumns", {
        get: function () {
            return this.columns.lockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "nonLockedLeafColumns", {
        get: function () {
            return this.columns.nonLockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "lockedWidth", {
        get: function () {
            var groupCellsWidth = this.groups.length * 30;
            return column_common_1.expandColumns(this.lockedLeafColumns.toArray()).reduce(function (prev, curr) { return prev + (curr.width || 0); }, groupCellsWidth);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "nonLockedWidth", {
        get: function () {
            var nonLockedLeafColumns = this.nonLockedLeafColumns;
            if (this.lockedLeafColumns.length) {
                return column_common_1.expandColumns(nonLockedLeafColumns.toArray()).reduce(function (prev, curr) { return prev + (curr.width || 0); }, 0);
            }
            if (this.rtl) {
                return column_common_1.expandColumns(nonLockedLeafColumns.toArray()).reduce(function (prev, curr) { return prev + curr.width; }, 0) || "100%";
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "isLocked", {
        get: function () {
            return this.lockedLeafColumns.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    ListComponent.prototype.ngOnInit = function () {
        this.init();
        this.handleRowSync();
    };
    ListComponent.prototype.ngOnChanges = function (changes) {
        if (utils_1.isChanged("total", changes)) {
            this.init();
        }
        if (utils_1.isChanged("skip", changes) && !this.rebind) {
            this.skipScroll = true;
            this.container.nativeElement.scrollTop = this.rowHeightService.offset(this.skip);
        }
        this.rebind = false;
    };
    ListComponent.prototype.ngAfterViewInit = function () {
        this.container.nativeElement.scrollTop = this.rowHeightService.offset(this.skip);
        this.attachContainerScroll();
    };
    ListComponent.prototype.syncRowsHeight = function () {
        if (this.lockedContainer) {
            row_sync_1.syncRowsHeight(this.lockedContainer.nativeElement.children[0], this.container.nativeElement.children[0]);
        }
    };
    ListComponent.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
        if (this.scroller) {
            this.scroller.destroy();
        }
    };
    ListComponent.prototype.init = function () {
        if (this.suspendService.scroll) {
            return;
        }
        this.rowHeightService = new row_height_service_1.RowHeightService(this.total, this.rowHeight, this.detailRowHeight);
        this.totalHeight = this.rowHeightService.totalHeight();
        if (!utils_1.isUniversal()) {
            this.ngZone.runOutsideAngular(this.createScroller.bind(this));
        }
    };
    ListComponent.prototype.detailExpand = function (_a) {
        var index = _a.index, expand = _a.expand;
        if (expand) {
            this.rowHeightService.expandDetail(index);
        }
        else {
            this.rowHeightService.collapseDetail(index);
        }
        this.totalHeight = this.rowHeightService.totalHeight();
    };
    ListComponent.prototype.attachContainerScroll = function () {
        var _this = this;
        if (!utils_1.isUniversal()) {
            this.ngZone.runOutsideAngular(function () {
                return _this.subscriptions.add(Observable_1.Observable.fromEvent(_this.container.nativeElement, 'scroll')
                    .map(function (event) { return event.target; })
                    .filter(function () { return !_this.suspendService.scroll; })
                    .do(_this.onContainerScroll.bind(_this))
                    .subscribe(_this.dispatcher));
            });
            this.scrollSyncService.registerEmitter(this.container.nativeElement, "body");
            if (this.lockedContainer) {
                this.subscriptions.add(Observable_1.Observable.fromEvent(this.lockedContainer.nativeElement, 'mousewheel')
                    .merge(Observable_1.Observable.fromEvent(this.lockedContainer.nativeElement, 'DOMMouseScroll'))
                    .filter(function (event) { return !event.ctrlKey; })
                    .do(preventLockedScroll(this.container.nativeElement))
                    .map(wheelDeltaY)
                    .subscribe(function (x) { return _this.container.nativeElement.scrollTop -= x; }));
                this.syncRowsHeight();
            }
        }
    };
    ListComponent.prototype.createScroller = function () {
        var _this = this;
        var observable = this.scroller
            .create(this.rowHeightService, this.skip, this.take, this.total);
        this.subscriptions.add(observable
            .filter(function (x) { return x instanceof scroller_service_1.PageAction; })
            .filter(function () {
            var temp = _this.skipScroll;
            _this.skipScroll = false;
            return !temp;
        })
            .do(function () { return _this.rebind = true; })
            .subscribe(function (x) { return _this.ngZone.run(function () { return _this.pageChange.emit(x); }); })
            .add(observable
            .filter(function (x) { return x instanceof scroller_service_1.ScrollAction; })
            .subscribe(this.scroll.bind(this))));
    };
    ListComponent.prototype.scroll = function (_a) {
        var offset = _a.offset;
        [
            firstChild(this.container),
            firstChild(this.lockedContainer)
        ].filter(utils_1.isPresent).forEach(translateY(this.renderer, offset));
    };
    ListComponent.prototype.onContainerScroll = function (_a) {
        var scrollTop = _a.scrollTop;
        if (this.lockedContainer) {
            this.lockedContainer.nativeElement.scrollTop = scrollTop;
        }
    };
    ListComponent.prototype.handleRowSync = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            return _this.subscriptions.add(_this.changeNotification.changes
                .merge(_this.groupsService.changes.switchMap(function () { return _this.ngZone.onStable.take(1); }))
                .filter(function () { return utils_1.isPresent(_this.lockedContainer); })
                .subscribe(function () { return _this.syncRowsHeight(); }));
        });
    };
    return ListComponent;
}());
ListComponent.decorators = [
    { type: core_1.Component, args: [{
                providers: [
                    {
                        provide: exports.SCROLLER_FACTORY_TOKEN,
                        useValue: DEFAULT_SCROLLER_FACTORY
                    }
                ],
                selector: 'kendo-grid-list',
                template: "\n    <div #lockedContainer class=\"k-grid-content-locked\"\n        *ngIf=\"isLocked\" [style.width.px]=\"lockedWidth\">\n        <table>\n            <colgroup kendoGridColGroup\n                [groups]=\"groups\"\n                [columns]=\"lockedLeafColumns\"\n                [detailTemplate]=\"detailTemplate\">\n            </colgroup>\n            <tbody kendoGridTableBody\n                [groups]=\"groups\"\n                [data]=\"data\"\n                [noRecordsText]=\"''\"\n                [columns]=\"lockedLeafColumns\"\n                [detailTemplate]=\"detailTemplate\"\n                [showGroupFooters]=\"showFooter\"\n                [skip]=\"skip\"\n                [selectable]=\"selectable\"\n                [rowClass]=\"rowClass\">\n            </tbody>\n        </table>\n        <div class=\"k-height-container\">\n            <div [style.height.px]=\"totalHeight\"></div>\n        </div>\n    </div><div #container class=\"k-grid-content k-virtual-content\"\n        [kendoGridResizableContainer]=\"lockedLeafColumns.length\"\n        [lockedWidth]=\"lockedWidth + 1\">\n        <table [style.width.px]=\"nonLockedWidth\">\n            <colgroup kendoGridColGroup\n                [groups]=\"isLocked ? [] : groups\"\n                [columns]=\"nonLockedLeafColumns\"\n                [detailTemplate]=\"detailTemplate\">\n            </colgroup>\n            <tbody kendoGridTableBody\n                [skipGroupDecoration]=\"isLocked\"\n                [data]=\"data\"\n                [groups]=\"groups\"\n                [showGroupFooters]=\"showFooter\"\n                [columns]=\"nonLockedLeafColumns\"\n                [detailTemplate]=\"detailTemplate\"\n                [noRecordsTemplate]=\"noRecordsTemplate\"\n                [lockedColumnsCount]=\"lockedLeafColumns.length\"\n                [skip]=\"skip\"\n                [selectable]=\"selectable\"\n                [rowClass]=\"rowClass\">\n            </tbody>\n        </table>\n        <div class=\"k-height-container\">\n            <div [style.height.px]=\"totalHeight\"></div>\n        </div>\n    </div>"
            },] },
];
/** @nocollapse */
ListComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core_1.Inject, args: [exports.SCROLLER_FACTORY_TOKEN,] },] },
    { type: details_service_1.DetailsService, },
    { type: change_notification_service_1.ChangeNotificationService, },
    { type: suspend_service_1.SuspendService, },
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [kendo_angular_l10n_1.RTL,] },] },
    { type: groups_service_1.GroupsService, },
    { type: core_1.NgZone, },
    { type: core_1.Renderer2, },
    { type: scroll_sync_service_1.ScrollSyncService, },
]; };
ListComponent.propDecorators = {
    'hostClass': [{ type: core_1.HostBinding, args: ["class.k-grid-container",] },],
    'data': [{ type: core_1.Input },],
    'groups': [{ type: core_1.Input },],
    'total': [{ type: core_1.Input },],
    'rowHeight': [{ type: core_1.Input },],
    'detailRowHeight': [{ type: core_1.Input },],
    'take': [{ type: core_1.Input },],
    'skip': [{ type: core_1.Input },],
    'columns': [{ type: core_1.Input },],
    'detailTemplate': [{ type: core_1.Input },],
    'noRecordsTemplate': [{ type: core_1.Input },],
    'selectable': [{ type: core_1.Input },],
    'groupable': [{ type: core_1.Input },],
    'rowClass': [{ type: core_1.Input },],
    'pageChange': [{ type: core_1.Output },],
    'container': [{ type: core_1.ViewChild, args: ["container",] },],
    'lockedContainer': [{ type: core_1.ViewChild, args: ["lockedContainer",] },],
};
exports.ListComponent = ListComponent;
