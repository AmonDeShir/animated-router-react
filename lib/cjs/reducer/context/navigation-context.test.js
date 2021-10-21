"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_hooks_1 = require("@testing-library/react-hooks");
var react_1 = require("react");
var navigation_context_1 = __importStar(require("./navigation-context"));
describe("NavigationContext", function () {
    it("should return default state values if is outside of NavigationContext", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, react_1.useContext)(navigation_context_1.NavigationContext); }).result;
        expect(result.current.state).toEqual({
            routes: new Map(),
            selected: null,
            selectPath: '/',
            previousPath: null,
            argument: '',
        });
    });
    it("dispatch should throw error if it is used outside of NavigationProvider", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, react_1.useContext)(navigation_context_1.NavigationContext); }).result;
        expect(function () {
            return (0, react_hooks_1.act)(function () {
                result.current.dispatch({ type: 'REMOVE', payload: '/2' });
            });
        }).toThrowError('Dispatch cannot be use outside of NavigationProvider!');
    });
    it("dispatch shouldn't throw error if it is used in NavigationProvider", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, react_1.useContext)(navigation_context_1.NavigationContext); }, {
            wrapper: navigation_context_1.default,
        }).result;
        expect(function () {
            return (0, react_hooks_1.act)(function () {
                result.current.dispatch({ type: 'REMOVE', payload: '/2' });
            });
        }).not.toThrowError('Dispatch cannot be use outside of NavigationProvider!');
    });
    it("should return default state with modified previousPath values if is in NavigationContext", function () {
        var result = (0, react_hooks_1.renderHook)(function () { return (0, react_1.useContext)(navigation_context_1.NavigationContext); }, {
            wrapper: navigation_context_1.default,
        }).result;
        expect(result.current.state).toEqual({
            routes: new Map(),
            selected: null,
            selectPath: '/',
            previousPath: null,
            argument: '',
        });
    });
});
