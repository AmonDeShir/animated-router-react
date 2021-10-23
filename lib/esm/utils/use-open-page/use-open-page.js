import { useContext } from 'react';
import { NavigationContext } from '../../reducer/context/navigation-context';
var useOpenPage = function () {
    var dispatch = useContext(NavigationContext).dispatch;
    var prepareData = function (data) {
        return encodeURI(typeof data === 'string' ? data : JSON.stringify(data));
    };
    return function (page, options) {
        if (options === void 0) { options = {}; }
        var argument = options.argument, _a = options.updateHistory, updateHistory = _a === void 0 ? false : _a;
        var path = argument ? page + "/" + prepareData(argument) : page;
        if (page.length === 0) {
            throw Error("Page can't be an empty string!");
        }
        dispatch({
            type: 'SELECT',
            payload: { updateHistory: updateHistory, path: path },
        });
    };
};
export default useOpenPage;
