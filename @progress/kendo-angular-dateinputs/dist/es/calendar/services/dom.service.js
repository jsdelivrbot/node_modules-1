import { Injectable } from '@angular/core';
import { isDocumentAvailable } from '../../util';
var div = function (styles, content) {
    if (styles === void 0) { styles = ""; }
    if (content === void 0) { content = ""; }
    var el = document.createElement('div');
    el.className = styles;
    el.innerHTML = content;
    return el;
};
var containerFactory = function (type) { return function (children, styles) {
    if (styles === void 0) { styles = ""; }
    var container = document.createElement(type);
    container.className = styles;
    children.forEach(function (child) { return container.appendChild(child); });
    return container;
}; };
var cell = function (type, content, styles) {
    if (styles === void 0) { styles = ""; }
    var tableCell = document.createElement(type);
    tableCell.innerHTML = content;
    tableCell.className = styles;
    return tableCell;
};
var tr = containerFactory('tr');
var tbody = containerFactory('tbody');
var thead = containerFactory('thead');
var table = function (body, styles) {
    if (styles === void 0) { styles = ""; }
    var tableElement = document.createElement('table');
    tableElement.appendChild(body);
    tableElement.className = styles;
    return tableElement;
};
var monthHeader = function () {
    return div('k-calendar-header', "\n            <span class=\"k-calendar-title\">March 2017</span>\n            <span class=\"k-calendar-today\">TODAY</span>\n        ");
};
var monthWeekHeader = function () {
    return table(thead([
        tr([cell('th', 'MO')])
    ]), 'k-calendar-weekdays');
};
var monthContent = function () {
    return table(tbody([
        tr([cell('th', '1')]),
        tr([cell('td', '1')]),
        tr([cell('td', '1')]),
        tr([cell('td', '1')]),
        tr([cell('td', '1')]),
        tr([cell('td', '1')]),
        tr([cell('td', '1')])
    ]));
};
var scrollable = function () {
    return div('k-content k-scrollable');
};
var monthScrollable = function () {
    var scrollableElement = scrollable();
    scrollableElement.appendChild(monthContent());
    return scrollableElement;
};
var monthView = function () {
    var view = div('k-calendar-monthview');
    view.appendChild(monthHeader());
    view.appendChild(monthWeekHeader());
    view.appendChild(monthScrollable());
    return view;
};
var listItem = function () {
    var li = document.createElement('li');
    li.innerHTML = "<span>FEB</span>";
    return li;
};
var list = function () {
    var listElement = document.createElement('ul');
    listElement.appendChild(listItem());
    return listElement;
};
var navigationScrollable = function () {
    var scrollableElement = scrollable();
    scrollableElement.appendChild(list());
    return scrollableElement;
};
var navigation = function () {
    var nav = div('k-calendar-navigation');
    nav.appendChild(navigationScrollable());
    return nav;
};
var calendar = function () {
    if (!isDocumentAvailable()) {
        return null;
    }
    var cal = div('k-widget k-calendar k-calendar-infinite');
    cal.style.left = '-10000px';
    cal.appendChild(navigation());
    cal.appendChild(monthView());
    return cal;
};
var CALENDAR_ELEMENT = calendar();
/**
 * @hidden
 */
var DOMService = (function () {
    function DOMService() {
    }
    DOMService.prototype.calendarHeight = function () {
        return this.computedHeight(function (el) { return el; });
    };
    DOMService.prototype.monthScrollableContentHeight = function () {
        return this.computedHeight(function (el) { return el.querySelector('.k-calendar-monthview').querySelector('.k-scrollable'); });
    };
    DOMService.prototype.monthViewHeight = function () {
        return this.computedHeight(function (el) { return el.querySelector('tbody'); });
    };
    DOMService.prototype.monthHeaderHeight = function () {
        return this.computedHeight(function (el) { return el.querySelector('tbody').children[0]; });
    };
    DOMService.prototype.navigationItemHeight = function () {
        return this.computedHeight(function (el) { return el.querySelector('li'); });
    };
    DOMService.prototype.computedHeight = function (selector) {
        if (!isDocumentAvailable()) {
            return 0;
        }
        var rootElement = document.body.appendChild(CALENDAR_ELEMENT);
        var element = selector(rootElement);
        var height = parseFloat(window.getComputedStyle(element).height) || element.offsetHeight;
        document.body.removeChild(rootElement);
        return height;
    };
    return DOMService;
}());
export { DOMService };
DOMService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DOMService.ctorParameters = function () { return []; };
