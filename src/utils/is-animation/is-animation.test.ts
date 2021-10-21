import isAnimation from './is-animation';

describe(`utils/navigation/is-animation`, () => {
  it(`should return false if tested object is falsy`, () => {
    expect(isAnimation('')).toEqual(false);
    expect(isAnimation(false)).toEqual(false);
    expect(isAnimation(undefined)).toEqual(false);
    expect(isAnimation(null)).toEqual(false);
  });

  it(`should return false if object is an empty object`, () => {
    expect(isAnimation({})).toEqual(false);
  });

  it(`should return false if object contains only time property`, () => {
    expect(isAnimation({ time: 2 })).toEqual(false);
  });

  it(`should return false if object contains only animation property`, () => {
    expect(isAnimation({ animation: () => {} })).toEqual(false);
  });

  it(`should return false if time property is other type than number`, () => {
    expect(isAnimation({ time: '2', animation: () => {} })).toEqual(false);
    expect(isAnimation({ time: null, animation: () => {} })).toEqual(false);
    expect(isAnimation({ time: undefined, animation: () => {} })).toEqual(
      false,
    );
    expect(isAnimation({ time: () => {}, animation: () => {} })).toEqual(false);
    expect(isAnimation({ time: false, animation: () => {} })).toEqual(false);
    expect(isAnimation({ time: true, animation: () => {} })).toEqual(false);
    expect(isAnimation({ time: {}, animation: () => {} })).toEqual(false);
  });

  it(`should return false if animation property is other type than function`, () => {
    expect(isAnimation({ animation: '2', time: 5 })).toEqual(false);
    expect(isAnimation({ animation: null, time: 5 })).toEqual(false);
    expect(isAnimation({ animation: undefined, time: 5 })).toEqual(false);
    expect(isAnimation({ animation: 4, time: 5 })).toEqual(false);
    expect(isAnimation({ animation: false, time: 5 })).toEqual(false);
    expect(isAnimation({ animation: true, time: 5 })).toEqual(false);
    expect(isAnimation({ animation: {}, time: 5 })).toEqual(false);
  });

  it(`should return true if object contain correct time and animation properties`, () => {
    expect(isAnimation({ animation: () => {}, time: 5 })).toEqual(true);
  });
});
