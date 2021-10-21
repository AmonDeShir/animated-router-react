"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var animation_map_1 = __importDefault(require("./animation-map"));
var animation = function () { };
describe("utils/navigation/animation-map", function () {
    it("should return empty Map if animation is undefined", function () {
        expect((0, animation_map_1.default)(undefined)).toEqual(new Map());
    });
    it("should return Map with default property if animation is an animation", function () {
        expect((0, animation_map_1.default)({ time: 5, animation: animation })).toEqual(new Map([['default', { time: 5, animation: animation }]]));
    });
    it("should return Empty Map if propery is an empty TypedMap", function () {
        expect((0, animation_map_1.default)({})).toEqual(new Map([]));
    });
    it("should convert animation to map if animation is an typedMap", function () {
        expect((0, animation_map_1.default)({
            default: { time: 1, animation: animation },
            '/start': { time: 2, animation: animation },
            '/next': { time: 3, animation: animation },
            '/test': { time: 4, animation: animation },
        })).toEqual(new Map([
            ['default', { time: 1, animation: animation }],
            ['/start', { time: 2, animation: animation }],
            ['/next', { time: 3, animation: animation }],
            ['/test', { time: 4, animation: animation }],
        ]));
    });
});
