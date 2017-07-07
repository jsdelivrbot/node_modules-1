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
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
/**
 * @hidden
 */
var Messages = (function (_super) {
    __extends(Messages, _super);
    function Messages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Messages;
}(kendo_angular_l10n_1.ComponentMessages));
Messages.propDecorators = {
    'today': [{ type: core_1.Input },],
};
exports.Messages = Messages;
