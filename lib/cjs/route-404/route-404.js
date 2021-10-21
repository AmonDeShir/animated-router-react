"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var navigation_context_1 = require("../reducer/context/navigation-context");
var Error404Route = function () {
    var _a;
    var state = (0, react_1.useContext)(navigation_context_1.NavigationContext).state;
    if (state.selected === null) {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: ((_a = state.routes.get('/404')) === null || _a === void 0 ? void 0 : _a.component) || "Page doesn't exist" }, void 0);
    }
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0);
};
exports.default = Error404Route;
