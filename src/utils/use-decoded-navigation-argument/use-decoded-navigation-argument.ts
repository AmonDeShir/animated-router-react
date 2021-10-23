import { useContext, useMemo } from 'react';

import { NavigationContext } from '../../reducer/context/navigation-context';

const useDecodedNavigationArgument = <T = any>() => {
  const { argument } = useContext(NavigationContext).state;

  const decodedArgument = useMemo(() => {
    if (!argument) {
      return undefined;
    }

    if (argument === 'undefined' || argument === 'null') {
      return undefined;
    }

    const decoded = decodeURI(argument);

    try {
      return JSON.parse(decoded) as T;
    } catch (e) {
      return decoded;
    }
  }, [argument]);

  return decodedArgument;
};

export default useDecodedNavigationArgument;
