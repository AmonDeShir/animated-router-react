import { renderHook } from '@testing-library/react-hooks';
import { PropsWithChildren } from 'react';

import emptyWord from './use-navigation-argument.data';
import { NavigationContext } from '../../reducer/context/navigation-context';
import useNavigationArgument from './use-navigation-argument';

const wrapper =
  (argument: string) =>
  ({ children }: PropsWithChildren<{}>) =>
    (
      <NavigationContext.Provider
        value={{ dispatch: () => {}, state: { argument } as any }}
      >
        {children}
      </NavigationContext.Provider>
    );

describe(`useNavigationArgument`, () => {
  it(`should return null if navigation.argument is an empty string`, () => {
    const { result } = renderHook(() => useNavigationArgument(), {
      wrapper: wrapper(''),
    });
    expect(result.current).toBeUndefined();
  });

  it(`should return argument if navigation.argument is string`, () => {
    const { result } = renderHook(() => useNavigationArgument(), {
      wrapper: wrapper('test'),
    });
    expect(result.current).toEqual('test');
  });

  it(`should return decoded argument if navigation.argument is string`, () => {
    const { result } = renderHook(() => useNavigationArgument(), {
      wrapper: wrapper(encodeURI('%--.\\d//data')),
    });
    expect(result.current).toEqual('%--.\\d//data');
  });

  it(`should return undefined is navigation.argument is "undefined"`, () => {
    const { result } = renderHook(() => useNavigationArgument(), {
      wrapper: wrapper('undefined'),
    });
    expect(result.current).toBeUndefined();
  });

  it(`should return undefined is navigation.argument is "null"`, () => {
    const { result } = renderHook(() => useNavigationArgument(), {
      wrapper: wrapper('null'),
    });
    expect(result.current).toBeUndefined();
  });

  it(`should return undefined is navigation.argument is null`, () => {
    const { result } = renderHook(() => useNavigationArgument(), {
      wrapper: wrapper(null as any),
    });
    expect(result.current).toBeUndefined();
  });

  it(`should return undefined is navigation.argument is undefined`, () => {
    const { result } = renderHook(() => useNavigationArgument(), {
      wrapper: wrapper(undefined as any),
    });
    expect(result.current).toBeUndefined();
  });

  it(`should return argument if navigation.argument can't be parse by json.parse`, () => {
    const { result } = renderHook(() => useNavigationArgument(), {
      wrapper: wrapper('} data'),
    });
    expect(result.current).toEqual('} data');
  });

  it(`should return parsed argument if navigation.argument can be parse by json.parse`, () => {
    const data = encodeURI(JSON.stringify(emptyWord));
    const { result } = renderHook(() => useNavigationArgument(), {
      wrapper: wrapper(data),
    });
    expect(result.current).toEqual(emptyWord);
  });
});
