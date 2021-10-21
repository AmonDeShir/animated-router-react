import animationMap from './animation-map';
var animation = function () { };
describe("utils/navigation/animation-map", function () {
    it("should return empty Map if animation is undefined", function () {
        expect(animationMap(undefined)).toEqual(new Map());
    });
    it("should return Map with default property if animation is an animation", function () {
        expect(animationMap({ time: 5, animation: animation })).toEqual(new Map([['default', { time: 5, animation: animation }]]));
    });
    it("should return Empty Map if propery is an empty TypedMap", function () {
        expect(animationMap({})).toEqual(new Map([]));
    });
    it("should convert animation to map if animation is an typedMap", function () {
        expect(animationMap({
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
