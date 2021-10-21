import { Action } from './actions';
import { Route, State } from './types';

function navigationReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD': {
      return addRoute(state, action.payload);
    }

    case 'SELECT': {
      return selectRoute(state, action.payload);
    }

    case 'REMOVE': {
      state.routes.delete(action.payload);

      return { ...state };
    }

    default: {
      return state;
    }
  }
}

function addRoute(state: State, route: Route): State {
  throwErrorIfRouteWithThatPathAlreadyExist(state, route.path);
  throwErrorIfPathHasIncorrectFormat(route.path);

  let resultState = { ...state };

  if (isDefaultSelectedRoute(route.path)) {
    resultState = selectDefaultSelectedRoute(resultState, route);
  }

  return {
    ...resultState,
    routes: new Map([...state.routes, [route.path, route]]),
  };
}

function throwErrorIfRouteWithThatPathAlreadyExist(state: State, path: string) {
  if (isRouteWithThatPathExisted(state, path))
    throw new Error(`Another route with that path has been already added!`);
}

function isRouteWithThatPathExisted(state: State, path: string) {
  return state.routes.get(path) !== undefined;
}

function throwErrorIfPathHasIncorrectFormat(path: string) {
  if (!hasCorrectFormat(path)) throw new Error(`Incorrect path format!`);
}

function hasCorrectFormat(path: string) {
  return path.split('/').length === 2 && path[0] === '/';
}

function isDefaultSelectedRoute(path: string) {
  return path === parsePath(window.location.pathname).selectPath;
}

function selectDefaultSelectedRoute(state: State, route: Route): State {
  return {
    ...state,
    selectPath: route.path,
    selected: route,
    argument: parsePath(window.location.pathname).argument,
  };
}

function selectRoute(
  state: State,
  payload: string | { path: string; updateHistory: boolean },
): State {
  const path = typeof payload === 'string' ? payload : payload.path;
  const shouldUpdateHistory =
    typeof payload === 'string' ? true : payload.updateHistory;
  const { selectPath, argument } = parsePath(path);

  if (shouldUpdateHistory) {
    const location = window.location.origin + path;
    window.history.pushState(path, path, location);
  }

  return {
    ...state,
    selected: state.routes.get(selectPath) || null,
    previousPath: state.argument
      ? `${state.selectPath}/${state.argument}`
      : state.selectPath,
    selectPath,
    argument,
  };
}

function parsePath(path: string) {
  const splitPath = path.split('/');

  return {
    selectPath: `/${splitPath[1]}`,
    argument: splitPath.slice(2).join('/'),
  };
}

export default navigationReducer;
