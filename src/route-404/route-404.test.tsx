import { render, screen } from '@testing-library/react';

import { NavigationContext } from '../reducer/context/navigation-context';
import Error404Route from './route-404';

describe(`route-404`, () => {
  it(`display route with path equal "/404" if NavigationContext.state.selected is null and route on that path exist`, () => {
    const dispatch = jest.fn();
    const state = {
      selected: null,
      routes: new Map<string, any>([
        ['/404', { component: <div>test route</div> }],
      ]),
    } as any;

    render(
      <NavigationContext.Provider value={{ dispatch, state }}>
        <Error404Route />
      </NavigationContext.Provider>,
    );

    expect(screen.queryByText('test route')).toBeTruthy();
  });

  it(`display "Page doesn't exist" if NavigationContext.state.selected is null and route on path "/404" not exist`, () => {
    const dispatch = jest.fn();

    render(
      <NavigationContext.Provider
        value={{
          dispatch,
          state: { selected: null, routes: new Map() } as any,
        }}
      >
        <Error404Route />
      </NavigationContext.Provider>,
    );

    expect(screen.queryByText(`Page doesn't exist`)).toBeTruthy();
  });
});
