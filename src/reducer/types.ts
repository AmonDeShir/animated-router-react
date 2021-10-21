export type TypedMap<Value> = { [k in string]: Value };

export type Animation = {
  animation: (ref: React.RefObject<HTMLElement>) => void;

  /** function run when animation time left */
  cleanup?: (ref: React.RefObject<HTMLElement>) => void;

  /** animation time in seconds */
  time: number;

  /** animation delay. Start animation when previous animation reach given percent of progress. 100% by default */
  startWhenPrevious?: number;
};

export type Route = {
  path: string;
  component: JSX.Element;
  enterAnimation: Map<string, Animation>;
  exitAnimation: Map<string, Animation>;
  prepare: string[];
};

export type State = {
  routes: Map<string, Route>;
  selected: Route | null;
  selectPath: string;
  previousPath: string | null;
  argument: string;
};
