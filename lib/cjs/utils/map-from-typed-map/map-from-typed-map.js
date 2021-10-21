"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mapFromTypedMap = function (typedMap) {
    var map = new Map();
    for (var key in typedMap) {
        map.set(key, typedMap[key]);
    }
    return map;
};
exports.default = mapFromTypedMap;
