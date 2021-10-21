var mapFromTypedMap = function (typedMap) {
    var map = new Map();
    for (var key in typedMap) {
        map.set(key, typedMap[key]);
    }
    return map;
};
export default mapFromTypedMap;
