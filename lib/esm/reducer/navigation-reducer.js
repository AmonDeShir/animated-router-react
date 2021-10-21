var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function navigationReducer(state, action) {
    switch (action.type) {
        case 'ADD': {
            return addRoute(state, action.payload);
        }
        case 'SELECT': {
            return selectRoute(state, action.payload);
        }
        case 'REMOVE': {
            state.routes.delete(action.payload);
            return __assign({}, state);
        }
        default: {
            return state;
        }
    }
}
function addRoute(state, route) {
    throwErrorIfRouteWithThatPathAlreadyExist(state, route.path);
    throwErrorIfPathHasIncorrectFormat(route.path);
    var resultState = __assign({}, state);
    if (isDefaultSelectedRoute(route.path)) {
        resultState = selectDefaultSelectedRoute(resultState, route);
    }
    return __assign(__assign({}, resultState), { routes: new Map(__spreadArray(__spreadArray([], __read(state.routes), false), [[route.path, route]], false)) });
}
function throwErrorIfRouteWithThatPathAlreadyExist(state, path) {
    if (isRouteWithThatPathExisted(state, path))
        throw new Error("Another route with that path has been already added!");
}
function isRouteWithThatPathExisted(state, path) {
    return state.routes.get(path) !== undefined;
}
function throwErrorIfPathHasIncorrectFormat(path) {
    if (!hasCorrectFormat(path))
        throw new Error("Incorrect path format!");
}
function hasCorrectFormat(path) {
    return path.split('/').length === 2 && path[0] === '/';
}
function isDefaultSelectedRoute(path) {
    return path === parsePath(window.location.pathname).selectPath;
}
function selectDefaultSelectedRoute(state, route) {
    return __assign(__assign({}, state), { selectPath: route.path, selected: route, argument: parsePath(window.location.pathname).argument });
}
function selectRoute(state, payload) {
    var path = typeof payload === 'string' ? payload : payload.path;
    var shouldUpdateHistory = typeof payload === 'string' ? true : payload.updateHistory;
    var _a = parsePath(path), selectPath = _a.selectPath, argument = _a.argument;
    if (shouldUpdateHistory) {
        var location_1 = window.location.origin + path;
        window.history.pushState(path, path, location_1);
    }
    return __assign(__assign({}, state), { selected: state.routes.get(selectPath) || null, previousPath: state.argument
            ? state.selectPath + "/" + state.argument
            : state.selectPath, selectPath: selectPath, argument: argument });
}
function parsePath(path) {
    var splitPath = path.split('/');
    return {
        selectPath: "/" + splitPath[1],
        argument: splitPath.slice(2).join('/'),
    };
}
export default navigationReducer;
