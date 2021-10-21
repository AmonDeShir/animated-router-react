import { Route } from './types';

type ADD = {
  type: 'ADD';
  payload: Route;
};

type SELECT = {
  type: 'SELECT';
  payload: string | { path: string; updateHistory: boolean };
};

type REMOVE = {
  type: 'REMOVE';
  payload: string;
};

export type Action = ADD | SELECT | REMOVE;
