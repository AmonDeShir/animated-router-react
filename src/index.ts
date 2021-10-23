import Navigation from './navigation';
import Link from './link/link';
import Route from './route/route';
import { NavigationContext } from './reducer/context/navigation-context';
import { Action } from './reducer/actions';

import useDecodedNavigationArgument from './utils/use-decoded-navigation-argument/use-decoded-navigation-argument';
import useOpenPage from './utils/use-open-page/use-open-page';

export { Animation } from './reducer/types';
export { Link, NavigationContext, Action as NavigationAction, Route };
export { useOpenPage, useDecodedNavigationArgument };

export default Navigation;
