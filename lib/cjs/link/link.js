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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var navigation_context_1 = require("../reducer/context/navigation-context");
var Link = function (_a) {
    var children = _a.children, className = _a.className, style = _a.style, to = _a.to;
    var dispatch = (0, react_1.useContext)(navigation_context_1.NavigationContext).dispatch;
    var handleClick = function (event) {
        event.preventDefault();
        dispatch({ type: 'SELECT', payload: to });
    };
    return ((0, jsx_runtime_1.jsx)("a", __assign({ href: to, onClick: handleClick, className: className, style: style }, { children: children }), void 0));
};
exports.default = Link;
