"use strict";
var utils_1 = require('../utils');
/**
 * @hidden
 * Type guard for `CompositeFilterDescriptor`.
 */
exports.isCompositeFilterDescriptor = function (source) {
    return utils_1.isPresent(source.filters);
};
