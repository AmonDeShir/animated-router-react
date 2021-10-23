import {
  act,
  renderHook,
  WrapperComponent,
} from '@testing-library/react-hooks';

import { NavigationContext } from '../../reducer/context/navigation-context';
import useOpenPage from './use-open-page';

const dispatch = jest.fn();

const wrapper: WrapperComponent<{}> = ({ children }) => (
  <NavigationContext.Provider value={{ dispatch, state: {} as any }}>
    {children}
  </NavigationContext.Provider>
);

describe('useOpenPage', () => {
  beforeEach(() => {
    dispatch.mockClear();
  });

  it(`should throw error if page is an empty string`, () => {
    const { result } = renderHook(() => useOpenPage(), { wrapper });
    const openPage = result.current;

    expect(() => openPage('')).toThrowError(`Page can't be an empty string!`);
  });

  it(`should open page with out argument, opening page shouldn't be save in history`, () => {
    const { result } = renderHook(() => useOpenPage(), { wrapper });
    const openPage = result.current;

    act(() => openPage('/page'));

    expect(dispatch).toBeCalledWith({
      type: 'SELECT',
      payload: { path: '/page', updateHistory: false },
    });
  });

  it(`should open page without argument if argument is an empty string`, () => {
    const { result } = renderHook(() => useOpenPage(), { wrapper });
    const openPage = result.current;

    act(() => openPage('/page', { argument: '' }));

    expect(dispatch).toBeCalledWith({
      type: 'SELECT',
      payload: { path: '/page', updateHistory: false },
    });
  });

  it(`should open page with encoded argument if argument is a string`, () => {
    const { result } = renderHook(() => useOpenPage(), { wrapper });
    const openPage = result.current;

    act(() =>
      openPage('/page', { argument: 'an argument', updateHistory: true }),
    );

    expect(dispatch).toBeCalledWith({
      type: 'SELECT',
      payload: {
        path: `/page/${encodeURI('an argument')}`,
        updateHistory: true,
      },
    });
  });

  it(`should open page with parsed and encoded argument if argument is an object`, () => {
    const { result } = renderHook(() => useOpenPage(), { wrapper });
    const openPage = result.current;

    act(() =>
      openPage('/page', {
        argument: { data: 'an object' },
        updateHistory: true,
      }),
    );

    expect(dispatch).toBeCalledWith({
      type: 'SELECT',
      payload: {
        path: `/page/${encodeURI(JSON.stringify({ data: 'an object' }))}`,
        updateHistory: true,
      },
    });
  });
});
