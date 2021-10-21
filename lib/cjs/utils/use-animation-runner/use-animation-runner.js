"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var use_timeout_manager_1 = __importDefault(require("../use-timeout-manager/use-timeout-manager"));
var use_animations_1 = __importDefault(require("../use-animations/use-animations"));
var use_paths_1 = __importDefault(require("../use-paths/use-paths"));
var useAnimationRunner = function (path, ref) {
    var selectPath = (0, use_paths_1.default)().selectPath;
    var _a = (0, use_animations_1.default)(path), enterAnimation = _a.enterAnimation, exitAnimation = _a.exitAnimation;
    var timeouts = (0, use_timeout_manager_1.default)(1000);
    var _b = __read((0, react_1.useState)(true), 2), hidden = _b[0], setHidden = _b[1];
    var status = (0, react_1.useMemo)(function () {
        if (!hidden && path !== selectPath) {
            return 'hide';
        }
        if (hidden && path === selectPath) {
            return 'show';
        }
        return 'none';
    }, [hidden, path, selectPath]);
    (0, react_1.useEffect)(function () {
        var cleanup = function (animation) {
            return animation.cleanup && animation.cleanup(ref);
        };
        if (status === 'show' && enterAnimation) {
            timeouts.set(function () {
                setHidden(false);
                enterAnimation.animation(ref);
            }, exitAnimation === null || exitAnimation === void 0 ? void 0 : exitAnimation.time);
            timeouts.set(function () { return cleanup(enterAnimation); }, enterAnimation.time);
        }
        if (status === 'hide' && exitAnimation) {
            exitAnimation.animation(ref);
            timeouts.set(function () {
                cleanup(exitAnimation);
                setHidden(true);
            }, exitAnimation.time);
        }
        if (status === 'show' && !enterAnimation) {
            setHidden(false);
        }
        if (status === 'hide' && !exitAnimation) {
            setHidden(true);
        }
    }, [enterAnimation, exitAnimation, ref, status, timeouts]);
    return { hidden: hidden };
};
exports.default = useAnimationRunner;
