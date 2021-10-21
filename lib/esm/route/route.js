import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import React, { useContext, useEffect, useRef } from 'react';
import animationMap from '../utils/animation-map/animation-map';
import useAnimationRunner from '../utils/use-animation-runner/use-animation-runner';
import { NavigationContext } from '../reducer/context/navigation-context';
var Route = function (_a) {
    var path = _a.path, component = _a.component, enterAnimation = _a.enterAnimation, exitAnimation = _a.exitAnimation, _b = _a.prepare, prepare = _b === void 0 ? [] : _b;
    var ref = useRef(null);
    var hidden = useAnimationRunner(path, ref).hidden;
    var dispatch = useContext(NavigationContext).dispatch;
    useEffect(function () {
        dispatch({
            type: 'ADD',
            payload: {
                component: component,
                path: path,
                enterAnimation: animationMap(enterAnimation),
                exitAnimation: animationMap(exitAnimation),
                prepare: prepare,
            },
        });
        return function () { return dispatch({ type: 'REMOVE', payload: path }); };
    }, []);
    return _jsx(_Fragment, { children: !hidden && React.cloneElement(component, { ref: ref }) }, void 0);
};
export default Route;
