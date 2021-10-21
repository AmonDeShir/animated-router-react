var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useReducer } from 'react';
import navigationReducer from '../navigation-reducer';
var defaultState = {
    routes: new Map(),
    selected: null,
    selectPath: window.location.pathname,
    previousPath: null,
    argument: '',
};
export var NavigationContext = React.createContext({
    dispatch: function () {
        throw Error('Dispatch cannot be use outside of NavigationProvider!');
    },
    state: defaultState,
});
var NavigationProvider = function (_a) {
    var children = _a.children;
    var _b = __read(useReducer(navigationReducer, defaultState), 2), state = _b[0], dispatch = _b[1];
    useEffect(function () {
        var handlePopstate = function () {
            dispatch({
                type: 'SELECT',
                payload: {
                    path: window.location.pathname,
                    updateHistory: false,
                },
            });
        };
        window.addEventListener('popstate', handlePopstate);
        return function () { return window.removeEventListener('popstate', handlePopstate); };
    }, []);
    return (_jsx(NavigationContext.Provider, __assign({ value: { dispatch: dispatch, state: state } }, { children: children }), void 0));
};
export default NavigationProvider;
