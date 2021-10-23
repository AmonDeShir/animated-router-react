import { renderHook, act } from '@testing-library/react-hooks';
import { useContext } from 'react';

import NavigationProvider, { NavigationContext } from './navigation-context';

describe(`NavigationContext`, () => {
  it(`should return default state values if is outside of NavigationContext`, () => {
    const { result } = renderHook(() => useContext(NavigationContext));

    expect(result.current.state).toEqual({
      routes: new Map(),
      selected: null,
      selectPath: '/',
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
      selectPath: '/',
      previousPath: null,
      argument: '',
    });
  });
});
