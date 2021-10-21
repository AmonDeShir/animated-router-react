import { Animation } from '../../reducer/types';
declare const useAnimations: (path: string) => {
    enterAnimation: Animation | undefined;
    exitAnimation: Animation | undefined;
};
export default useAnimations;
