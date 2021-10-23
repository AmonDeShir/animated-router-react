import { renderHook } from '@testing-library/react-hooks';
import { PropsWithChildren } from 'react';

import { NavigationContext } from '../../reducer/context/navigation-context';
import { Route, State } from '../../reducer/types';
import useAnimations from './use-animations';

const wrapper =
  (state: Partial<State>) =>
  ({ children }: PropsWithChildren<{}>) =>
    (
      <NavigationContext.Provider
        value={{ dispatch: () => {}, state: state as any }}
      >
        {children}
      </NavigationContext.Provider>
    );

const animation = () => {};

const routes = new Map<string, Route>([
  [
    '/route',
    {
      component: <></>,
      path: '/route',
      enterAnimation: new Map([
        ['default', { time: 5, animation }],
        ['/enter-test', { time: 20, animation }],
      ]),
      exitAnimation: new Map([
        ['default', { time: 15, animation }],
        ['/exit-test', { time: 10, animation }],
      ]),
    },
  ],
]);

describe('/utils/navigation/useAnimation', () => {
  it(`should return null if route is undefined`, () => {
    const { result } = renderHook(() => useAnimations('/undefined'), {
      wrapper: wrapper({ previousPath: '/', routes }),
    });
    expect(result.current.enterAnimation).toBeUndefined();
    expect(result.current.exitAnimation).toBeUndefined();
  });

  it(`should return default exit animation for selected path if that animation isn't defined in route.exitAnimation map`, () => {
    const { result } = renderHook(() => useAnimations('/route'), {
      wrapper: wrapper({ previousPath: '/not-exist', selectPath: '/', routes }),
    });
    expect(result.current.exitAnimation).toEqual({ time: 15, animation });
  });

  it(`should return default enter animation for previous path if that animation isn't defined in route.enterAnimation map`, () => {
    const { result } = renderHook(() => useAnimations('/route'), {
      wrapper: wrapper({ previousPath: '/not-exist', selectPath: '/', routes }),
    });
    expect(result.current.enterAnimation).toEqual({ time: 5, animation });
  });

  it(`should return exit animation for selected path if that animation is defined in route.exitAnimation map`, () => {
    const { result } = renderHook(() => useAnimations('/route'), {
      wrapper: wrapper({ selectPath: '/exit-test', previousPath: '/', routes }),
    });
    expect(result.current.exitAnimation).toEqual({ time: 10, animation });
  });

  it(`should return enter animation for previous path if that animation is defined in route.enterAnimation map`, () => {
    const { result } = renderHook(() => useAnimations('/route'), {
      wrapper: wrapper({
        previousPath: '/enter-test',
        selectPath: '/',
        routes,
      }),
    });
    expect(result.current.enterAnimation).toEqual({ time: 20, animation });
  });

  it(`should return default exit animation for selected path if selected path is equal '/'`, () => {
    const { result } = renderHook(() => useAnimations('/route'), {
      wrapper: wrapper({ previousPath: '/', selectPath: '/', routes }),
    });
    expect(result.current.exitAnimation).toEqual({ time: 15, animation });
  });

  it(`should return default enter animation for previous path if previous path is equal '/'`, () => {
    const { result } = renderHook(() => useAnimations('/route'), {
      wrapper: wrapper({ previousPath: '/', selectPath: '/', routes }),
    });
    expect(result.current.enterAnimation).toEqual({ time: 5, animation });
  });
});
