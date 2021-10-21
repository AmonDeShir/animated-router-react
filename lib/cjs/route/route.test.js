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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var useAnimationRunner = __importStar(require("../utils/use-animation-runner/use-animation-runner"));
var navigation_context_1 = require("../reducer/context/navigation-context");
var route_1 = __importDefault(require("./route"));
var dispatch = jest.fn();
var renderRoute = function (path) { return function (element) {
    return (0, react_1.render)((0, jsx_runtime_1.jsx)(navigation_context_1.NavigationContext.Provider, __assign({ value: { dispatch: dispatch, state: { selectPath: path } } }, { children: element }), void 0));
}; };
describe("Route", function () {
    beforeEach(function () {
        dispatch.mockClear();
        jest.spyOn(useAnimationRunner, 'default').mockReturnValue({ hidden: true });
    });
    it("should call add action with: path, component and animations from props", function () {
        var animation = { animation: function () { }, time: 0 };
        renderRoute('/')((0, jsx_runtime_1.jsx)(route_1.default, { component: (0, jsx_runtime_1.jsx)("div", {}, void 0), path: "/", enterAnimation: animation, exitAnimation: animation }, void 0));
        expect(dispatch).toBeCalledWith({
            type: 'ADD',
            payload: {
                component: (0, jsx_runtime_1.jsx)("div", {}, void 0),
                path: '/',
                enterAnimation: new Map([['default', animation]]),
                exitAnimation: new Map([['default', animation]]),
                prepare: [],
            },
        });
    });
    it("should call dispatch remove action before unmount", function () {
        var unmount = renderRoute('/')((0, jsx_runtime_1.jsx)(route_1.default, { component: (0, jsx_runtime_1.jsx)("div", {}, void 0), path: "/" }, void 0)).unmount;
        unmount();
        expect(dispatch).toBeCalledWith({ type: 'REMOVE', payload: '/' });
    });
    it("should render component if useAnimationRunner.hidden is false", function () {
        jest
            .spyOn(useAnimationRunner, 'default')
            .mockReturnValue({ hidden: false });
        renderRoute('/')((0, jsx_runtime_1.jsx)(route_1.default, { component: (0, jsx_runtime_1.jsx)("div", { children: "item" }, void 0), path: "/" }, void 0));
        expect(react_1.screen.queryByText("item")).toBeTruthy();
    });
    it("shouldn't render component if useAnimationRunner.hidden is true but route should be register", function () {
        jest.spyOn(useAnimationRunner, 'default').mockReturnValue({ hidden: true });
        renderRoute('/')((0, jsx_runtime_1.jsx)(route_1.default, { component: (0, jsx_runtime_1.jsx)("div", { children: "item" }, void 0), path: "/" }, void 0));
        expect(react_1.screen.queryByText("item")).toBeFalsy();
        expect(dispatch).toBeCalledWith({
            type: 'ADD',
            payload: {
                component: (0, jsx_runtime_1.jsx)("div", { children: "item" }, void 0),
                path: '/',
                enterAnimation: new Map(),
                exitAnimation: new Map(),
                prepare: [],
            },
        });
    });
});
