import { useContext, useMemo } from 'react';
import { NavigationContext } from '../../reducer/context/navigation-context';
var usePaths = function () {
    var _a = useContext(NavigationContext).state, selectPath = _a.selectPath, previousPath = _a.previousPath;
    return useMemo(function () { return ({
        selectPath: selectPath || window.location.pathname,
        previousPath: previousPath || window.location.pathname,
    }); }, [previousPath, selectPath]);
};
export default usePaths;
