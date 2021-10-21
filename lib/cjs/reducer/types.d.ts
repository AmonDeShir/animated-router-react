/// <reference types="react" />
export declare type TypedMap<Value> = {
    [k in string]: Value;
};
export declare type Animation = {
    animation: (ref: React.RefObject<HTMLElement>) => void;
    cleanup?: (ref: React.RefObject<HTMLElement>) => void;
    time: number;
    startWhenPrevious?: number;
};
export declare type Route = {
    path: string;
    component: JSX.Element;
    enterAnimation: Map<string, Animation>;
    exitAnimation: Map<string, Animation>;
    prepare: string[];
};
export declare type State = {
    routes: Map<string, Route>;
    selected: Route | null;
    selectPath: string;
    previousPath: string | null;
    argument: string;
};
