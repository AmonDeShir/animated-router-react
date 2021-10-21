"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var navigation_context_1 = require("../../reducer/context/navigation-context");
var useRoute = function (path) {
    var routes = (0, react_1.useContext)(navigation_context_1.NavigationContext).state.routes;
    return (0, react_1.useMemo)(function () { return routes.get(path); }, [path, routes]);
};
exports.default = useRoute;
