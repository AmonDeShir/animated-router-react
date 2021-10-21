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
import { jsx as _jsx } from "react/jsx-runtime";
import { renderHook } from '@testing-library/react-hooks';
import { NavigationContext } from '../../reducer/context/navigation-context';
import usePaths from './use-paths';
var wrapper = function (state) {
    return function (_a) {
        var children = _a.children;
        return (_jsx(NavigationContext.Provider, __assign({ value: { dispatch: function () { }, state: state } }, { children: children }), void 0));
    };
};
describe("utils/navigation/usePath", function () {
    beforeEach(function () {
        delete window.location;
        window.location = new URL('http://localhost/');
    });
    it("should return selectPath from navigation context", function () {
        var result = renderHook(function () { return usePaths(); }, {
            wrapper: wrapper({ selectPath: '/select-path' }),
        }).result;
        expect(result.current.selectPath).toEqual('/select-path');
    });
    it("should return previousPath from navigation context", function () {
        var result = renderHook(function () { return usePaths(); }, {
            wrapper: wrapper({ previousPath: '/previous-path' }),
        }).result;
        expect(result.current.previousPath).toEqual('/previous-path');
    });
    it("should return selectPath from window.location.path if selectPath in navigation context is null", function () {
        window.location.pathname = '/selectPath-path';
        var result = renderHook(function () { return usePaths(); }, { wrapper: wrapper({}) }).result;
        expect(result.current.selectPath).toEqual('/selectPath-path');
    });
    it("should return previousPath from window.location.path if selectPath in navigation context is null", function () {
        window.location.pathname = '/previous-path';
        var result = renderHook(function () { return usePaths(); }, { wrapper: wrapper({}) }).result;
        expect(result.current.previousPath).toEqual('/previous-path');
    });
});
