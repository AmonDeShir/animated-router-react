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
import useRoute from './use-route';
var wrapper = function (routes) {
    return function (_a) {
        var children = _a.children;
        return (_jsx(NavigationContext.Provider, __assign({ value: { dispatch: function () { }, state: { routes: routes } } }, { children: children }), void 0));
    };
};
describe("utils/navigation/useRoute", function () {
    it("should return selected route", function () {
        var routes = new Map([
            [
                'test',
                {
                    path: 'test',
                    component: _jsx(_Fragment, {}, void 0),
                    enterAnimation: new Map(),
                    exitAnimation: new Map(),
                    prepare: [],
                },
            ],
            [
                'selected',
                {
                    path: 'selected',
                    component: _jsx(_Fragment, {}, void 0),
                    enterAnimation: new Map(),
                    exitAnimation: new Map(),
                    prepare: [],
                },
            ],
        ]);
        var result = renderHook(function () { return useRoute('selected'); }, {
            wrapper: wrapper(routes),
        }).result;
        expect(result.current).toEqual({
            path: 'selected',
            component: _jsx(_Fragment, {}, void 0),
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
                    component: _jsx(_Fragment, {}, void 0),
                    enterAnimation: new Map(),
                    exitAnimation: new Map(),
                    prepare: [],
                },
            ],
            [
                'selected',
                {
                    path: 'selected',
                    component: _jsx(_Fragment, {}, void 0),
                    enterAnimation: new Map(),
                    exitAnimation: new Map(),
                    prepare: [],
                },
            ],
        ]);
        var result = renderHook(function () { return useRoute(''); }, {
            wrapper: wrapper(routes),
        }).result;
        expect(result.current).toEqual(undefined);
    });
    it("should return undefined if routes is an empty map", function () {
        var result = renderHook(function () { return useRoute('selected'); }, {
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
                    component: _jsx(_Fragment, {}, void 0),
                    enterAnimation: new Map(),
                    exitAnimation: new Map(),
                    prepare: [],
                },
            ],
            [
                'non-selected',
                {
                    path: 'non-selected',
                    component: _jsx(_Fragment, {}, void 0),
                    enterAnimation: new Map(),
                    exitAnimation: new Map(),
                    prepare: [],
                },
            ],
        ]);
        var result = renderHook(function () { return useRoute('selected'); }, {
            wrapper: wrapper(routes),
        }).result;
        expect(result.current).toEqual(undefined);
    });
});
