"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var map_from_typed_map_1 = __importDefault(require("./map-from-typed-map"));
describe('map-from-typed-map', function () {
    it("should return empty map if typedMap is undefined", function () {
        expect((0, map_from_typed_map_1.default)(undefined)).toEqual(new Map());
    });
    it("should return empty map if typedMap is empty", function () {
        expect((0, map_from_typed_map_1.default)({})).toEqual(new Map());
    });
    it("should convert typedMap to Map", function () {
        expect((0, map_from_typed_map_1.default)({
            a: 1,
            b: 2,
            c: 3,
            d: false,
        })).toEqual(new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
            ['d', false],
        ]));
    });
    it("conversion should be shallow", function () {
        expect((0, map_from_typed_map_1.default)({
            a: { a: {}, b: {}, c: { d: { f: { g: 'data' } } } },
        })).toEqual(new Map([['a', { a: {}, b: {}, c: { d: { f: { g: 'data' } } } }]]));
    });
});
