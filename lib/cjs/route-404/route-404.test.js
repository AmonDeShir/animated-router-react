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
var react_1 = require("@testing-library/react");
var navigation_context_1 = require("../reducer/context/navigation-context");
var route_404_1 = __importDefault(require("./route-404"));
describe("route-404", function () {
    it("display route with path equal \"/404\" if NavigationContext.state.selected is null and route on that path exist", function () {
        var dispatch = jest.fn();
        var state = {
            selected: null,
            routes: new Map([
                ['/404', { component: (0, jsx_runtime_1.jsx)("div", { children: "test route" }, void 0) }],
            ]),
        };
        (0, react_1.render)((0, jsx_runtime_1.jsx)(navigation_context_1.NavigationContext.Provider, __assign({ value: { dispatch: dispatch, state: state } }, { children: (0, jsx_runtime_1.jsx)(route_404_1.default, {}, void 0) }), void 0));
        expect(react_1.screen.queryByText('test route')).toBeTruthy();
    });
    it("display \"Page doesn't exist\" if NavigationContext.state.selected is null and route on path \"/404\" not exist", function () {
        var dispatch = jest.fn();
        (0, react_1.render)((0, jsx_runtime_1.jsx)(navigation_context_1.NavigationContext.Provider, __assign({ value: {
                dispatch: dispatch,
                state: { selected: null, routes: new Map() },
            } }, { children: (0, jsx_runtime_1.jsx)(route_404_1.default, {}, void 0) }), void 0));
        expect(react_1.screen.queryByText("Page doesn't exist")).toBeTruthy();
    });
});
