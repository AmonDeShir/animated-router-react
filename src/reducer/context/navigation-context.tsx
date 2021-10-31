import React, { PropsWithChildren, useEffect, useReducer } from 'react';

import { Action } from '../actions';
import navigationReducer from '../navigation-reducer';
import { State } from '../types';

type ContextValue = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const defaultState = {
  routes: new Map(),
  selected: null,
  selectPath: window.location.pathname,
  initPath: window.location.pathname,
  previousPath: null,
  argument: '',
};

export const NavigationContext = React.createContext<ContextValue>({
  dispatch: () => {
    throw Error('Dispatch cannot be use outside of NavigationProvider!');
  },
  state: defaultState,
});

const NavigationProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(navigationReducer, defaultState);

  useEffect(() => {
    const handlePopstate = () => {
      dispatch({
        type: 'SELECT',
        payload: {
          path: window.location.pathname,
          updateHistory: false,
        },
      });
    };

    window.addEventListener('popstate', handlePopstate);
    return () => window.removeEventListener('popstate', handlePopstate);
  }, []);

  return (
    <NavigationContext.Provider value={{ dispatch, state }}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
