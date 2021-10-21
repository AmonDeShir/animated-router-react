"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var map_from_typed_map_1 = __importDefault(require("../map-from-typed-map/map-from-typed-map"));
var is_animation_1 = __importDefault(require("../is-animation/is-animation"));
var animationMap = function (animation) {
    if ((0, is_animation_1.default)(animation)) {
        return new Map([['default', animation]]);
    }
    return (0, map_from_typed_map_1.default)(animation);
};
exports.default = animationMap;
