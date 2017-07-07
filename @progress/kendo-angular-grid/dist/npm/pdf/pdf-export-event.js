"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var preventable_event_1 = require("../preventable-event");
/**
 * Arguments for the `pdfExport` event.
 */
var PDFExportEvent = (function (_super) {
    __extends(PDFExportEvent, _super);
    function PDFExportEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PDFExportEvent;
}(preventable_event_1.PreventableEvent));
exports.PDFExportEvent = PDFExportEvent;
