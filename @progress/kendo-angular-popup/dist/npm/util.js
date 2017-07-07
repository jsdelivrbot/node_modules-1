"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
exports.eitherRect = function (rect, offset) {
    if (!rect) {
        return { height: 0, left: offset.left, top: offset.top, width: 0 };
    }
    return rect;
};
/**
 * @hidden
 */
exports.replaceOffset = function (rect, offset) {
    if (!offset) {
        return rect;
    }
    var result = {
        height: rect.height,
        left: offset.left,
        top: offset.top,
        width: rect.width
    };
    return result;
};
/**
 * @hidden
 */
exports.removeStackingOffset = function (rect, stackingOffset) {
    if (!stackingOffset) {
        return rect;
    }
    var result = {
        height: rect.height,
        left: rect.left - stackingOffset.left,
        top: rect.top - stackingOffset.top,
        width: rect.width
    };
    return result;
};
/**
 * @hidden
 */
exports.isDifferentOffset = function (oldOffset, newOffset) {
    var oldLeft = oldOffset.left, oldTop = oldOffset.top;
    var newLeft = newOffset.left, newTop = newOffset.top;
    return Math.abs(oldLeft - newLeft) >= 1 || Math.abs(oldTop - newTop) >= 1;
};
/**
 * @hidden
 */
exports.isDocumentAvailable = function () {
    return typeof document !== 'undefined' && !!document.body;
};
/**
 * @hidden
 */
exports.isWindowAvailable = function () {
    return typeof window !== 'undefined';
};
/**
 * @hidden
 */
exports.hasBoundingRect = function (elem) { return !!elem.getBoundingClientRect; };
/**
 * @hidden
 */
exports.OVERFLOW_REGEXP = /auto|scroll/;
/**
 * @hidden
 */
exports.scrollableParents = function (element) {
    var parents = [];
    if (!exports.isDocumentAvailable() || !exports.isWindowAvailable()) {
        return parents;
    }
    var parent = element.parentElement;
    while (parent) {
        if (exports.OVERFLOW_REGEXP.test(window.getComputedStyle(parent).overflow)) {
            parents.push(parent);
        }
        parent = parent.parentElement;
    }
    parents.push(window);
    return parents;
};
/**
 * @hidden
 */
exports.FRAME_DURATION = 1000 / 60; //1000ms divided by 60fps
/**
 * @hidden
 */
exports.hasRelativeStackingContext = function () {
    if (!exports.isDocumentAvailable()) {
        return false;
    }
    var top = 10;
    var parent = document.createElement("div");
    parent.style.transform = "matrix(10, 0, 0, 10, 0, 0)";
    parent.innerHTML = "<div style=\"position: fixed; top: " + top + "px;\">child</div>";
    document.body.appendChild(parent);
    var isDifferent = parent.children[0].getBoundingClientRect().top !== top;
    document.body.removeChild(parent);
    return isDifferent;
};
/**
 * @hidden
 */
exports.HAS_RELATIVE_STACKING_CONTEXT = exports.hasRelativeStackingContext();
var parents = function (element, until) {
    var result = [];
    var next = element.parentNode;
    while (next) {
        result.push(next);
        if (next === until) {
            break;
        }
        next = next.parentNode;
    }
    return result;
};
var siblings = function (element) {
    var result = [];
    var sibling = element.parentNode.firstElementChild;
    while (sibling) {
        if (sibling !== element) {
            result.push(sibling);
        }
        sibling = sibling.nextElementSibling;
    }
    return result;
};
var siblingContainer = function (anchor, container) {
    var parentElements = parents(anchor);
    var containerElement = container;
    var siblingElements;
    var result;
    while (containerElement) {
        siblingElements = siblings(containerElement);
        result = parentElements.reduce(function (list, p) { return list.concat(siblingElements.filter(function (s) { return s === p; })); }, [])[0];
        if (result) {
            break;
        }
        containerElement = containerElement.parentElement;
    }
    return result;
};
/**
 * @hidden
 */
exports.zIndex = function (anchor, container) {
    if (!anchor || !exports.isDocumentAvailable() || !exports.isWindowAvailable()) {
        return null;
    }
    var sibling = siblingContainer(anchor, container);
    if (!sibling) {
        return null;
    }
    var result = [anchor].concat(parents(anchor, sibling)).reduce(function (index, p) {
        var zIndexStyle = p.style.zIndex || window.getComputedStyle(p).zIndex;
        var current = parseInt(zIndexStyle, 10);
        return current > index ? current : index;
    }, 0);
    return result ? (result + 1) : null;
};
