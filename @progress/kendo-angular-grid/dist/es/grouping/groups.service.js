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
import { Injectable } from '@angular/core';
import { ExpandStateService } from '../expand-state.service';
var removeLast = function (groupIndex) { return groupIndex.lastIndexOf("_") > -1
    ? groupIndex.slice(0, groupIndex.lastIndexOf("_"))
    : ""; };
/**
 * @hidden
 */
var GroupsService = (function (_super) {
    __extends(GroupsService, _super);
    function GroupsService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupsService.prototype.isInExpandedGroup = function (groupIndex, skipSelf) {
        if (skipSelf === void 0) { skipSelf = true; }
        if (skipSelf) {
            groupIndex = removeLast(groupIndex);
        }
        var expanded = true;
        while (groupIndex && expanded) {
            expanded = this.isExpanded(groupIndex);
            groupIndex = removeLast(groupIndex);
        }
        return expanded;
    };
    GroupsService.prototype.isExpanded = function (index) {
        return !_super.prototype.isExpanded.call(this, index);
    };
    return GroupsService;
}(ExpandStateService));
export { GroupsService };
GroupsService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GroupsService.ctorParameters = function () { return []; };
