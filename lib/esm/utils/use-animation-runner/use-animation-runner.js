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
import { useEffect, useMemo, useState } from 'react';
import useTimeoutManager from '../use-timeout-manager/use-timeout-manager';
import useAnimations from '../use-animations/use-animations';
import usePaths from '../use-paths/use-paths';
var useAnimationRunner = function (path, ref) {
    var selectPath = usePaths().selectPath;
    var _a = useAnimations(path), enterAnimation = _a.enterAnimation, exitAnimation = _a.exitAnimation;
    var timeouts = useTimeoutManager(1000);
    var _b = __read(useState(true), 2), hidden = _b[0], setHidden = _b[1];
    var status = useMemo(function () {
        if (!hidden && path !== selectPath) {
            return 'hide';
        }
        if (hidden && path === selectPath) {
            return 'show';
        }
        return 'none';
    }, [hidden, path, selectPath]);
    useEffect(function () {
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
export default useAnimationRunner;
