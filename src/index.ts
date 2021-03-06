import Navigation from './navigation';
import Link from './link/link';
import Route from './route/route';
import { NavigationContext } from './reducer/context/navigation-context';
import { Action } from './reducer/actions';

import useNavigationArgument from './utils/use-navigation-argument/use-navigation-argument';
import useOpenPage from './utils/use-open-page/use-open-page';

export { Animation, State as NavigationState } from './reducer/types';
export { Link, NavigationContext, Action as NavigationAction, Route };
export { useOpenPage, useNavigationArgument };

export default Navigation;
