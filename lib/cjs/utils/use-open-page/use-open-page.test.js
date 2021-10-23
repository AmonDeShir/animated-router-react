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
var use_open_page_1 = __importDefault(require("./use-open-page"));
var dispatch = jest.fn();
var wrapper = function (_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsx)(navigation_context_1.NavigationContext.Provider, __assign({ value: { dispatch: dispatch, state: {} } }, { children: children }), void 0));
};
describe('useOpenPage', function () {
    beforeEach(function () {
        dispatch.mockClear();
    });
    it("should throw error if page is an empty string", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_open_page_1.default)(); }, { wrapper: wrapper }).result;
        var openPage = result.current;
        expect(function () { return openPage(''); }).toThrowError("Page can't be an empty string!");
    });
    it("should open page with out argument, opening page shouldn't be save in history", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_open_page_1.default)(); }, { wrapper: wrapper }).result;
        var openPage = result.current;
        (0, react_hooks_1.act)(function () { return openPage('/page'); });
        expect(dispatch).toBeCalledWith({
            type: 'SELECT',
            payload: { path: '/page', updateHistory: false },
        });
    });
    it("should open page without argument if argument is an empty string", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_open_page_1.default)(); }, { wrapper: wrapper }).result;
        var openPage = result.current;
        (0, react_hooks_1.act)(function () { return openPage('/page', { argument: '' }); });
        expect(dispatch).toBeCalledWith({
            type: 'SELECT',
            payload: { path: '/page', updateHistory: false },
        });
    });
    it("should open page with encoded argument if argument is a string", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_open_page_1.default)(); }, { wrapper: wrapper }).result;
        var openPage = result.current;
        (0, react_hooks_1.act)(function () {
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
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_open_page_1.default)(); }, { wrapper: wrapper }).result;
        var openPage = result.current;
        (0, react_hooks_1.act)(function () {
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
