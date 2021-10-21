import { act, renderHook } from '@testing-library/react-hooks';

import useTimeoutManager from './use-timeout-manager';

describe(`use-timeout-manager`, () => {
  const setTimeout = jest.spyOn(window, 'setTimeout');
  const clearTimeout = jest.spyOn(window, 'clearTimeout');
  const callback = () => {};

  beforeEach(() => {
    setTimeout.mockReturnValue(100 as any);
    clearTimeout.mockImplementation(() => {});
  });

  describe(`set`, () => {
    it(`should set new timeout`, () => {
      const { result } = renderHook(() => useTimeoutManager());

      result.current.set(callback, 100);
      expect(setTimeout).toBeCalledWith(callback, 100);
    });

    it(`should increase manager length`, async () => {
      const { result } = renderHook(() => useTimeoutManager());

      act(() => {
        result.current.set(callback, 100);
      });
      expect(result.current.length()).toEqual(1);
    });

    it(`should set timeout time to zero if time is undefined`, () => {
      const { result } = renderHook(() => useTimeoutManager());

      result.current.set(callback);
      expect(setTimeout).toBeCalledWith(callback, 0);
    });

    it(`should multiply time value by multipleTime from the hook constructor`, () => {
      const { result } = renderHook(() => useTimeoutManager(1000));

      result.current.set(callback, 10);
      expect(setTimeout).toBeCalledWith(callback, 10000);
    });

    it(`should return timeout id`, () => {
      const { result } = renderHook(() => useTimeoutManager());

      expect(result.current.set(callback, 10)).toEqual(100);
    });
  });

  describe(`clear`, () => {
    it(`should call window.clearTimeout`, () => {
      const { result } = renderHook(() => useTimeoutManager());
      let id = 0;

      act(() => {
        result.current.set(callback, 10);
      });
      act(() => {
        id = result.current.set(callback, 20);
      });
      act(() => {
        result.current.clear(id);
      });

      expect(clearTimeout).toBeCalledWith(100);
    });

    it(`should decrement length`, () => {
      const { result } = renderHook(() => useTimeoutManager());

      act(() => {
        result.current.set(callback, 10);
      });
      act(() => {
        result.current.clear(100);
      });

      expect(result.current.length()).toEqual(0);
    });

    it(`shouldn't decrement length if deleted timeout isn't in manager`, () => {
      const { result } = renderHook(() => useTimeoutManager());

      act(() => {
        result.current.set(callback, 10);
      });
      act(() => {
        result.current.set(callback, 20);
      });
      act(() => {
        result.current.clear(350);
      });

      expect(result.current.length()).toEqual(2);
    });
  });

  describe(`clearAll`, () => {
    it(`should clear all timeouts`, () => {
      const { result } = renderHook(() => useTimeoutManager());

      act(() => {
        result.current.set(callback, 10);
      });
      act(() => {
        result.current.set(callback, 20);
      });
      act(() => {
        result.current.clearAll();
      });

      expect(clearTimeout).toBeCalledTimes(2);
    });

    it(`should set length to zero`, () => {
      const { result } = renderHook(() => useTimeoutManager());

      act(() => {
        result.current.set(callback, 10);
      });
      act(() => {
        result.current.set(callback, 20);
      });
      act(() => {
        result.current.clearAll();
      });

      expect(result.current.length()).toEqual(0);
    });
  });
});
