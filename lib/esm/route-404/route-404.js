import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useContext } from 'react';
import { NavigationContext } from '../reducer/context/navigation-context';
var Error404Route = function () {
    var _a;
    var state = useContext(NavigationContext).state;
    if (state.selected === null) {
        return _jsx(_Fragment, { children: ((_a = state.routes.get('/404')) === null || _a === void 0 ? void 0 : _a.component) || "Page doesn't exist" }, void 0);
    }
    return _jsx(_Fragment, {}, void 0);
};
export default Error404Route;
