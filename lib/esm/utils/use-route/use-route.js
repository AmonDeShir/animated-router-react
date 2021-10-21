import { useContext, useMemo } from 'react';
import { NavigationContext } from '../../reducer/context/navigation-context';
var useRoute = function (path) {
    var routes = useContext(NavigationContext).state.routes;
    return useMemo(function () { return routes.get(path); }, [path, routes]);
};
export default useRoute;
