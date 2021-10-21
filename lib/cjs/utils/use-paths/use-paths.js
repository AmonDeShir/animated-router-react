"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var navigation_context_1 = require("../../reducer/context/navigation-context");
var usePaths = function () {
    var _a = (0, react_1.useContext)(navigation_context_1.NavigationContext).state, selectPath = _a.selectPath, previousPath = _a.previousPath;
    return (0, react_1.useMemo)(function () { return ({
        selectPath: selectPath || window.location.pathname,
        previousPath: previousPath || window.location.pathname,
    }); }, [previousPath, selectPath]);
};
exports.default = usePaths;
