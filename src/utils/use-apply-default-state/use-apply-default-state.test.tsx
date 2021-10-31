import { renderHook } from '@testing-library/react-hooks';
import { createRef, PropsWithChildren } from 'react';
import { NavigationContext } from '../..';
import { InitFunction } from '../../reducer/types';
import useApplyDefaultState from './use-apply-default-state';

const wrapper =
  (args: { initPath: string; selectedPath: string; init?: InitFunction }) =>
  ({ children }: PropsWithChildren<{}>) =>
    (
      <NavigationContext.Provider
        value={{
          dispatch: () => {},
          state: {
            selected: {
              path: args.selectedPath,
              init: args.init,
            },
            initPath: args.initPath,
          } as any,
        }}
      >
        {children}
      </NavigationContext.Provider>
    );

const ref = createRef<HTMLElement>();

describe('useApplyDefaultState', () => {
  it(`should run init function if init path is selected`, () => {
    const spy = jest.fn();

    renderHook(() => useApplyDefaultState(ref), {
      wrapper: wrapper({ initPath: '/1', selectedPath: '/1', init: spy }),
    });

    expect(spy).toBeCalledWith(ref);
  });

  it(`should run init function only once`, () => {
    const spy = jest.fn();
    let selectedPath = '/1';

    const { rerender } = renderHook(() => useApplyDefaultState(ref), {
      wrapper: wrapper({ initPath: '/1', selectedPath, init: spy }),
    });

    selectedPath = '/2';
    rerender();

    selectedPath = '/1';
    rerender();

    expect(spy).toBeCalledTimes(1);
  });

  it(`shouldn't run init function if selected path isn't init path`, () => {
    const spy = jest.fn();

    renderHook(() => useApplyDefaultState(ref), {
      wrapper: wrapper({ initPath: '/1', selectedPath: '/2', init: spy }),
    });

    expect(spy).toBeCalledTimes(0);
  });
});
