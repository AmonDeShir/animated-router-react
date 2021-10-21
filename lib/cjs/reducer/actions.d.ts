import { Route } from './types';
declare type ADD = {
    type: 'ADD';
    payload: Route;
};
declare type SELECT = {
    type: 'SELECT';
    payload: string | {
        path: string;
        updateHistory: boolean;
    };
};
declare type REMOVE = {
    type: 'REMOVE';
    payload: string;
};
export declare type Action = ADD | SELECT | REMOVE;
export {};
