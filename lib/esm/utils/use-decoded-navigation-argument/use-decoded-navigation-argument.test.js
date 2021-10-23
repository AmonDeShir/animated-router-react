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
import emptyWord from './use-decoded-navigation-argument.data';
import { NavigationContext } from '../../reducer/context/navigation-context';
import useDecodedNavigationArgument from './use-decoded-navigation-argument';
var wrapper = function (argument) {
    return function (_a) {
        var children = _a.children;
        return (_jsx(NavigationContext.Provider, __assign({ value: { dispatch: function () { }, state: { argument: argument } } }, { children: children }), void 0));
    };
};
describe("useDecodedNavigationArgument", function () {
    it("should return null if navigation.argument is an empty string", function () {
        var result = renderHook(function () { return useDecodedNavigationArgument(); }, {
            wrapper: wrapper(''),
        }).result;
        expect(result.current).toBeUndefined();
    });
    it("should return argument if navigation.argument is string", function () {
        var result = renderHook(function () { return useDecodedNavigationArgument(); }, {
            wrapper: wrapper('test'),
        }).result;
        expect(result.current).toEqual('test');
    });
    it("should return decoded argument if navigation.argument is string", function () {
        var result = renderHook(function () { return useDecodedNavigationArgument(); }, {
            wrapper: wrapper(encodeURI('%--.\\d//data')),
        }).result;
        expect(result.current).toEqual('%--.\\d//data');
    });
    it("should return undefined is navigation.argument is \"undefined\"", function () {
        var result = renderHook(function () { return useDecodedNavigationArgument(); }, {
            wrapper: wrapper('undefined'),
        }).result;
        expect(result.current).toBeUndefined();
    });
    it("should return undefined is navigation.argument is \"null\"", function () {
        var result = renderHook(function () { return useDecodedNavigationArgument(); }, {
            wrapper: wrapper('null'),
        }).result;
        expect(result.current).toBeUndefined();
    });
    it("should return undefined is navigation.argument is null", function () {
        var result = renderHook(function () { return useDecodedNavigationArgument(); }, {
            wrapper: wrapper(null),
        }).result;
        expect(result.current).toBeUndefined();
    });
    it("should return undefined is navigation.argument is undefined", function () {
        var result = renderHook(function () { return useDecodedNavigationArgument(); }, {
            wrapper: wrapper(undefined),
        }).result;
        expect(result.current).toBeUndefined();
    });
    it("should return argument if navigation.argument can't be parse by json.parse", function () {
        var result = renderHook(function () { return useDecodedNavigationArgument(); }, {
            wrapper: wrapper('} data'),
        }).result;
        expect(result.current).toEqual('} data');
    });
    it("should return parsed argument if navigation.argument can be parse by json.parse", function () {
        var data = encodeURI(JSON.stringify(emptyWord));
        var result = renderHook(function () { return useDecodedNavigationArgument(); }, {
            wrapper: wrapper(data),
        }).result;
        expect(result.current).toEqual(emptyWord);
    });
});
