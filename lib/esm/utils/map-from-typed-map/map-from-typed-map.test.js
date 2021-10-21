import mapFromTypedMap from './map-from-typed-map';
describe('map-from-typed-map', function () {
    it("should return empty map if typedMap is undefined", function () {
        expect(mapFromTypedMap(undefined)).toEqual(new Map());
    });
    it("should return empty map if typedMap is empty", function () {
        expect(mapFromTypedMap({})).toEqual(new Map());
    });
    it("should convert typedMap to Map", function () {
        expect(mapFromTypedMap({
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
        expect(mapFromTypedMap({
            a: { a: {}, b: {}, c: { d: { f: { g: 'data' } } } },
        })).toEqual(new Map([['a', { a: {}, b: {}, c: { d: { f: { g: 'data' } } } }]]));
    });
});
