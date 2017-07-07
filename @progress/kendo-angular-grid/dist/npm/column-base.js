"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var header_template_directive_1 = require("./header-template.directive");
var footer_template_directive_1 = require("./footer-template.directive");
/**
 * @hidden
 */
exports.isSpanColumn = function (column) { return column.isSpanColumn; };
var isColumnContainer = function (column) { return column.isColumnGroup || exports.isSpanColumn(column); };
/**
 * @hidden
 */
var ColumnBase = (function () {
    function ColumnBase(parent) {
        this.parent = parent;
        /**
         * @hidden
         */
        this.headerTemplates = new core_1.QueryList();
        if (parent && !isColumnContainer(parent)) {
            throw new Error('Columns can be nested only inside ColumnGroupComponent');
        }
    }
    Object.defineProperty(ColumnBase.prototype, "width", {
        get: function () { return this._width; },
        /**
         * The width of the column in pixels.
         */
        set: function (value) {
            this._width = parseInt(value, 10);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnBase.prototype, "level", {
        /**
         * @hidden
         */
        get: function () {
            if (this.parent && exports.isSpanColumn(this.parent)) {
                return this.parent.level;
            }
            return this.parent ? this.parent.level + 1 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnBase.prototype, "isLocked", {
        /**
         * @hidden
         */
        get: function () {
            return this.parent ? this.parent.isLocked : this.locked;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnBase.prototype, "colspan", {
        /**
         * @hidden
         */
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ColumnBase.prototype.rowspan = function (totalColumnLevels) {
        return this.level < totalColumnLevels ? (totalColumnLevels - this.level) + 1 : 1;
    };
    Object.defineProperty(ColumnBase.prototype, "headerTemplateRef", {
        /**
         * @hidden
         */
        get: function () {
            var template = this.headerTemplates.first;
            return template ? template.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnBase.prototype, "footerTemplateRef", {
        /**
         * @hidden
         */
        get: function () {
            return this.footerTemplate ? this.footerTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnBase.prototype, "displayTitle", {
        get: function () {
            return this.title;
        },
        enumerable: true,
        configurable: true
    });
    return ColumnBase;
}());
ColumnBase.propDecorators = {
    'title': [{ type: core_1.Input },],
    'width': [{ type: core_1.Input },],
    'locked': [{ type: core_1.Input },],
    'hidden': [{ type: core_1.Input },],
    'media': [{ type: core_1.Input },],
    'style': [{ type: core_1.Input },],
    'headerStyle': [{ type: core_1.Input },],
    'footerStyle': [{ type: core_1.Input },],
    'cssClass': [{ type: core_1.Input, args: ['class',] },],
    'headerClass': [{ type: core_1.Input },],
    'footerClass': [{ type: core_1.Input },],
    'headerTemplates': [{ type: core_1.ContentChildren, args: [header_template_directive_1.HeaderTemplateDirective, { descendants: false },] },],
    'footerTemplate': [{ type: core_1.ContentChild, args: [footer_template_directive_1.FooterTemplateDirective,] },],
};
exports.ColumnBase = ColumnBase;
