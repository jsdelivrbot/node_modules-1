"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
exports.HEADER_CLASS = 'k-grid-header';
/**
 * @hidden
 */
exports.FOOTER_CLASS = 'k-grid-footer';
var GRID_LIST = 'KENDO-GRID-LIST';
var TABLE = 'TABLE';
var matchesClass = function (className) {
    return function (element) { return String(element.className).split(' ').indexOf(className) >= 0; };
};
var matchesNodeName = function (nodeName) {
    return function (element) { return element.nodeName === nodeName; };
};
var matchesList = matchesNodeName(GRID_LIST);
var matchesTable = matchesNodeName(TABLE);
var findChild = function (element, matches) {
    if (!element) {
        return;
    }
    var children = element.childNodes;
    for (var idx = 0; idx < children.length; idx++) {
        if (matches(children[idx])) {
            return children[idx];
        }
    }
};
var suffix = function (locked) { return locked ? 'locked' : 'wrap'; };
/**
 * @hidden
 */
var GridQuery = (function () {
    function GridQuery(element) {
        this.element = element;
        this.list = findChild(element, matchesList);
    }
    GridQuery.prototype.content = function (locked) {
        return findChild(this.list, matchesClass("k-grid-content" + (locked ? '-locked' : '')));
    };
    GridQuery.prototype.header = function (locked) {
        this.headerWrap = this.headerWrap || findChild(this.element, matchesClass(exports.HEADER_CLASS));
        return findChild(this.headerWrap, matchesClass(exports.HEADER_CLASS + "-" + suffix(locked)));
    };
    GridQuery.prototype.footer = function (locked) {
        this.footerWrap = this.footerWrap || findChild(this.element, matchesClass(exports.FOOTER_CLASS));
        return findChild(this.footerWrap, matchesClass(exports.FOOTER_CLASS + "-" + suffix(locked)));
    };
    GridQuery.prototype.table = function () {
        return findChild(this.element, matchesTable);
    };
    return GridQuery;
}());
exports.GridQuery = GridQuery;
