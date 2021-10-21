"use strict";
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
var react_hooks_1 = require("@testing-library/react-hooks");
var use_timeout_manager_1 = __importDefault(require("./use-timeout-manager"));
describe("use-timeout-manager", function () {
    var setTimeout = jest.spyOn(window, 'setTimeout');
    var clearTimeout = jest.spyOn(window, 'clearTimeout');
    var callback = function () { };
    beforeEach(function () {
        setTimeout.mockReturnValue(100);
        clearTimeout.mockImplementation(function () { });
    });
    describe("set", function () {
        it("should set new timeout", function () {
            var result = (0, react_hooks_1.renderHook)(function () { return (0, use_timeout_manager_1.default)(); }).result;
            result.current.set(callback, 100);
            expect(setTimeout).toBeCalledWith(callback, 100);
        });
        it("should increase manager length", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                result = (0, react_hooks_1.renderHook)(function () { return (0, use_timeout_manager_1.default)(); }).result;
                (0, react_hooks_1.act)(function () {
                    result.current.set(callback, 100);
                });
                expect(result.current.length()).toEqual(1);
                return [2];
            });
        }); });
        it("should set timeout time to zero if time is undefined", function () {
            var result = (0, react_hooks_1.renderHook)(function () { return (0, use_timeout_manager_1.default)(); }).result;
            result.current.set(callback);
            expect(setTimeout).toBeCalledWith(callback, 0);
        });
        it("should multiply time value by multipleTime from the hook constructor", function () {
            var result = (0, react_hooks_1.renderHook)(function () { return (0, use_timeout_manager_1.default)(1000); }).result;
            result.current.set(callback, 10);
            expect(setTimeout).toBeCalledWith(callback, 10000);
        });
        it("should return timeout id", function () {
            var result = (0, react_hooks_1.renderHook)(function () { return (0, use_timeout_manager_1.default)(); }).result;
            expect(result.current.set(callback, 10)).toEqual(100);
        });
    });
    describe("clear", function () {
        it("should call window.clearTimeout", function () {
            var result = (0, react_hooks_1.renderHook)(function () { return (0, use_timeout_manager_1.default)(); }).result;
            var id = 0;
            (0, react_hooks_1.act)(function () {
                result.current.set(callback, 10);
            });
            (0, react_hooks_1.act)(function () {
                id = result.current.set(callback, 20);
            });
            (0, react_hooks_1.act)(function () {
                result.current.clear(id);
            });
            expect(clearTimeout).toBeCalledWith(100);
        });
        it("should decrement length", function () {
            var result = (0, react_hooks_1.renderHook)(function () { return (0, use_timeout_manager_1.default)(); }).result;
            (0, react_hooks_1.act)(function () {
                result.current.set(callback, 10);
            });
            (0, react_hooks_1.act)(function () {
                result.current.clear(100);
            });
            expect(result.current.length()).toEqual(0);
        });
        it("shouldn't decrement length if deleted timeout isn't in manager", function () {
            var result = (0, react_hooks_1.renderHook)(function () { return (0, use_timeout_manager_1.default)(); }).result;
            (0, react_hooks_1.act)(function () {
                result.current.set(callback, 10);
            });
            (0, react_hooks_1.act)(function () {
                result.current.set(callback, 20);
            });
            (0, react_hooks_1.act)(function () {
                result.current.clear(350);
            });
            expect(result.current.length()).toEqual(2);
        });
    });
    describe("clearAll", function () {
        it("should clear all timeouts", function () {
            var result = (0, react_hooks_1.renderHook)(function () { return (0, use_timeout_manager_1.default)(); }).result;
            (0, react_hooks_1.act)(function () {
                result.current.set(callback, 10);
            });
            (0, react_hooks_1.act)(function () {
                result.current.set(callback, 20);
            });
            (0, react_hooks_1.act)(function () {
                result.current.clearAll();
            });
            expect(clearTimeout).toBeCalledTimes(2);
        });
        it("should set length to zero", function () {
            var result = (0, react_hooks_1.renderHook)(function () { return (0, use_timeout_manager_1.default)(); }).result;
            (0, react_hooks_1.act)(function () {
                result.current.set(callback, 10);
            });
            (0, react_hooks_1.act)(function () {
                result.current.set(callback, 20);
            });
            (0, react_hooks_1.act)(function () {
                result.current.clearAll();
            });
            expect(result.current.length()).toEqual(0);
        });
    });
});
