"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var navigation_context_1 = require("../../reducer/context/navigation-context");
var useDecodedNavigationArgument = function () {
    var argument = (0, react_1.useContext)(navigation_context_1.NavigationContext).state.argument;
    var decodedArgument = (0, react_1.useMemo)(function () {
        if (!argument) {
            return undefined;
        }
        if (argument === 'undefined' || argument === 'null') {
            return undefined;
        }
        var decoded = decodeURI(argument);
        try {
            return JSON.parse(decoded);
        }
        catch (e) {
            return decoded;
        }
    }, [argument]);
    return decodedArgument;
};
exports.default = useDecodedNavigationArgument;
