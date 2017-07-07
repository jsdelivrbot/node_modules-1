"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FIELDS = ['bottom', 'left', 'right', 'top'];
var PDFMarginComponent = (function () {
    function PDFMarginComponent() {
    }
    Object.defineProperty(PDFMarginComponent.prototype, "options", {
        /**
         * @hidden
         */
        get: function () {
            var options = {};
            for (var idx = 0; idx < FIELDS.length; idx++) {
                var field = FIELDS[idx];
                var value = this[field];
                if (typeof value !== 'undefined') {
                    options[field] = value;
                }
            }
            return options;
        },
        enumerable: true,
        configurable: true
    });
    return PDFMarginComponent;
}());
PDFMarginComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'kendo-grid-pdf-margin',
                template: ''
            },] },
];
/** @nocollapse */
PDFMarginComponent.ctorParameters = function () { return []; };
PDFMarginComponent.propDecorators = {
    'bottom': [{ type: core_1.Input },],
    'left': [{ type: core_1.Input },],
    'right': [{ type: core_1.Input },],
    'top': [{ type: core_1.Input },],
};
exports.PDFMarginComponent = PDFMarginComponent;
