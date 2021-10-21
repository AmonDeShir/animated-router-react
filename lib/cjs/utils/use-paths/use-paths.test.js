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
var use_paths_1 = __importDefault(require("./use-paths"));
var wrapper = function (state) {
    return function (_a) {
        var children = _a.children;
        return ((0, jsx_runtime_1.jsx)(navigation_context_1.NavigationContext.Provider, __assign({ value: { dispatch: function () { }, state: state } }, { children: children }), void 0));
    };
};
describe("utils/navigation/usePath", function () {
    beforeEach(function () {
        delete window.location;
        window.location = new URL('http://localhost/');
    });
    it("should return selectPath from navigation context", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_paths_1.default)(); }, {
            wrapper: wrapper({ selectPath: '/select-path' }),
        }).result;
        expect(result.current.selectPath).toEqual('/select-path');
    });
    it("should return previousPath from navigation context", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_paths_1.default)(); }, {
            wrapper: wrapper({ previousPath: '/previous-path' }),
        }).result;
        expect(result.current.previousPath).toEqual('/previous-path');
    });
    it("should return selectPath from window.location.path if selectPath in navigation context is null", function () {
        window.location.pathname = '/selectPath-path';
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_paths_1.default)(); }, { wrapper: wrapper({}) }).result;
        expect(result.current.selectPath).toEqual('/selectPath-path');
    });
    it("should return previousPath from window.location.path if selectPath in navigation context is null", function () {
        window.location.pathname = '/previous-path';
        var result = (0, react_hooks_1.renderHook)(function () { return (0, use_paths_1.default)(); }, { wrapper: wrapper({}) }).result;
        expect(result.current.previousPath).toEqual('/previous-path');
    });
});
