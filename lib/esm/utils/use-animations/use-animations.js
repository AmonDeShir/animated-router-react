import { useMemo } from 'react';
import usePaths from '../use-paths/use-paths';
import useRoute from '../use-route/use-route';
var getAnimation = function (path, map) {
    return (map === null || map === void 0 ? void 0 : map.get(path)) || (map === null || map === void 0 ? void 0 : map.get('default'));
};
var useAnimations = function (path) {
    var _a = usePaths(), previousPath = _a.previousPath, selectPath = _a.selectPath;
    var route = useRoute(path);
    return useMemo(function () { return ({
        enterAnimation: getAnimation(previousPath, route === null || route === void 0 ? void 0 : route.enterAnimation),
        exitAnimation: getAnimation(selectPath, route === null || route === void 0 ? void 0 : route.exitAnimation),
    }); }, [previousPath, route === null || route === void 0 ? void 0 : route.enterAnimation, route === null || route === void 0 ? void 0 : route.exitAnimation, selectPath]);
};
export default useAnimations;
