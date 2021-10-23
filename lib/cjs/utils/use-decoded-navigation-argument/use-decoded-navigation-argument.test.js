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
var use_decoded_navigation_argument_data_1 = __importDefault(require("./use-decoded-navigation-argument.data"));
var navigation_context_1 = require("../../reducer/context/navigation-context");
var use_decoded_navigation_argument_1 = __importDefault(require("./use-decoded-navigation-argument"));
var wrapper = function (argument) {
    return function (_a) {
        var children = _a.children;
        return ((0, jsx_runtime_1.jsx)(navigation_context_1.NavigationContext.Provider, __assign({ value: { dispatch: function () { }, state: { argument: argument } } }, { children: children }), void 0));
    };
};
describe("useDecodedNavigationArgument", function () {
    it("should return null if navigation.argument is an empty string", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_decoded_navigation_argument_1.default)(); }, {
            wrapper: wrapper(''),
        }).result;
        expect(result.current).toBeUndefined();
    });
    it("should return argument if navigation.argument is string", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_decoded_navigation_argument_1.default)(); }, {
            wrapper: wrapper('test'),
        }).result;
        expect(result.current).toEqual('test');
    });
    it("should return decoded argument if navigation.argument is string", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_decoded_navigation_argument_1.default)(); }, {
            wrapper: wrapper(encodeURI('%--.\\d//data')),
        }).result;
        expect(result.current).toEqual('%--.\\d//data');
    });
    it("should return undefined is navigation.argument is \"undefined\"", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_decoded_navigation_argument_1.default)(); }, {
            wrapper: wrapper('undefined'),
        }).result;
        expect(result.current).toBeUndefined();
    });
    it("should return undefined is navigation.argument is \"null\"", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_decoded_navigation_argument_1.default)(); }, {
            wrapper: wrapper('null'),
        }).result;
        expect(result.current).toBeUndefined();
    });
    it("should return undefined is navigation.argument is null", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_decoded_navigation_argument_1.default)(); }, {
            wrapper: wrapper(null),
        }).result;
        expect(result.current).toBeUndefined();
    });
    it("should return undefined is navigation.argument is undefined", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_decoded_navigation_argument_1.default)(); }, {
            wrapper: wrapper(undefined),
        }).result;
        expect(result.current).toBeUndefined();
    });
    it("should return argument if navigation.argument can't be parse by json.parse", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_decoded_navigation_argument_1.default)(); }, {
            wrapper: wrapper('} data'),
        }).result;
        expect(result.current).toEqual('} data');
    });
    it("should return parsed argument if navigation.argument can be parse by json.parse", function () {
        var data = encodeURI(JSON.stringify(use_decoded_navigation_argument_data_1.default));
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_decoded_navigation_argument_1.default)(); }, {
            wrapper: wrapper(data),
        }).result;
        expect(result.current).toEqual(use_decoded_navigation_argument_data_1.default);
    });
});
