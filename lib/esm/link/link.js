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
import { useContext } from 'react';
import { NavigationContext } from '../reducer/context/navigation-context';
var Link = function (_a) {
    var children = _a.children, className = _a.className, style = _a.style, to = _a.to;
    var dispatch = useContext(NavigationContext).dispatch;
    var handleClick = function (event) {
        event.preventDefault();
        dispatch({ type: 'SELECT', payload: to });
    };
    return (_jsx("a", __assign({ href: to, onClick: handleClick, className: className, style: style }, { children: children }), void 0));
};
export default Link;
