import { render, screen } from '@testing-library/react';

import * as useAnimationRunner from '../utils/use-animation-runner/use-animation-runner';
import { NavigationContext } from '../reducer/context/navigation-context';
import Route from './route';

const dispatch = jest.fn();
const renderRoute = (path: string) => (element: JSX.Element) =>
  render(
    <NavigationContext.Provider
      value={{ dispatch, state: { selectPath: path } as any }}
    >
      {element}
    </NavigationContext.Provider>,
  );

describe(`Route`, () => {
  beforeEach(() => {
    dispatch.mockClear();
    jest.spyOn(useAnimationRunner, 'default').mockReturnValue({ hidden: true });
  });

  it(`should call add action with: path, component and animations from props`, () => {
    const animation = { animation: () => {}, time: 0 };

    renderRoute('/')(
      <Route
        component={<div />}
        path="/"
        enterAnimation={animation}
        exitAnimation={animation}
      />,
    );

    expect(dispatch).toBeCalledWith({
      type: 'ADD',
      payload: {
        component: <div />,
        path: '/',
        enterAnimation: new Map([['default', animation]]),
        exitAnimation: new Map([['default', animation]]),
        prepare: [],
      },
    });
  });

  it(`should call dispatch remove action before unmount`, () => {
    const { unmount } = renderRoute('/')(
      <Route component={<div />} path="/" />,
    );

    unmount();

    expect(dispatch).toBeCalledWith({ type: 'REMOVE', payload: '/' });
  });

  it(`should render component if useAnimationRunner.hidden is false`, () => {
    jest
      .spyOn(useAnimationRunner, 'default')
      .mockReturnValue({ hidden: false });

    renderRoute('/')(<Route component={<div>item</div>} path="/" />);

    expect(screen.queryByText(`item`)).toBeTruthy();
  });

  it(`shouldn't render component if useAnimationRunner.hidden is true but route should be register`, () => {
    jest.spyOn(useAnimationRunner, 'default').mockReturnValue({ hidden: true });

    renderRoute('/')(<Route component={<div>item</div>} path="/" />);

    expect(screen.queryByText(`item`)).toBeFalsy();
    expect(dispatch).toBeCalledWith({
      type: 'ADD',
      payload: {
        component: <div>item</div>,
        path: '/',
        enterAnimation: new Map(),
        exitAnimation: new Map(),
        prepare: [],
      },
    });
  });
});
