import { PropsWithChildren } from 'react';

import NavigationProvider from './reducer/context/navigation-context';
import Error404Route from './route-404/route-404';

const Navigation = ({ children }: PropsWithChildren<{}>) => (
  <NavigationProvider>
    <Error404Route />
    {children}
  </NavigationProvider>
);

export default Navigation;
