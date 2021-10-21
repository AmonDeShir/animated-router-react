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
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { renderHook } from '@testing-library/react-hooks';
import { NavigationContext } from '../../reducer/context/navigation-context';
import useAnimations from './use-animations';
var wrapper = function (state) {
    return function (_a) {
        var children = _a.children;
        return (_jsx(NavigationContext.Provider, __assign({ value: { dispatch: function () { }, state: state } }, { children: children }), void 0));
    };
};
var animation = function () { };
var routes = new Map([
    [
        '/route',
        {
            component: _jsx(_Fragment, {}, void 0),
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
        var result = renderHook(function () { return useAnimations('/undefined'); }, {
            wrapper: wrapper({ previousPath: '/', routes: routes }),
        }).result;
        expect(result.current.enterAnimation).toBeUndefined();
        expect(result.current.exitAnimation).toBeUndefined();
    });
    it("should return default exit animation for selected path if that animation isn't defined in route.exitAnimation map", function () {
        var result = renderHook(function () { return useAnimations('/route'); }, {
            wrapper: wrapper({ previousPath: '/not-exist', selectPath: '/', routes: routes }),
        }).result;
        expect(result.current.exitAnimation).toEqual({ time: 15, animation: animation });
    });
    it("should return default enter animation for previous path if that animation isn't defined in route.enterAnimation map", function () {
        var result = renderHook(function () { return useAnimations('/route'); }, {
            wrapper: wrapper({ previousPath: '/not-exist', selectPath: '/', routes: routes }),
        }).result;
        expect(result.current.enterAnimation).toEqual({ time: 5, animation: animation });
    });
    it("should return exit animation for selected path if that animation is defined in route.exitAnimation map", function () {
        var result = renderHook(function () { return useAnimations('/route'); }, {
            wrapper: wrapper({ selectPath: '/exit-test', previousPath: '/', routes: routes }),
        }).result;
        expect(result.current.exitAnimation).toEqual({ time: 10, animation: animation });
    });
    it("should return enter animation for previous path if that animation is defined in route.enterAnimation map", function () {
        var result = renderHook(function () { return useAnimations('/route'); }, {
            wrapper: wrapper({
                previousPath: '/enter-test',
                selectPath: '/',
                routes: routes,
            }),
        }).result;
        expect(result.current.enterAnimation).toEqual({ time: 20, animation: animation });
    });
    it("should return default exit animation for selected path if selected path is equal '/'", function () {
        var result = renderHook(function () { return useAnimations('/route'); }, {
            wrapper: wrapper({ previousPath: '/', selectPath: '/', routes: routes }),
        }).result;
        expect(result.current.exitAnimation).toEqual({ time: 15, animation: animation });
    });
    it("should return default enter animation for previous path if previous path is equal '/'", function () {
        var result = renderHook(function () { return useAnimations('/route'); }, {
            wrapper: wrapper({ previousPath: '/', selectPath: '/', routes: routes }),
        }).result;
        expect(result.current.enterAnimation).toEqual({ time: 5, animation: animation });
    });
});
