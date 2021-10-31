import React, { useContext, useEffect, useRef } from 'react';

import animationMap from '../utils/animation-map/animation-map';
import useAnimationRunner from '../utils/use-animation-runner/use-animation-runner';
import useApplyDefaultState from '../utils/use-apply-default-state/use-apply-default-state';
import { NavigationContext } from '../reducer/context/navigation-context';
import { Animation, InitFunction, TypedMap } from '../reducer/types';

type Props = {
  path: string;
  component: JSX.Element;
  init?: InitFunction;
  enterAnimation?: TypedMap<Animation> | Animation;
  exitAnimation?: TypedMap<Animation> | Animation;
};

const Route = ({
  path,
  component,
  init,
  enterAnimation,
  exitAnimation,
}: Props) => {
  const ref = useRef<HTMLElement>(null);
  const { hidden } = useAnimationRunner(path, ref);
  const { dispatch } = useContext(NavigationContext);

  useApplyDefaultState(ref);

  useEffect(() => {
    dispatch({
      type: 'ADD',
      payload: {
        component,
        path,
        init,
        enterAnimation: animationMap(enterAnimation),
        exitAnimation: animationMap(exitAnimation),
      },
    });

    return () => dispatch({ type: 'REMOVE', payload: path });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{!hidden && React.cloneElement(component, { ref })}</>;
};

export default Route;
