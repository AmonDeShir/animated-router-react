import { TypedMap } from '../../reducer/types';
declare const mapFromTypedMap: <T>(typedMap: TypedMap<T> | undefined) => Map<string, T>;
export default mapFromTypedMap;
