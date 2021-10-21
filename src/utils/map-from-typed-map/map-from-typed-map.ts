/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { TypedMap } from '../../reducer/types';

const mapFromTypedMap = <T>(typedMap: TypedMap<T> | undefined) => {
  const map = new Map<string, T>();

  for (const key in typedMap) {
    map.set(key, typedMap[key]);
  }

  return map;
};

export default mapFromTypedMap;
