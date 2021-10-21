"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isAnimation = function (object) {
    if (!object) {
        return false;
    }
    return (typeof object.time === 'number' && typeof object.animation === 'function');
};
exports.default = isAnimation;
