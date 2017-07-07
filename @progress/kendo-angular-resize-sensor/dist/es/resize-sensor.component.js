import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, NgZone, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/auditTime';
/**
 * Emit up to 10 resize events per second by default.
 * Chosen as a compromise between responsiveness and performance.
 */
var DEFAULT_RATE_LIMIT = 10;
var computedProp = function (elem, prop) {
    return getComputedStyle(elem, null).getPropertyValue(prop);
};
var WRAP_STYLE = 'position: absolute; display: block; left: 0; top: 0; right: 0; bottom: 0; z-index: -1;' +
    'overflow: hidden; visibility: hidden;';
var EXPAND_CHILD_STYLE = 'position: absolute; left: 0; top: 0; transition: 0s;';
var SHRINK_CHILD_STYLE = EXPAND_CHILD_STYLE + 'width: 200%; height: 200%;';
/**
 * Resize Sensor Component
 *
 * Triggers a "resize" event whenever the parent DOM element size changes.
 */
var ResizeSensorComponent = (function () {
    function ResizeSensorComponent(element, zone, renderer) {
        this.element = element;
        this.zone = zone;
        this.renderer = renderer;
        /**
         * The maximum number of resize events to emit per second.
         *
         * Defaults to 10.
         */
        this.rateLimit = DEFAULT_RATE_LIMIT;
        /**
         * Fires when the parent DOM element has been resized.
         */
        this.resize = new EventEmitter();
        this.source = new Subject();
        this.initialized = false;
    }
    ResizeSensorComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            var scrollHandler = _this.scroll.bind(_this);
            var detachExpand = _this.renderer.listen(_this.expand.nativeElement, 'scroll', scrollHandler);
            var detachShrink = _this.renderer.listen(_this.shrink.nativeElement, 'scroll', scrollHandler);
            _this.detachScrollHandlers = function () {
                detachExpand();
                detachShrink();
            };
        });
    };
    ResizeSensorComponent.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (typeof document === 'undefined') {
            return;
        }
        if (this.initialized) {
            this.scroll();
            return;
        }
        var throttleTime = 1000 / (this.rateLimit || DEFAULT_RATE_LIMIT);
        this.subscription = this.source.asObservable()
            .auditTime(throttleTime)
            .subscribe(function () {
            _this.resize.emit();
        });
        this.parentElement = this.element.nativeElement.parentElement;
        if (computedProp(this.parentElement, 'position') === 'static') {
            this.parentElement.style.position = 'relative';
        }
        this.reset();
        this.lastWidth = this.parentElement.offsetWidth;
        this.lastHeight = this.parentElement.offsetHeight;
        this.initialized = true;
    };
    ResizeSensorComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.detachScrollHandlers) {
            this.detachScrollHandlers();
        }
    };
    /**
     * @hidden
     */
    ResizeSensorComponent.prototype.scroll = function (_event) {
        var _this = this;
        if (!this.parentElement) {
            return;
        }
        var width = this.parentElement.offsetWidth;
        var height = this.parentElement.offsetHeight;
        var sameSize = width === this.lastWidth && height === this.lastHeight;
        if (sameSize) {
            return;
        }
        this.lastWidth = width;
        this.lastHeight = height;
        this.zone.run(function () {
            _this.source.next();
            _this.reset();
        });
    };
    ResizeSensorComponent.prototype.reset = function () {
        var expandChild = this.expandChild.nativeElement;
        expandChild.style.width = 100000 + 'px';
        expandChild.style.height = 100000 + 'px';
        var expand = this.expand.nativeElement;
        expand.scrollLeft = 100000;
        expand.scrollTop = 100000;
        var shrink = this.shrink.nativeElement;
        shrink.scrollLeft = 100000;
        shrink.scrollTop = 100000;
    };
    return ResizeSensorComponent;
}());
export { ResizeSensorComponent };
ResizeSensorComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-resize-sensor',
                styles: [':host { ' + WRAP_STYLE + ' }'],
                template: '<div #expand style="' + WRAP_STYLE + '">' +
                    '  <div #expandChild style="' + EXPAND_CHILD_STYLE + '"></div>' +
                    '</div>' +
                    '<div #shrink style="' + WRAP_STYLE + '">' +
                    '  <div style="' + SHRINK_CHILD_STYLE + '"></div>' +
                    '</div>'
            },] },
];
/** @nocollapse */
ResizeSensorComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: NgZone, },
    { type: Renderer2, },
]; };
ResizeSensorComponent.propDecorators = {
    'rateLimit': [{ type: Input },],
    'resize': [{ type: Output },],
    'expand': [{ type: ViewChild, args: ['expand',] },],
    'expandChild': [{ type: ViewChild, args: ['expandChild',] },],
    'shrink': [{ type: ViewChild, args: ['shrink',] },],
};
