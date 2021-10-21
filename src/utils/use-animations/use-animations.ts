import { useMemo } from 'react';

import { Animation } from '../../reducer/types';
import usePaths from '../use-paths/use-paths';
import useRoute from '../use-route/use-route';

const getAnimation = (path: string, map: Map<string, Animation> | undefined) =>
  map?.get(path) || map?.get('default');

const useAnimations = (path: string) => {
  const { previousPath, selectPath } = usePaths();
  const route = useRoute(path);

  return useMemo(
    () => ({
      enterAnimation: getAnimation(previousPath, route?.enterAnimation),
      exitAnimation: getAnimation(selectPath, route?.exitAnimation),
    }),
    [previousPath, route?.enterAnimation, route?.exitAnimation, selectPath],
  );
};

export default useAnimations;
