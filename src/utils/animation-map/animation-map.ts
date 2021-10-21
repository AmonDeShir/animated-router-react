import { Animation, TypedMap } from '../../reducer/types';
import mapFromTypeMap from '../map-from-typed-map/map-from-typed-map';
import isAnimation from '../is-animation/is-animation';

const animationMap = (
  animation: Animation | TypedMap<Animation> | undefined,
) => {
  if (isAnimation(animation)) {
    return new Map([['default', animation]]);
  }
  return mapFromTypeMap(animation);
};

export default animationMap;
