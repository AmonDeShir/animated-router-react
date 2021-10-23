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
import { act, renderHook, } from '@testing-library/react-hooks';
import { NavigationContext } from '../../reducer/context/navigation-context';
import useOpenPage from './use-open-page';
var dispatch = jest.fn();
var wrapper = function (_a) {
    var children = _a.children;
    return (_jsx(NavigationContext.Provider, __assign({ value: { dispatch: dispatch, state: {} } }, { children: children }), void 0));
};
describe('useOpenPage', function () {
    beforeEach(function () {
        dispatch.mockClear();
    });
    it("should throw error if page is an empty string", function () {
        var result = renderHook(function () { return useOpenPage(); }, { wrapper: wrapper }).result;
        var openPage = result.current;
        expect(function () { return openPage(''); }).toThrowError("Page can't be an empty string!");
    });
    it("should open page with out argument, opening page shouldn't be save in history", function () {
        var result = renderHook(function () { return useOpenPage(); }, { wrapper: wrapper }).result;
        var openPage = result.current;
        act(function () { return openPage('/page'); });
        expect(dispatch).toBeCalledWith({
            type: 'SELECT',
            payload: { path: '/page', updateHistory: false },
        });
    });
    it("should open page without argument if argument is an empty string", function () {
        var result = renderHook(function () { return useOpenPage(); }, { wrapper: wrapper }).result;
        var openPage = result.current;
        act(function () { return openPage('/page', { argument: '' }); });
        expect(dispatch).toBeCalledWith({
            type: 'SELECT',
            payload: { path: '/page', updateHistory: false },
        });
    });
    it("should open page with encoded argument if argument is a string", function () {
        var result = renderHook(function () { return useOpenPage(); }, { wrapper: wrapper }).result;
        var openPage = result.current;
        act(function () {
            return openPage('/page', { argument: 'an argument', updateHistory: true });
        });
        expect(dispatch).toBeCalledWith({
            type: 'SELECT',
            payload: {
                path: "/page/" + encodeURI('an argument'),
                updateHistory: true,
            },
        });
    });
    it("should open page with parsed and encoded argument if argument is an object", function () {
        var result = renderHook(function () { return useOpenPage(); }, { wrapper: wrapper }).result;
        var openPage = result.current;
        act(function () {
            return openPage('/page', {
                argument: { data: 'an object' },
                updateHistory: true,
            });
        });
        expect(dispatch).toBeCalledWith({
            type: 'SELECT',
            payload: {
                path: "/page/" + encodeURI(JSON.stringify({ data: 'an object' })),
                updateHistory: true,
            },
        });
    });
});
