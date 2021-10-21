import React from 'react';

import navigationReducer from './navigation-reducer';
import { Route, State } from './types';

describe('navigation reducer test', () => {
  const initialState: State = {
    routes: new Map<string, Route>(),
    selected: null,
    previousPath: null,
    selectPath: '/',
    argument: '',
  };

  const route: Route = {
    path: '/test',
    component: React.createElement('div'),
    enterAnimation: new Map([['default', { animation: () => {}, time: 0.1 }]]),
    exitAnimation: new Map([['default', { animation: () => {}, time: 0.1 }]]),
    prepare: [],
  };

  it(`shouldn't change state if action.type is incorrect`, () => {
    const result = navigationReducer(initialState, {
      type: 'INCORRECT' as any,
      payload: {} as any,
    });

    expect(result).toEqual(initialState);
  });

  it('should add new route to state', () => {
    const result = navigationReducer(initialState, {
      type: 'ADD',
      payload: route,
    });

    expect(result.routes.get('/test')).toEqual(route);
    expect(result.selected).toBeNull();
    expect(result.selectPath).toBe('/');
    expect(result.argument).toBe('');
  });

  it('should add default route to state', () => {
    const defaultRoute = {
      ...route,
      path: '/',
    };

    const result = navigationReducer(initialState, {
      type: 'ADD',
      payload: defaultRoute,
    });

    expect(result.routes.get('/')).toEqual(defaultRoute);
    expect(result.selected).toEqual(defaultRoute);
    expect(result.selectPath).toBe('/');
    expect(result.argument).toBe('');
  });

  it('should throw error if second route with the same name was added', () => {
    const state = navigationReducer(initialState, {
      type: 'ADD',
      payload: route,
    });

    expect(() => {
      navigationReducer(state, {
        type: 'ADD',
        payload: route,
      });
    }).toThrowError(`Another route with that path has been already added!`);
  });

  it('should throw error if route with incorrect for was added', () => {
    expect(() => {
      navigationReducer(initialState, {
        type: 'ADD',
        payload: {
          ...route,
          path: '',
        },
      });
    }).toThrowError(`Incorrect path format!`);

    expect(() => {
      navigationReducer(initialState, {
        type: 'ADD',
        payload: {
          ...route,
          path: '//',
        },
      });
    }).toThrowError(`Incorrect path format!`);

    expect(() => {
      navigationReducer(initialState, {
        type: 'ADD',
        payload: {
          ...route,
          path: 'pathWithoutSlash',
        },
      });
    }).toThrowError(`Incorrect path format!`);

    expect(() => {
      navigationReducer(initialState, {
        type: 'ADD',
        payload: {
          ...route,
          path: '/pathWithDoubleSlash/',
        },
      });
    }).toThrowError(`Incorrect path format!`);
  });

  it('should select route', () => {
    const result = navigationReducer(
      { ...initialState, routes: new Map([['/test', route]]) },
      { type: 'SELECT', payload: '/test' },
    );

    expect(result.selected).toEqual(route);
    expect(result.selectPath).toBe('/test');
    expect(result.previousPath).toBe('/');
  });

  it('should select null if route to select not exist', () => {
    const result = navigationReducer(
      { ...initialState, routes: new Map() },
      { type: 'SELECT', payload: '/notExist' },
    );

    expect(result.selected).toBeNull();
    expect(result.selectPath).toBe('/notExist');
    expect(result.previousPath).toBe('/');
  });

  it('should select route with argument', () => {
    const result = navigationReducer(
      { ...initialState, routes: new Map([['/test', route]]) },
      { type: 'SELECT', payload: '/test/2' },
    );

    expect(result.selected).toEqual(route);
    expect(result.selectPath).toBe('/test');
    expect(result.previousPath).toBe('/');
    expect(result.argument).toBe('2');
  });

  it(`should set previous path to selected path`, () => {
    const result = navigationReducer(
      {
        ...initialState,
        routes: new Map([['/test', route]]),
        selectPath: '/path',
      },
      { type: 'SELECT', payload: '/test' },
    );

    expect(result.previousPath).toBe('/path');
  });

  it(`should set previous path to selected path with argument if selected path has argument`, () => {
    const result = navigationReducer(
      {
        ...initialState,
        routes: new Map([['/test', route]]),
        selectPath: '/path',
        argument: '2',
      },
      { type: 'SELECT', payload: '/test' },
    );

    expect(result.previousPath).toBe('/path/2');
  });

  it(`should remove path`, () => {
    const route2 = {
      ...route,
      path: '/2',
    };

    const result = navigationReducer(
      {
        ...initialState,
        routes: new Map([
          ['/test', route],
          ['/2', route2],
        ]),
        selectPath: '/test',
        argument: '',
      },
      { type: 'REMOVE', payload: '/2' },
    );

    expect(result.routes).toEqual(new Map([['/test', route]]));
  });

  it(`should set selected to null if selected path was removed`, () => {
    const route2 = {
      ...route,
      path: '/2',
    };

    const result = navigationReducer(
      {
        ...initialState,
        routes: new Map([
          ['/test', route],
          ['/2', route2],
        ]),
        selectPath: '/test',
        argument: '',
      },
      { type: 'REMOVE', payload: '/test' },
    );

    expect(result.routes).toEqual(new Map([['/2', route2]]));
    expect(result.selectPath).toEqual('/test');
    expect(result.selected).toEqual(null);
  });
});
