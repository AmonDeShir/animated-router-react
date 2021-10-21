import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { act } from 'react-dom/test-utils';

import * as useTimeoutManager from '../use-timeout-manager/use-timeout-manager';
import * as useAnimations from '../use-animations/use-animations';
import * as usePaths from '../use-paths/use-paths';
import useAnimationRunner from './use-animation-runner';

const enterAnimation = jest.fn();
const exitAnimation = jest.fn();
const enterCleanup = jest.fn();
const exitCleanup = jest.fn();

const ref = React.createRef<HTMLElement>();

describe(`utils/navigation/userAnimator`, () => {
  beforeEach(() => {
    jest.spyOn(usePaths, 'default').mockReturnValue({
      previousPath: '',
      selectPath: '/selectPath',
    });

    jest.spyOn(useAnimations, 'default').mockReturnValue({
      enterAnimation: {
        animation: enterAnimation,
        cleanup: enterCleanup,
        time: 2,
      },
      exitAnimation: {
        animation: exitAnimation,
        cleanup: exitCleanup,
        time: 1,
      },
    });

    jest.spyOn(useTimeoutManager, 'default').mockReturnValue({
      set: ((call: any) => {
        call();
      }) as any,
      clear: () => {},
      clearAll: () => {},
      length: () => 0,
    });

    enterAnimation.mockClear();
    exitAnimation.mockClear();
    enterCleanup.mockClear();
    exitCleanup.mockClear();
  });

  describe(`enterAnimation`, () => {
    it(`should be called if component is hidden and path is equal to selectedPath`, () => {
      renderHook(() => useAnimationRunner('/selectPath', ref));
      expect(enterAnimation).toBeCalledTimes(1);
    });

    it(`shouldn't be called if component is hidden and path isn't equal to selectedPath`, () => {
      const { result } = renderHook(() =>
        useAnimationRunner('/notSelectPath', ref),
      );

      expect(enterAnimation).toBeCalledTimes(0);
      expect(result.current.hidden).toEqual(true);
    });

    it(`shouldn't be called if component is hidden and path is equal to selectedPath but enterAnimation is undefined`, () => {
      jest.spyOn(useAnimations, 'default').mockReturnValue({
        enterAnimation: undefined,
        exitAnimation: undefined,
      });
      const { result } = renderHook(() =>
        useAnimationRunner('/selectPath', ref),
      );

      expect(enterAnimation).toBeCalledTimes(0);
      expect(result.current.hidden).toEqual(false);
    });

    it(`shouldn't be called if component isn't hidden`, () => {
      let path = '/selectPath';
      const { result, rerender } = renderHook(() =>
        useAnimationRunner(path, ref),
      );

      act(() => {
        path = '/selectPath';
      });
      rerender();

      expect(enterAnimation).toBeCalledTimes(1);
      expect(result.current.hidden).toEqual(false);
    });
  });

  describe(`enterAnimation cleanup`, () => {
    it(`should be called if component is hidden and path is equal to selectedPath`, () => {
      renderHook(() => useAnimationRunner('/selectPath', ref));
      expect(enterCleanup).toBeCalledTimes(1);
    });

    it(`shouldn't be called if component is hidden and path isn't equal to selectedPath`, () => {
      const { result } = renderHook(() =>
        useAnimationRunner('/notSelectPath', ref),
      );

      expect(enterCleanup).toBeCalledTimes(0);
      expect(result.current.hidden).toEqual(true);
    });

    it(`shouldn't be called if component is hidden and path is equal to selectedPath but enterAnimation is undefined`, () => {
      jest.spyOn(useAnimations, 'default').mockReturnValue({
        enterAnimation: undefined,
        exitAnimation: undefined,
      });
      const { result } = renderHook(() =>
        useAnimationRunner('/selectPath', ref),
      );

      expect(enterCleanup).toBeCalledTimes(0);
      expect(result.current.hidden).toEqual(false);
    });

    it(`shouldn't be called if component is hidden and path is equal to selectedPath but enterCleanup is undefined`, () => {
      jest.spyOn(useAnimations, 'default').mockReturnValue({
        enterAnimation: { animation: () => {}, time: 0, cleanup: undefined },
        exitAnimation: undefined,
      });
      const { result } = renderHook(() =>
        useAnimationRunner('/selectPath', ref),
      );

      expect(enterCleanup).toBeCalledTimes(0);
      expect(result.current.hidden).toEqual(false);
    });

    it(`shouldn't be called if component isn't hidden`, () => {
      let path = '/selectPath';
      const { result, rerender } = renderHook(() =>
        useAnimationRunner(path, ref),
      );

      act(() => {
        path = '/selectPath';
      });
      rerender();

      expect(enterCleanup).toBeCalledTimes(1);
      expect(result.current.hidden).toEqual(false);
    });
  });

  describe(`exitAnimation`, () => {
    it(`should be called if component is showed and path is other than selectedPath`, () => {
      let path = '/selectPath';
      const { rerender } = renderHook(() => useAnimationRunner(path, ref));
      act(() => {
        path = '/';
      });
      rerender();

      expect(exitAnimation).toBeCalledTimes(1);
    });

    it(`shouldn't be called if component is showed and path is equal to selectedPath`, () => {
      let path = '/selectPath';
      const { result, rerender } = renderHook(() =>
        useAnimationRunner(path, ref),
      );
      act(() => {
        path = '/selectPath';
      });
      rerender();

      expect(exitAnimation).toBeCalledTimes(0);
      expect(result.current.hidden).toEqual(false);
    });

    it(`shouldn't be called if component is showed and path is other than selectedPath but exitAnimation is undefined`, () => {
      jest.spyOn(useAnimations, 'default').mockReturnValue({
        enterAnimation: undefined,
        exitAnimation: undefined,
      });
      let path = '/selectPath';
      const { result, rerender } = renderHook(() =>
        useAnimationRunner(path, ref),
      );
      act(() => {
        path = '/';
      });
      rerender();

      expect(exitAnimation).toBeCalledTimes(0);
      expect(result.current.hidden).toEqual(true);
    });

    it(`shouldn't be called if component is hidden`, () => {
      const { result } = renderHook(() => useAnimationRunner('/', ref));

      expect(enterCleanup).toBeCalledTimes(0);
      expect(result.current.hidden).toEqual(true);
    });
  });

  describe(`exitAnimation cleanup`, () => {
    it(`should be called if component is showed and path is other than selectedPath`, () => {
      let path = '/selectPath';
      const { rerender } = renderHook(() => useAnimationRunner(path, ref));
      act(() => {
        path = '/';
      });
      rerender();

      expect(exitCleanup).toBeCalledTimes(1);
    });

    it(`shouldn't be called if component is showed and path is equal to selectedPath`, () => {
      let path = '/selectPath';
      const { result, rerender } = renderHook(() =>
        useAnimationRunner(path, ref),
      );
      act(() => {
        path = '/selectPath';
      });
      rerender();

      expect(exitCleanup).toBeCalledTimes(0);
      expect(result.current.hidden).toEqual(false);
    });

    it(`shouldn't be called if component is showed and path is other than selectedPath but exitAnimation is undefined`, () => {
      jest.spyOn(useAnimations, 'default').mockReturnValue({
        enterAnimation: undefined,
        exitAnimation: undefined,
      });
      let path = '/selectPath';
      const { result, rerender } = renderHook(() =>
        useAnimationRunner(path, ref),
      );
      act(() => {
        path = '/';
      });
      rerender();

      expect(exitCleanup).toBeCalledTimes(0);
      expect(result.current.hidden).toEqual(true);
    });

    it(`shouldn't be called if component is showed and path is other than selectedPath but exitCleanup is undefined`, () => {
      jest.spyOn(useAnimations, 'default').mockReturnValue({
        enterAnimation: { animation: () => {}, time: 0, cleanup: undefined },
        exitAnimation: undefined,
      });
      let path = '/selectPath';
      const { result, rerender } = renderHook(() =>
        useAnimationRunner(path, ref),
      );
      act(() => {
        path = '/';
      });
      rerender();

      expect(exitCleanup).toBeCalledTimes(0);
      expect(result.current.hidden).toEqual(true);
    });
  });

  describe(`if animation are undefined`, () => {
    beforeEach(() => {
      jest.spyOn(useAnimations, 'default').mockReturnValue({
        enterAnimation: undefined,
        exitAnimation: undefined,
      });
    });

    it(`should hide component if component is showed and path is other than selectedPath`, () => {
      let path = '/selectPath';
      const { result, rerender } = renderHook(() =>
        useAnimationRunner(path, ref),
      );

      act(() => {
        path = '/';
      });
      rerender();

      expect(result.current.hidden).toEqual(true);
    });

    it(`should show component if component is hidden and path is equal to selectedPath`, () => {
      let path = '/';
      const { result, rerender } = renderHook(() =>
        useAnimationRunner(path, ref),
      );

      act(() => {
        path = '/selectPath';
      });
      rerender();

      expect(result.current.hidden).toEqual(false);
    });

    it(`shouldn't hide component if component is hidden and path is other than selectedPath`, () => {
      let path = '/';
      const { result, rerender } = renderHook(() =>
        useAnimationRunner(path, ref),
      );

      act(() => {
        path = '/';
      });
      rerender();

      expect(result.current.hidden).toEqual(true);
    });

    it(`shouldn't show component if component is showed and path is equal to selectedPath`, () => {
      let path = '/selectPath';
      const { result, rerender } = renderHook(() =>
        useAnimationRunner(path, ref),
      );

      act(() => {
        path = '/selectPath';
      });
      rerender();

      expect(result.current.hidden).toEqual(false);
    });
  });
});
