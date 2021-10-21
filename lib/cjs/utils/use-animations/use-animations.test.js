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
var use_animations_1 = __importDefault(require("./use-animations"));
var wrapper = function (state) {
    return function (_a) {
        var children = _a.children;
        return ((0, jsx_runtime_1.jsx)(navigation_context_1.NavigationContext.Provider, __assign({ value: { dispatch: function () { }, state: state } }, { children: children }), void 0));
    };
};
var animation = function () { };
var routes = new Map([
    [
        '/route',
        {
            component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0),
            path: '/route',
            enterAnimation: new Map([
                ['default', { time: 5, animation: animation }],
                ['/enter-test', { time: 20, animation: animation }],
            ]),
            exitAnimation: new Map([
                ['default', { time: 15, animation: animation }],
                ['/exit-test', { time: 10, animation: animation }],
            ]),
            prepare: [],
        },
    ],
]);
describe('/utils/navigation/useAnimation', function () {
    it("should return null if route is undefined", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_animations_1.default)('/undefined'); }, {
            wrapper: wrapper({ previousPath: '/', routes: routes }),
        }).result;
        expect(result.current.enterAnimation).toBeUndefined();
        expect(result.current.exitAnimation).toBeUndefined();
    });
    it("should return default exit animation for selected path if that animation isn't defined in route.exitAnimation map", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_animations_1.default)('/route'); }, {
            wrapper: wrapper({ previousPath: '/not-exist', selectPath: '/', routes: routes }),
        }).result;
        expect(result.current.exitAnimation).toEqual({ time: 15, animation: animation });
    });
    it("should return default enter animation for previous path if that animation isn't defined in route.enterAnimation map", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_animations_1.default)('/route'); }, {
            wrapper: wrapper({ previousPath: '/not-exist', selectPath: '/', routes: routes }),
        }).result;
        expect(result.current.enterAnimation).toEqual({ time: 5, animation: animation });
    });
    it("should return exit animation for selected path if that animation is defined in route.exitAnimation map", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_animations_1.default)('/route'); }, {
            wrapper: wrapper({ selectPath: '/exit-test', previousPath: '/', routes: routes }),
        }).result;
        expect(result.current.exitAnimation).toEqual({ time: 10, animation: animation });
    });
    it("should return enter animation for previous path if that animation is defined in route.enterAnimation map", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_animations_1.default)('/route'); }, {
            wrapper: wrapper({
                previousPath: '/enter-test',
                selectPath: '/',
                routes: routes,
            }),
        }).result;
        expect(result.current.enterAnimation).toEqual({ time: 20, animation: animation });
    });
    it("should return default exit animation for selected path if selected path is equal '/'", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_animations_1.default)('/route'); }, {
            wrapper: wrapper({ previousPath: '/', selectPath: '/', routes: routes }),
        }).result;
        expect(result.current.exitAnimation).toEqual({ time: 15, animation: animation });
    });
    it("should return default enter animation for previous path if previous path is equal '/'", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_animations_1.default)('/route'); }, {
            wrapper: wrapper({ previousPath: '/', selectPath: '/', routes: routes }),
        }).result;
        expect(result.current.enterAnimation).toEqual({ time: 5, animation: animation });
    });
});
