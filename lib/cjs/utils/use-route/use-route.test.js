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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_hooks_1 = require("@testing-library/react-hooks");
var navigation_context_1 = require("../../reducer/context/navigation-context");
var use_route_1 = __importDefault(require("./use-route"));
var wrapper = function (routes) {
    return function (_a) {
        var children = _a.children;
        return ((0, jsx_runtime_1.jsx)(navigation_context_1.NavigationContext.Provider, __assign({ value: { dispatch: function () { }, state: { routes: routes } } }, { children: children }), void 0));
    };
};
describe("utils/navigation/useRoute", function () {
    it("should return selected route", function () {
        var routes = new Map([
            [
                'test',
                {
                    path: 'test',
                    component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0),
                    enterAnimation: new Map(),
                    exitAnimation: new Map(),
                    prepare: [],
                },
            ],
            [
                'selected',
                {
                    path: 'selected',
                    component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0),
                    enterAnimation: new Map(),
                    exitAnimation: new Map(),
                    prepare: [],
                },
            ],
        ]);
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_route_1.default)('selected'); }, {
            wrapper: wrapper(routes),
        }).result;
        expect(result.current).toEqual({
            path: 'selected',
            component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0),
            enterAnimation: new Map(),
            exitAnimation: new Map(),
            prepare: [],
        });
    });
    it("should return undefined if path is an empty string", function () {
        var routes = new Map([
            [
                'test',
                {
                    path: 'test',
                    component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0),
                    enterAnimation: new Map(),
                    exitAnimation: new Map(),
                    prepare: [],
                },
            ],
            [
                'selected',
                {
                    path: 'selected',
                    component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0),
                    enterAnimation: new Map(),
                    exitAnimation: new Map(),
                    prepare: [],
                },
            ],
        ]);
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_route_1.default)(''); }, {
            wrapper: wrapper(routes),
        }).result;
        expect(result.current).toEqual(undefined);
    });
    it("should return undefined if routes is an empty map", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_route_1.default)('selected'); }, {
            wrapper: wrapper(new Map()),
        }).result;
        expect(result.current).toEqual(undefined);
    });
    it("should return undefined if selected route not exist in routes map", function () {
        var routes = new Map([
            [
                'test',
                {
                    path: 'test',
                    component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0),
                    enterAnimation: new Map(),
                    exitAnimation: new Map(),
                    prepare: [],
                },
            ],
            [
                'non-selected',
                {
                    path: 'non-selected',
                    component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0),
                    enterAnimation: new Map(),
                    exitAnimation: new Map(),
                    prepare: [],
                },
            ],
        ]);
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_route_1.default)('selected'); }, {
            wrapper: wrapper(routes),
        }).result;
        expect(result.current).toEqual(undefined);
    });
});
