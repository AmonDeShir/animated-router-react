import mapFromTypedMap from './map-from-typed-map';

describe('map-from-typed-map', () => {
  it(`should return empty map if typedMap is undefined`, () => {
    expect(mapFromTypedMap(undefined)).toEqual(new Map());
  });

  it(`should return empty map if typedMap is empty`, () => {
    expect(mapFromTypedMap({})).toEqual(new Map());
  });

  it(`should convert typedMap to Map`, () => {
    expect(
      mapFromTypedMap({
        a: 1,
        b: 2,
        c: 3,
        d: false,
      }),
    ).toEqual(
      new Map<string, number | false>([
        ['a', 1],
        ['b', 2],
        ['c', 3],
        ['d', false],
      ]),
    );
  });

  it(`conversion should be shallow`, () => {
    expect(
      mapFromTypedMap({
        a: { a: {}, b: {}, c: { d: { f: { g: 'data' } } } },
      }),
    ).toEqual(
      new Map([['a', { a: {}, b: {}, c: { d: { f: { g: 'data' } } } }]]),
    );
  });
});
