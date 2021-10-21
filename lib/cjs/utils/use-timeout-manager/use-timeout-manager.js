"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useTimeoutManager = function (multipleTime) {
    if (multipleTime === void 0) { multipleTime = 1; }
    var _a = __read((0, react_1.useState)([]), 2), timeouts = _a[0], setTimeouts = _a[1];
    (0, react_1.useEffect)(function () { return function () {
        timeouts.forEach(window.clearTimeout);
        setTimeouts([]);
    }; }, []);
    return {
        set: function (callback, time) {
            if (time === void 0) { time = 0; }
            var timeout = window.setTimeout(callback, time * multipleTime);
            timeouts.push(timeout);
            return timeout;
        },
        clear: function (timeout) {
            window.clearTimeout(timeout);
            setTimeouts(timeouts.filter(function (id) { return id !== timeout; }));
        },
        clearAll: function () {
            timeouts.forEach(window.clearTimeout);
            setTimeouts([]);
        },
        length: function () { return timeouts.length; },
    };
};
exports.default = useTimeoutManager;
