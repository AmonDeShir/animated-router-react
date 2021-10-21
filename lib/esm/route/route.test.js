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
import * as useAnimationRunner from '../utils/use-animation-runner/use-animation-runner';
import { NavigationContext } from '../reducer/context/navigation-context';
import Route from './route';
var dispatch = jest.fn();
var renderRoute = function (path) { return function (element) {
    return render(_jsx(NavigationContext.Provider, __assign({ value: { dispatch: dispatch, state: { selectPath: path } } }, { children: element }), void 0));
}; };
describe("Route", function () {
    beforeEach(function () {
        dispatch.mockClear();
        jest.spyOn(useAnimationRunner, 'default').mockReturnValue({ hidden: true });
    });
    it("should call add action with: path, component and animations from props", function () {
        var animation = { animation: function () { }, time: 0 };
        renderRoute('/')(_jsx(Route, { component: _jsx("div", {}, void 0), path: "/", enterAnimation: animation, exitAnimation: animation }, void 0));
        expect(dispatch).toBeCalledWith({
            type: 'ADD',
            payload: {
                component: _jsx("div", {}, void 0),
                path: '/',
                enterAnimation: new Map([['default', animation]]),
                exitAnimation: new Map([['default', animation]]),
                prepare: [],
            },
        });
    });
    it("should call dispatch remove action before unmount", function () {
        var unmount = renderRoute('/')(_jsx(Route, { component: _jsx("div", {}, void 0), path: "/" }, void 0)).unmount;
        unmount();
        expect(dispatch).toBeCalledWith({ type: 'REMOVE', payload: '/' });
    });
    it("should render component if useAnimationRunner.hidden is false", function () {
        jest
            .spyOn(useAnimationRunner, 'default')
            .mockReturnValue({ hidden: false });
        renderRoute('/')(_jsx(Route, { component: _jsx("div", { children: "item" }, void 0), path: "/" }, void 0));
        expect(screen.queryByText("item")).toBeTruthy();
    });
    it("shouldn't render component if useAnimationRunner.hidden is true but route should be register", function () {
        jest.spyOn(useAnimationRunner, 'default').mockReturnValue({ hidden: true });
        renderRoute('/')(_jsx(Route, { component: _jsx("div", { children: "item" }, void 0), path: "/" }, void 0));
        expect(screen.queryByText("item")).toBeFalsy();
        expect(dispatch).toBeCalledWith({
            type: 'ADD',
            payload: {
                component: _jsx("div", { children: "item" }, void 0),
                path: '/',
                enterAnimation: new Map(),
                exitAnimation: new Map(),
                prepare: [],
            },
        });
    });
});
