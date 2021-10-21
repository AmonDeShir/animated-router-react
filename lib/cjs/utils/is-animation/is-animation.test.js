"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var is_animation_1 = __importDefault(require("./is-animation"));
describe("utils/navigation/is-animation", function () {
    it("should return false if tested object is falsy", function () {
        expect((0, is_animation_1.default)('')).toEqual(false);
        expect((0, is_animation_1.default)(false)).toEqual(false);
        expect((0, is_animation_1.default)(undefined)).toEqual(false);
        expect((0, is_animation_1.default)(null)).toEqual(false);
    });
    it("should return false if object is an empty object", function () {
        expect((0, is_animation_1.default)({})).toEqual(false);
    });
    it("should return false if object contains only time property", function () {
        expect((0, is_animation_1.default)({ time: 2 })).toEqual(false);
    });
    it("should return false if object contains only animation property", function () {
        expect((0, is_animation_1.default)({ animation: function () { } })).toEqual(false);
    });
    it("should return false if time property is other type than number", function () {
        expect((0, is_animation_1.default)({ time: '2', animation: function () { } })).toEqual(false);
        expect((0, is_animation_1.default)({ time: null, animation: function () { } })).toEqual(false);
        expect((0, is_animation_1.default)({ time: undefined, animation: function () { } })).toEqual(false);
        expect((0, is_animation_1.default)({ time: function () { }, animation: function () { } })).toEqual(false);
        expect((0, is_animation_1.default)({ time: false, animation: function () { } })).toEqual(false);
        expect((0, is_animation_1.default)({ time: true, animation: function () { } })).toEqual(false);
        expect((0, is_animation_1.default)({ time: {}, animation: function () { } })).toEqual(false);
    });
    it("should return false if animation property is other type than function", function () {
        expect((0, is_animation_1.default)({ animation: '2', time: 5 })).toEqual(false);
        expect((0, is_animation_1.default)({ animation: null, time: 5 })).toEqual(false);
        expect((0, is_animation_1.default)({ animation: undefined, time: 5 })).toEqual(false);
        expect((0, is_animation_1.default)({ animation: 4, time: 5 })).toEqual(false);
        expect((0, is_animation_1.default)({ animation: false, time: 5 })).toEqual(false);
        expect((0, is_animation_1.default)({ animation: true, time: 5 })).toEqual(false);
        expect((0, is_animation_1.default)({ animation: {}, time: 5 })).toEqual(false);
    });
    it("should return true if object contain correct time and animation properties", function () {
        expect((0, is_animation_1.default)({ animation: function () { }, time: 5 })).toEqual(true);
    });
});
