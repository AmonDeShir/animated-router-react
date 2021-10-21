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
import { render, screen } from '@testing-library/react';
import { NavigationContext } from '../reducer/context/navigation-context';
import Error404Route from './route-404';
describe("route-404", function () {
    it("display route with path equal \"/404\" if NavigationContext.state.selected is null and route on that path exist", function () {
        var dispatch = jest.fn();
        var state = {
            selected: null,
            routes: new Map([
                ['/404', { component: _jsx("div", { children: "test route" }, void 0) }],
            ]),
        };
        render(_jsx(NavigationContext.Provider, __assign({ value: { dispatch: dispatch, state: state } }, { children: _jsx(Error404Route, {}, void 0) }), void 0));
        expect(screen.queryByText('test route')).toBeTruthy();
    });
    it("display \"Page doesn't exist\" if NavigationContext.state.selected is null and route on path \"/404\" not exist", function () {
        var dispatch = jest.fn();
        render(_jsx(NavigationContext.Provider, __assign({ value: {
                dispatch: dispatch,
                state: { selected: null, routes: new Map() },
            } }, { children: _jsx(Error404Route, {}, void 0) }), void 0));
        expect(screen.queryByText("Page doesn't exist")).toBeTruthy();
    });
});
