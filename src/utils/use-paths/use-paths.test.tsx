import { renderHook } from '@testing-library/react-hooks';
import { PropsWithChildren } from 'react';

import { NavigationContext } from '../../reducer/context/navigation-context';
import { State } from '../../reducer/types';
import usePaths from './use-paths';

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

describe(`utils/navigation/usePath`, () => {
  beforeEach(() => {
    delete (window as any).location;
    (window as any).location = new URL('http://localhost/');
  });

  it(`should return selectPath from navigation context`, () => {
    const { result } = renderHook(() => usePaths(), {
      wrapper: wrapper({ selectPath: '/select-path' }),
    });
    expect(result.current.selectPath).toEqual('/select-path');
  });

  it(`should return previousPath from navigation context`, () => {
    const { result } = renderHook(() => usePaths(), {
      wrapper: wrapper({ previousPath: '/previous-path' }),
    });
    expect(result.current.previousPath).toEqual('/previous-path');
  });

  it(`should return selectPath from window.location.path if selectPath in navigation context is null`, () => {
    window.location.pathname = '/selectPath-path';
    const { result } = renderHook(() => usePaths(), { wrapper: wrapper({}) });

    expect(result.current.selectPath).toEqual('/selectPath-path');
  });

  it(`should return previousPath from window.location.path if selectPath in navigation context is null`, () => {
    window.location.pathname = '/previous-path';
    const { result } = renderHook(() => usePaths(), { wrapper: wrapper({}) });

    expect(result.current.previousPath).toEqual('/previous-path');
  });
});
