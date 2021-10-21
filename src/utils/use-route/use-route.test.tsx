import { renderHook } from '@testing-library/react-hooks';
import { PropsWithChildren } from 'react';

import { NavigationContext } from '../../reducer/context/navigation-context';
import { Route } from '../../reducer/types';
import useRoute from './use-route';

const wrapper =
  (routes: Map<string, Route>) =>
  ({ children }: PropsWithChildren<{}>) =>
    (
      <NavigationContext.Provider
        value={{ dispatch: () => {}, state: { routes } as any }}
      >
        {children}
      </NavigationContext.Provider>
    );

describe(`utils/navigation/useRoute`, () => {
  it(`should return selected route`, () => {
    const routes = new Map<string, Route>([
      [
        'test',
        {
          path: 'test',
          component: <></>,
          enterAnimation: new Map(),
          exitAnimation: new Map(),
          prepare: [],
        },
      ],
      [
        'selected',
        {
          path: 'selected',
          component: <></>,
          enterAnimation: new Map(),
          exitAnimation: new Map(),
          prepare: [],
        },
      ],
    ]);

    const { result } = renderHook(() => useRoute('selected'), {
      wrapper: wrapper(routes),
    });
    expect(result.current).toEqual({
      path: 'selected',
      component: <></>,
      enterAnimation: new Map(),
      exitAnimation: new Map(),
      prepare: [],
    });
  });

  it(`should return undefined if path is an empty string`, () => {
    const routes = new Map<string, Route>([
      [
        'test',
        {
          path: 'test',
          component: <></>,
          enterAnimation: new Map(),
          exitAnimation: new Map(),
          prepare: [],
        },
      ],
      [
        'selected',
        {
          path: 'selected',
          component: <></>,
          enterAnimation: new Map(),
          exitAnimation: new Map(),
          prepare: [],
        },
      ],
    ]);

    const { result } = renderHook(() => useRoute(''), {
      wrapper: wrapper(routes),
    });
    expect(result.current).toEqual(undefined);
  });

  it(`should return undefined if routes is an empty map`, () => {
    const { result } = renderHook(() => useRoute('selected'), {
      wrapper: wrapper(new Map()),
    });
    expect(result.current).toEqual(undefined);
  });

  it(`should return undefined if selected route not exist in routes map`, () => {
    const routes = new Map<string, Route>([
      [
        'test',
        {
          path: 'test',
          component: <></>,
          enterAnimation: new Map(),
          exitAnimation: new Map(),
          prepare: [],
        },
      ],
      [
        'non-selected',
        {
          path: 'non-selected',
          component: <></>,
          enterAnimation: new Map(),
          exitAnimation: new Map(),
          prepare: [],
        },
      ],
    ]);

    const { result } = renderHook(() => useRoute('selected'), {
      wrapper: wrapper(routes),
    });
    expect(result.current).toEqual(undefined);
  });
});
