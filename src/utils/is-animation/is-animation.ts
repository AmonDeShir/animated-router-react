import { Animation } from '../../reducer/types';

const isAnimation = (object: any): object is Animation => {
  if (!object) {
    return false;
  }

  return (
    typeof object.time === 'number' && typeof object.animation === 'function'
  );
};

export default isAnimation;
