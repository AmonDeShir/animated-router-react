"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var use_paths_1 = __importDefault(require("../use-paths/use-paths"));
var use_route_1 = __importDefault(require("../use-route/use-route"));
var getAnimation = function (path, map) {
    return (map === null || map === void 0 ? void 0 : map.get(path)) || (map === null || map === void 0 ? void 0 : map.get('default'));
};
var useAnimations = function (path) {
    var _a = (0, use_paths_1.default)(), previousPath = _a.previousPath, selectPath = _a.selectPath;
    var route = (0, use_route_1.default)(path);
    return (0, react_1.useMemo)(function () { return ({
        enterAnimation: getAnimation(previousPath, route === null || route === void 0 ? void 0 : route.enterAnimation),
        exitAnimation: getAnimation(selectPath, route === null || route === void 0 ? void 0 : route.exitAnimation),
    }); }, [previousPath, route === null || route === void 0 ? void 0 : route.enterAnimation, route === null || route === void 0 ? void 0 : route.exitAnimation, selectPath]);
};
exports.default = useAnimations;
