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
var expand_state_service_1 = require("./expand-state.service");
/**
 * @hidden
 */
var DetailsService = (function (_super) {
    __extends(DetailsService, _super);
    function DetailsService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DetailsService;
}(expand_state_service_1.ExpandStateService));
DetailsService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
DetailsService.ctorParameters = function () { return []; };
exports.DetailsService = DetailsService;
