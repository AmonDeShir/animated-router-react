import { fireEvent, render } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useContext, useReducer } from 'react';

import NavigationProvider, { NavigationContext } from './navigation-context';

describe(`NavigationContext`, () => {
  it(`should return default state values if is outside of NavigationContext`, () => {
    const { result } = renderHook(() => useContext(NavigationContext));

    expect(result.current.state).toEqual({
      routes: new Map(),
      selected: null,
      selectPath: '/',
      initPath: '/',
      previousPath: null,
      argument: '',
    });
  });

  it(`should throw error if it is used outside of NavigationProvider`, () => {
    const { result } = renderHook(() => useContext(NavigationContext));

    expect(() =>
      act(() => {
        result.current.dispatch({ type: 'REMOVE', payload: '/2' });
      }),
    ).toThrowError('Dispatch cannot be use outside of NavigationProvider!');
  });

  it(`shouldn't throw error if it is used in NavigationProvider`, () => {
    const { result } = renderHook(() => useContext(NavigationContext), {
      wrapper: NavigationProvider,
    });

    expect(() =>
      act(() => {
        result.current.dispatch({ type: 'REMOVE', payload: '/2' });
      }),
    ).not.toThrowError('Dispatch cannot be use outside of NavigationProvider!');
  });

  it(`should return default state with modified previousPath values if is in NavigationContext`, () => {
    const { result } = renderHook(() => useContext(NavigationContext), {
      wrapper: NavigationProvider,
    });

    expect(result.current.state).toEqual({
      routes: new Map(),
      selected: null,
      initPath: '/',
      selectPath: '/',
      previousPath: null,
      argument: '',
    });
  });

  it(`should dispatch SELECT action after popstate event`, async () => {
    const original = useReducer;
    const dispatch = jest.fn();

    (useReducer as any) = (_: any, state: any) => [state, dispatch];

    const { container } = render(<NavigationProvider />);

    window.location.pathname = '/test2';

    fireEvent(
      container,
      new PopStateEvent('popstate', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(dispatch).toBeCalledWith({
      type: 'SELECT',
      payload: {
        path: '/test2',
        updateHistory: false,
      },
    });

    (useReducer as any) = original;
  });
});
