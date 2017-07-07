import { Injectable } from '@angular/core';
import { DOMService } from './dom.service';
import { eitherRect, removeStackingOffset } from '../util';
/**
 * @hidden
 */
var AlignService = (function () {
    function AlignService(_dom) {
        this._dom = _dom;
    }
    AlignService.prototype.alignElement = function (settings) {
        var anchor = settings.anchor, element = settings.element, anchorAlign = settings.anchorAlign, elementAlign = settings.elementAlign, offset = settings.offset;
        var dom = this._dom;
        var elementRect = dom.offset(element);
        var anchorRect = removeStackingOffset(eitherRect(dom.offset(anchor), offset), dom.stackingElementOffset(element));
        if (!anchor) {
            anchorRect = dom.removeScroll(anchorRect, dom.scrollPosition(element));
        }
        return this._dom.align({
            anchorAlign: anchorAlign,
            anchorRect: anchorRect,
            elementAlign: elementAlign,
            elementRect: elementRect
        });
    };
    return AlignService;
}());
export { AlignService };
AlignService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AlignService.ctorParameters = function () { return [
    { type: DOMService, },
]; };
