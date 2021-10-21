import React, { useContext, useEffect, useRef } from 'react';

import animationMap from '../utils/animation-map/animation-map';
import useAnimationRunner from '../utils/use-animation-runner/use-animation-runner';
import { NavigationContext } from '../reducer/context/navigation-context';
import { Animation, TypedMap } from '../reducer/types';

type Props = {
  path: string;
  component: JSX.Element;
  enterAnimation?: TypedMap<Animation> | Animation;
  exitAnimation?: TypedMap<Animation> | Animation;
  prepare?: string[];
};

const Route = ({
  path,
  component,
  enterAnimation,
  exitAnimation,
  prepare = [],
}: Props) => {
  const ref = useRef<HTMLElement>(null);
  const { hidden } = useAnimationRunner(path, ref);
  const { dispatch } = useContext(NavigationContext);

  useEffect(() => {
    dispatch({
      type: 'ADD',
      payload: {
        component,
        path,
        enterAnimation: animationMap(enterAnimation),
        exitAnimation: animationMap(exitAnimation),
        prepare,
      },
    });

    return () => dispatch({ type: 'REMOVE', payload: path });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{!hidden && React.cloneElement(component, { ref })}</>;
};

export default Route;
