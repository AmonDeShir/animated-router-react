"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var animation_map_1 = __importDefault(require("../utils/animation-map/animation-map"));
var use_animation_runner_1 = __importDefault(require("../utils/use-animation-runner/use-animation-runner"));
var navigation_context_1 = require("../reducer/context/navigation-context");
var Route = function (_a) {
    var path = _a.path, component = _a.component, enterAnimation = _a.enterAnimation, exitAnimation = _a.exitAnimation, _b = _a.prepare, prepare = _b === void 0 ? [] : _b;
    var ref = (0, react_1.useRef)(null);
    var hidden = (0, use_animation_runner_1.default)(path, ref).hidden;
    var dispatch = (0, react_1.useContext)(navigation_context_1.NavigationContext).dispatch;
    (0, react_1.useEffect)(function () {
        dispatch({
            type: 'ADD',
            payload: {
                component: component,
                path: path,
                enterAnimation: (0, animation_map_1.default)(enterAnimation),
                exitAnimation: (0, animation_map_1.default)(exitAnimation),
                prepare: prepare,
            },
        });
        return function () { return dispatch({ type: 'REMOVE', payload: path }); };
    }, []);
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: !hidden && react_1.default.cloneElement(component, { ref: ref }) }, void 0);
};
exports.default = Route;
