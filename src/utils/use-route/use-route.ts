import { useContext, useMemo } from 'react';

import { NavigationContext } from '../../reducer/context/navigation-context';

const useRoute = (path: string) => {
  const { routes } = useContext(NavigationContext).state;

  return useMemo(() => routes.get(path), [path, routes]);
};

export default useRoute;
