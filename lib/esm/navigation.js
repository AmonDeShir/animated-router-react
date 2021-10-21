import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import NavigationProvider from './reducer/context/navigation-context';
import Error404Route from './route-404/route-404';
var Navigation = function (_a) {
    var children = _a.children;
    return (_jsxs(NavigationProvider, { children: [_jsx(Error404Route, {}, void 0), children] }, void 0));
};
export default Navigation;
