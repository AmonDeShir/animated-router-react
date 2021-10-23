"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var react_2 = require("react");
var link_1 = __importDefault(require("./link/link"));
var navigation_1 = __importDefault(require("./navigation"));
var navigation_context_1 = require("./reducer/context/navigation-context");
var route_1 = __importDefault(require("./route/route"));
describe("navigation component test", function () {
    beforeEach(function () {
        delete window.location;
        window.location = new URL('http://localhost/');
    });
    it("should render component with default route", function () {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(navigation_1.default, { children: (0, jsx_runtime_1.jsx)(route_1.default, { path: "/", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "TEST" }, void 0) }, void 0) }, void 0));
        expect(react_1.screen.queryByText('TEST')).toBeTruthy();
    });
    it("should render component and select route selected by window.location", function () {
        window.location = new URL('http://localhost/test2');
        (0, react_1.render)((0, jsx_runtime_1.jsxs)(navigation_1.default, { children: [(0, jsx_runtime_1.jsx)(route_1.default, { path: "/", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "default" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(route_1.default, { path: "/test2", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "test 2" }, void 0) }, void 0)] }, void 0));
        expect(react_1.screen.queryByText('test 2')).toBeTruthy();
    });
    it("should render component and select route selected by window.location with argument", function () {
        window.location = new URL('http://localhost/test2/test-argument');
        var argument = '';
        var TestPage = (0, react_2.forwardRef)(function () {
            argument = (0, react_2.useContext)(navigation_context_1.NavigationContext).state.argument;
            return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "test 2" }, void 0);
        });
        (0, react_1.render)((0, jsx_runtime_1.jsxs)(navigation_1.default, { children: [(0, jsx_runtime_1.jsx)(route_1.default, { path: "/", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "default" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(route_1.default, { path: "/test2", component: (0, jsx_runtime_1.jsx)(TestPage, {}, void 0) }, void 0)] }, void 0));
        expect(react_1.screen.queryByText('test 2')).toBeTruthy();
        expect(argument).toEqual('test-argument');
    });
    it("should throw error if second route with the same name was added", function () {
        expect(function () {
            (0, react_1.render)((0, jsx_runtime_1.jsxs)(navigation_1.default, { children: [(0, jsx_runtime_1.jsx)(route_1.default, { path: "/", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "TEST" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(route_1.default, { path: "/", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "TEST" }, void 0) }, void 0)] }, void 0));
        }).toThrowError("Another route with that path has been already added!");
    });
    it("should throw error if route with incorrect for was added", function () {
        expect(function () {
            (0, react_1.render)((0, jsx_runtime_1.jsx)(navigation_1.default, { children: (0, jsx_runtime_1.jsx)(route_1.default, { path: "", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "TEST" }, void 0) }, void 0) }, void 0));
        }).toThrowError("Incorrect path format!");
        expect(function () {
            (0, react_1.render)((0, jsx_runtime_1.jsx)(navigation_1.default, { children: (0, jsx_runtime_1.jsx)(route_1.default, { path: "", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "TEST" }, void 0) }, void 0) }, void 0));
        }).toThrowError("Incorrect path format!");
        expect(function () {
            (0, react_1.render)((0, jsx_runtime_1.jsx)(navigation_1.default, { children: (0, jsx_runtime_1.jsx)(route_1.default, { path: "/asd/asd", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "TEST" }, void 0) }, void 0) }, void 0));
        }).toThrowError("Incorrect path format!");
        expect(function () {
            (0, react_1.render)((0, jsx_runtime_1.jsx)(navigation_1.default, { children: (0, jsx_runtime_1.jsx)(route_1.default, { path: "asd/asd", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "TEST" }, void 0) }, void 0) }, void 0));
        }).toThrowError("Incorrect path format!");
    });
    it("should change component after link click", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsxs)(navigation_1.default, { children: [(0, jsx_runtime_1.jsx)(route_1.default, { path: "/", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "default" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(route_1.default, { path: "/test", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "test" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(link_1.default, __assign({ to: "/test" }, { children: "link to test" }), void 0)] }, void 0));
                    _b = (_a = react_1.fireEvent).click;
                    return [4, react_1.screen.findByText('link to test')];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    expect(react_1.screen.queryByText('test')).toBeTruthy();
                    return [2];
            }
        });
    }); });
    it("should change component to default 404 component after link click if component with that link path doesn't exist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsxs)(navigation_1.default, { children: [(0, jsx_runtime_1.jsx)(route_1.default, { path: "/", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "default" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(route_1.default, { path: "/test", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "test" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(link_1.default, __assign({ to: "/notExist" }, { children: "link to notExist" }), void 0)] }, void 0));
                    _b = (_a = react_1.fireEvent).click;
                    return [4, react_1.screen.findByText('link to notExist')];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    expect(react_1.screen.queryByText("Page doesn't exist")).toBeTruthy();
                    return [2];
            }
        });
    }); });
    it("should change component to specify 404 component after link click if component with that link path doesn't exist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    (0, react_1.render)((0, jsx_runtime_1.jsxs)(navigation_1.default, { children: [(0, jsx_runtime_1.jsx)(route_1.default, { path: "/", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "default" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(route_1.default, { path: "/404", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Error 404 page doesn&apost exist" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(route_1.default, { path: "/test", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "test" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(link_1.default, __assign({ to: "/notExist" }, { children: "link to notExist" }), void 0)] }, void 0));
                    _b = (_a = react_1.fireEvent).click;
                    return [4, react_1.screen.findByText('link to notExist')];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    expect(react_1.screen.queryByText("Error 404 page doesn&apost exist")).toBeTruthy();
                    return [2];
            }
        });
    }); });
    it("should play exit animation after change route", function () { return __awaiter(void 0, void 0, void 0, function () {
        var testPromise, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    testPromise = new Promise(function (resolve) {
                        (0, react_1.render)((0, jsx_runtime_1.jsxs)(navigation_1.default, { children: [(0, jsx_runtime_1.jsx)(route_1.default, { path: "/", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "default" }, void 0), exitAnimation: {
                                        animation: function () {
                                            expect(true).toBe(true);
                                        },
                                        time: 0.001,
                                    } }, void 0), (0, jsx_runtime_1.jsx)(route_1.default, { path: "/test", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "test" }, void 0), enterAnimation: {
                                        animation: function () { },
                                        cleanup: function () { return resolve(); },
                                        time: 0.001,
                                    } }, void 0), (0, jsx_runtime_1.jsx)(link_1.default, __assign({ to: "/test" }, { children: "link to test" }), void 0)] }, void 0));
                    });
                    _b = (_a = react_1.fireEvent).click;
                    return [4, react_1.screen.findByText('link to test')];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [4, (0, react_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2, testPromise];
                        }); }); })];
                case 2:
                    _c.sent();
                    return [2];
            }
        });
    }); });
    it("should play enter animation after change route", function () { return __awaiter(void 0, void 0, void 0, function () {
        var testPromise, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    testPromise = new Promise(function (resolve) {
                        (0, react_1.render)((0, jsx_runtime_1.jsxs)(navigation_1.default, { children: [(0, jsx_runtime_1.jsx)(route_1.default, { path: "/", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "default" }, void 0), exitAnimation: {
                                        animation: function () { },
                                        time: 0.001,
                                    } }, void 0), (0, jsx_runtime_1.jsx)(route_1.default, { path: "/test", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "test" }, void 0), enterAnimation: {
                                        animation: function () {
                                            expect(true).toBe(true);
                                        },
                                        cleanup: function () { return resolve(); },
                                        time: 0.001,
                                    } }, void 0), (0, jsx_runtime_1.jsx)(link_1.default, __assign({ to: "/test" }, { children: "link to test" }), void 0)] }, void 0));
                    });
                    _b = (_a = react_1.fireEvent).click;
                    return [4, react_1.screen.findByText('link to test')];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [4, (0, react_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2, testPromise];
                        }); }); })];
                case 2:
                    _c.sent();
                    return [2];
            }
        });
    }); });
    it("should play specific to route exit animation after change route", function () { return __awaiter(void 0, void 0, void 0, function () {
        var testPromise, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    window.location = new URL('http://localhost/test1');
                    testPromise = new Promise(function (resolve) {
                        (0, react_1.render)((0, jsx_runtime_1.jsxs)(navigation_1.default, { children: [(0, jsx_runtime_1.jsx)(route_1.default, { path: "/", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "default" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(route_1.default, { path: "/test1", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "test 1" }, void 0), exitAnimation: {
                                        default: {
                                            animation: function () {
                                                expect(false).toBe(true);
                                            },
                                            time: 0.001,
                                        },
                                        '/test2': {
                                            animation: function () {
                                                expect(true).toBe(true);
                                            },
                                            time: 0.001,
                                        },
                                    } }, void 0), (0, jsx_runtime_1.jsx)(route_1.default, { path: "/test2", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "test 2" }, void 0), enterAnimation: {
                                        default: {
                                            animation: function () { },
                                            cleanup: function () { return resolve(); },
                                            time: 0.001,
                                        },
                                        '/test1': {
                                            animation: function () { },
                                            cleanup: function () { return resolve(); },
                                            time: 0.001,
                                        },
                                    } }, void 0), (0, jsx_runtime_1.jsx)(link_1.default, __assign({ to: "/test1" }, { children: "link to test 1" }), void 0), (0, jsx_runtime_1.jsx)(link_1.default, __assign({ to: "/test2" }, { children: "link to test 2" }), void 0)] }, void 0));
                    });
                    _b = (_a = react_1.fireEvent).click;
                    return [4, react_1.screen.findByText('link to test 2')];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [4, (0, react_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2, testPromise];
                        }); }); })];
                case 2:
                    _c.sent();
                    return [2];
            }
        });
    }); });
    it("should play specific to route enter animation after change route", function () { return __awaiter(void 0, void 0, void 0, function () {
        var testPromise, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    window.location = new URL('http://localhost/test1');
                    testPromise = new Promise(function (resolve) {
                        (0, react_1.render)((0, jsx_runtime_1.jsxs)(navigation_1.default, { children: [(0, jsx_runtime_1.jsx)(route_1.default, { path: "/", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "default" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(route_1.default, { path: "/test1", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "test 1" }, void 0), exitAnimation: {
                                        default: {
                                            animation: function () { },
                                            time: 0.001,
                                        },
                                        '/test2': {
                                            animation: function () { },
                                            time: 0.001,
                                        },
                                    } }, void 0), (0, jsx_runtime_1.jsx)(route_1.default, { path: "/test2", component: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "test 2" }, void 0), enterAnimation: {
                                        default: {
                                            animation: function () {
                                                expect(false).toBe(true);
                                            },
                                            cleanup: function () { return resolve(); },
                                            time: 0.001,
                                        },
                                        '/test1': {
                                            animation: function () {
                                                expect(true).toBe(true);
                                            },
                                            cleanup: function () { return resolve(); },
                                            time: 0.001,
                                        },
                                    } }, void 0), (0, jsx_runtime_1.jsx)(link_1.default, __assign({ to: "/test1" }, { children: "link to test 1" }), void 0), (0, jsx_runtime_1.jsx)(link_1.default, __assign({ to: "/test2" }, { children: "link to test 2" }), void 0)] }, void 0));
                    });
                    _b = (_a = react_1.fireEvent).click;
                    return [4, react_1.screen.findByText('link to test 2')];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [4, (0, react_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2, testPromise];
                        }); }); })];
                case 2:
                    _c.sent();
                    return [2];
            }
        });
    }); });
});