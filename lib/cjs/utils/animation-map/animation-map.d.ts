import { Animation, TypedMap } from '../../reducer/types';
declare const animationMap: (animation: Animation | TypedMap<Animation> | undefined) => Map<string, Animation>;
export default animationMap;
