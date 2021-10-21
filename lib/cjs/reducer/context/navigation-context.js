"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationContext = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var navigation_reducer_1 = __importDefault(require("../navigation-reducer"));
var defaultState = {
    routes: new Map(),
    selected: null,
    selectPath: window.location.pathname,
    previousPath: null,
    argument: '',
};
exports.NavigationContext = react_1.default.createContext({
    dispatch: function () {
        throw Error('Dispatch cannot be use outside of NavigationProvider!');
    },
    state: defaultState,
});
var NavigationProvider = function (_a) {
    var children = _a.children;
    var _b = __read((0, react_1.useReducer)(navigation_reducer_1.default, defaultState), 2), state = _b[0], dispatch = _b[1];
    (0, react_1.useEffect)(function () {
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
    return ((0, jsx_runtime_1.jsx)(exports.NavigationContext.Provider, __assign({ value: { dispatch: dispatch, state: state } }, { children: children }), void 0));
};
exports.default = NavigationProvider;
