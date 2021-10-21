import isAnimation from './is-animation';
describe("utils/navigation/is-animation", function () {
    it("should return false if tested object is falsy", function () {
        expect(isAnimation('')).toEqual(false);
        expect(isAnimation(false)).toEqual(false);
        expect(isAnimation(undefined)).toEqual(false);
        expect(isAnimation(null)).toEqual(false);
    });
    it("should return false if object is an empty object", function () {
        expect(isAnimation({})).toEqual(false);
    });
    it("should return false if object contains only time property", function () {
        expect(isAnimation({ time: 2 })).toEqual(false);
    });
    it("should return false if object contains only animation property", function () {
        expect(isAnimation({ animation: function () { } })).toEqual(false);
    });
    it("should return false if time property is other type than number", function () {
        expect(isAnimation({ time: '2', animation: function () { } })).toEqual(false);
        expect(isAnimation({ time: null, animation: function () { } })).toEqual(false);
        expect(isAnimation({ time: undefined, animation: function () { } })).toEqual(false);
        expect(isAnimation({ time: function () { }, animation: function () { } })).toEqual(false);
        expect(isAnimation({ time: false, animation: function () { } })).toEqual(false);
        expect(isAnimation({ time: true, animation: function () { } })).toEqual(false);
        expect(isAnimation({ time: {}, animation: function () { } })).toEqual(false);
    });
    it("should return false if animation property is other type than function", function () {
        expect(isAnimation({ animation: '2', time: 5 })).toEqual(false);
        expect(isAnimation({ animation: null, time: 5 })).toEqual(false);
        expect(isAnimation({ animation: undefined, time: 5 })).toEqual(false);
        expect(isAnimation({ animation: 4, time: 5 })).toEqual(false);
        expect(isAnimation({ animation: false, time: 5 })).toEqual(false);
        expect(isAnimation({ animation: true, time: 5 })).toEqual(false);
        expect(isAnimation({ animation: {}, time: 5 })).toEqual(false);
    });
    it("should return true if object contain correct time and animation properties", function () {
        expect(isAnimation({ animation: function () { }, time: 5 })).toEqual(true);
    });
});
