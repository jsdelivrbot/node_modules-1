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
import { PreventableEvent } from '../preventable-event';
/**
 * Arguments for the `excelExport` event.
 */
var ExcelExportEvent = (function (_super) {
    __extends(ExcelExportEvent, _super);
    function ExcelExportEvent(workbook) {
        var _this = _super.call(this) || this;
        _this.workbook = workbook;
        return _this;
    }
    return ExcelExportEvent;
}(PreventableEvent));
export { ExcelExportEvent };
