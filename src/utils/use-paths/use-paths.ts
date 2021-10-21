import { useContext, useMemo } from 'react';

import { NavigationContext } from '../../reducer/context/navigation-context';

const usePaths = () => {
  const { selectPath, previousPath } = useContext(NavigationContext).state;

  return useMemo(
    () => ({
      selectPath: selectPath || window.location.pathname,
      previousPath: previousPath || window.location.pathname,
    }),
    [previousPath, selectPath],
  );
};

export default usePaths;
