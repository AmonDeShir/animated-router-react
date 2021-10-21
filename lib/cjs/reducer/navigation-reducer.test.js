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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var navigation_reducer_1 = __importDefault(require("./navigation-reducer"));
describe('navigation reducer test', function () {
    var initialState = {
        routes: new Map(),
        selected: null,
        previousPath: null,
        selectPath: '/',
        argument: '',
    };
    var route = {
        path: '/test',
        component: react_1.default.createElement('div'),
        enterAnimation: new Map([['default', { animation: function () { }, time: 0.1 }]]),
        exitAnimation: new Map([['default', { animation: function () { }, time: 0.1 }]]),
        prepare: [],
    };
    it("shouldn't change state if action.type is incorrect", function () {
        var result = (0, navigation_reducer_1.default)(initialState, {
            type: 'INCORRECT',
            payload: {},
        });
        expect(result).toEqual(initialState);
    });
    it('should add new route to state', function () {
        var result = (0, navigation_reducer_1.default)(initialState, {
            type: 'ADD',
            payload: route,
        });
        expect(result.routes.get('/test')).toEqual(route);
        expect(result.selected).toBeNull();
        expect(result.selectPath).toBe('/');
        expect(result.argument).toBe('');
    });
    it('should add default route to state', function () {
        var defaultRoute = __assign(__assign({}, route), { path: '/' });
        var result = (0, navigation_reducer_1.default)(initialState, {
            type: 'ADD',
            payload: defaultRoute,
        });
        expect(result.routes.get('/')).toEqual(defaultRoute);
        expect(result.selected).toEqual(defaultRoute);
        expect(result.selectPath).toBe('/');
        expect(result.argument).toBe('');
    });
    it('should throw error if second route with the same name was added', function () {
        var state = (0, navigation_reducer_1.default)(initialState, {
            type: 'ADD',
            payload: route,
        });
        expect(function () {
            (0, navigation_reducer_1.default)(state, {
                type: 'ADD',
                payload: route,
            });
        }).toThrowError("Another route with that path has been already added!");
    });
    it('should throw error if route with incorrect for was added', function () {
        expect(function () {
            (0, navigation_reducer_1.default)(initialState, {
                type: 'ADD',
                payload: __assign(__assign({}, route), { path: '' }),
            });
        }).toThrowError("Incorrect path format!");
        expect(function () {
            (0, navigation_reducer_1.default)(initialState, {
                type: 'ADD',
                payload: __assign(__assign({}, route), { path: '//' }),
            });
        }).toThrowError("Incorrect path format!");
        expect(function () {
            (0, navigation_reducer_1.default)(initialState, {
                type: 'ADD',
                payload: __assign(__assign({}, route), { path: 'pathWithoutSlash' }),
            });
        }).toThrowError("Incorrect path format!");
        expect(function () {
            (0, navigation_reducer_1.default)(initialState, {
                type: 'ADD',
                payload: __assign(__assign({}, route), { path: '/pathWithDoubleSlash/' }),
            });
        }).toThrowError("Incorrect path format!");
    });
    it('should select route', function () {
        var result = (0, navigation_reducer_1.default)(__assign(__assign({}, initialState), { routes: new Map([['/test', route]]) }), { type: 'SELECT', payload: '/test' });
        expect(result.selected).toEqual(route);
        expect(result.selectPath).toBe('/test');
        expect(result.previousPath).toBe('/');
    });
    it('should select null if route to select not exist', function () {
        var result = (0, navigation_reducer_1.default)(__assign(__assign({}, initialState), { routes: new Map() }), { type: 'SELECT', payload: '/notExist' });
        expect(result.selected).toBeNull();
        expect(result.selectPath).toBe('/notExist');
        expect(result.previousPath).toBe('/');
    });
    it('should select route with argument', function () {
        var result = (0, navigation_reducer_1.default)(__assign(__assign({}, initialState), { routes: new Map([['/test', route]]) }), { type: 'SELECT', payload: '/test/2' });
        expect(result.selected).toEqual(route);
        expect(result.selectPath).toBe('/test');
        expect(result.previousPath).toBe('/');
        expect(result.argument).toBe('2');
    });
    it("should set previous path to selected path", function () {
        var result = (0, navigation_reducer_1.default)(__assign(__assign({}, initialState), { routes: new Map([['/test', route]]), selectPath: '/path' }), { type: 'SELECT', payload: '/test' });
        expect(result.previousPath).toBe('/path');
    });
    it("should set previous path to selected path with argument if selected path has argument", function () {
        var result = (0, navigation_reducer_1.default)(__assign(__assign({}, initialState), { routes: new Map([['/test', route]]), selectPath: '/path', argument: '2' }), { type: 'SELECT', payload: '/test' });
        expect(result.previousPath).toBe('/path/2');
    });
    it("should remove path", function () {
        var route2 = __assign(__assign({}, route), { path: '/2' });
        var result = (0, navigation_reducer_1.default)(__assign(__assign({}, initialState), { routes: new Map([
                ['/test', route],
                ['/2', route2],
            ]), selectPath: '/test', argument: '' }), { type: 'REMOVE', payload: '/2' });
        expect(result.routes).toEqual(new Map([['/test', route]]));
    });
    it("should set selected to null if selected path was removed", function () {
        var route2 = __assign(__assign({}, route), { path: '/2' });
        var result = (0, navigation_reducer_1.default)(__assign(__assign({}, initialState), { routes: new Map([
                ['/test', route],
                ['/2', route2],
            ]), selectPath: '/test', argument: '' }), { type: 'REMOVE', payload: '/test' });
        expect(result.routes).toEqual(new Map([['/2', route2]]));
        expect(result.selectPath).toEqual('/test');
        expect(result.selected).toEqual(null);
    });
});
