import animationMap from './animation-map';

const animation = () => {};

describe(`utils/navigation/animation-map`, () => {
  it(`should return empty Map if animation is undefined`, () => {
    expect(animationMap(undefined)).toEqual(new Map());
  });

  it(`should return Map with default property if animation is an animation`, () => {
    expect(animationMap({ time: 5, animation })).toEqual(
      new Map([['default', { time: 5, animation }]]),
    );
  });

  it(`should return Empty Map if propery is an empty TypedMap`, () => {
    expect(animationMap({})).toEqual(new Map([]));
  });

  it(`should convert animation to map if animation is an typedMap`, () => {
    expect(
      animationMap({
        default: { time: 1, animation },
        '/start': { time: 2, animation },
        '/next': { time: 3, animation },
        '/test': { time: 4, animation },
      }),
    ).toEqual(
      new Map([
        ['default', { time: 1, animation }],
        ['/start', { time: 2, animation }],
        ['/next', { time: 3, animation }],
        ['/test', { time: 4, animation }],
      ]),
    );
  });
});
