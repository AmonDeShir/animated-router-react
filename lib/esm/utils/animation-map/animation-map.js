import mapFromTypeMap from '../map-from-typed-map/map-from-typed-map';
import isAnimation from '../is-animation/is-animation';
var animationMap = function (animation) {
    if (isAnimation(animation)) {
        return new Map([['default', animation]]);
    }
    return mapFromTypeMap(animation);
};
export default animationMap;
