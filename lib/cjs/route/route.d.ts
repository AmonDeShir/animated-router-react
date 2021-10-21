/// <reference types="react" />
import { Animation, TypedMap } from '../reducer/types';
declare type Props = {
    path: string;
    component: JSX.Element;
    enterAnimation?: TypedMap<Animation> | Animation;
    exitAnimation?: TypedMap<Animation> | Animation;
    prepare?: string[];
};
declare const Route: ({ path, component, enterAnimation, exitAnimation, prepare, }: Props) => JSX.Element;
export default Route;
