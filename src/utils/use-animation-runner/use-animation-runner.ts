import React, { useEffect, useMemo, useState } from 'react';

import { Animation } from '../../reducer/types';
import useTimeoutManager from '../use-timeout-manager/use-timeout-manager';
import useAnimations from '../use-animations/use-animations';
import usePaths from '../use-paths/use-paths';

const useAnimationRunner = (
  path: string,
  ref: React.RefObject<HTMLElement>,
) => {
  const { selectPath } = usePaths();
  const { enterAnimation, exitAnimation } = useAnimations(path);
  const timeouts = useTimeoutManager(1000);
  const [hidden, setHidden] = useState(true);

  const status = useMemo(() => {
    if (!hidden && path !== selectPath) {
      return 'hide';
    }

    if (hidden && path === selectPath) {
      return 'show';
    }

    return 'none';
  }, [hidden, path, selectPath]);

  useEffect(() => {
    const cleanup = (animation: Animation) =>
      animation.cleanup && animation.cleanup(ref);

    if (status === 'show' && enterAnimation) {
      timeouts.set(() => {
        setHidden(false);
        enterAnimation.animation(ref);
      }, exitAnimation?.time);
      timeouts.set(() => cleanup(enterAnimation), enterAnimation.time);
    }

    if (status === 'hide' && exitAnimation) {
      exitAnimation.animation(ref);
      timeouts.set(() => {
        cleanup(exitAnimation);
        setHidden(true);
      }, exitAnimation.time);
    }

    if (status === 'show' && !enterAnimation) {
      setHidden(false);
    }

    if (status === 'hide' && !exitAnimation) {
      setHidden(true);
    }
  }, [enterAnimation, exitAnimation, ref, status, timeouts]);

  return { hidden };
};

export default useAnimationRunner;
