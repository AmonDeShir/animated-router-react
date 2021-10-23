import { useContext, useMemo } from 'react';
import { NavigationContext } from '../../reducer/context/navigation-context';
var useDecodedNavigationArgument = function () {
    var argument = useContext(NavigationContext).state.argument;
    var decodedArgument = useMemo(function () {
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
export default useDecodedNavigationArgument;
