import React, { PropsWithChildren } from 'react';
import { Action } from '../actions';
import { State } from '../types';
declare type ContextValue = {
    state: State;
    dispatch: React.Dispatch<Action>;
};
export declare const NavigationContext: React.Context<ContextValue>;
declare const NavigationProvider: ({ children }: PropsWithChildren<{}>) => JSX.Element;
export default NavigationProvider;
