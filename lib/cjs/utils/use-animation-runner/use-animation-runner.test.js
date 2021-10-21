"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_hooks_1 = require("@testing-library/react-hooks");
var react_1 = __importDefault(require("react"));
var test_utils_1 = require("react-dom/test-utils");
var useTimeoutManager = __importStar(require("../use-timeout-manager/use-timeout-manager"));
var useAnimations = __importStar(require("../use-animations/use-animations"));
var usePaths = __importStar(require("../use-paths/use-paths"));
var use_animation_runner_1 = __importDefault(require("./use-animation-runner"));
var enterAnimation = jest.fn();
var exitAnimation = jest.fn();
var enterCleanup = jest.fn();
var exitCleanup = jest.fn();
var ref = react_1.default.createRef();
describe("utils/navigation/userAnimator", function () {
    beforeEach(function () {
        jest.spyOn(usePaths, 'default').mockReturnValue({
            previousPath: '',
            selectPath: '/selectPath',
        });
        jest.spyOn(useAnimations, 'default').mockReturnValue({
            enterAnimation: {
                animation: enterAnimation,
                cleanup: enterCleanup,
                time: 2,
            },
            exitAnimation: {
                animation: exitAnimation,
                cleanup: exitCleanup,
                time: 1,
            },
        });
        jest.spyOn(useTimeoutManager, 'default').mockReturnValue({
            set: (function (call) {
                call();
            }),
            clear: function () { },
            clearAll: function () { },
            length: function () { return 0; },
        });
        enterAnimation.mockClear();
        exitAnimation.mockClear();
        enterCleanup.mockClear();
        exitCleanup.mockClear();
    });
    describe("enterAnimation", function () {
        it("should be called if component is hidden and path is equal to selectedPath", function () {
            (0, react_hooks_1.renderHook)(function () { return (0, use_animation_runner_1.default)('/selectPath', ref); });
            expect(enterAnimation).toBeCalledTimes(1);
        });
        it("shouldn't be called if component is hidden and path isn't equal to selectedPath", function () {
            var result = (0, react_hooks_1.renderHook)(function () {
                return (0, use_animation_runner_1.default)('/notSelectPath', ref);
            }).result;
            expect(enterAnimation).toBeCalledTimes(0);
            expect(result.current.hidden).toEqual(true);
        });
        it("shouldn't be called if component is hidden and path is equal to selectedPath but enterAnimation is undefined", function () {
            jest.spyOn(useAnimations, 'default').mockReturnValue({
                enterAnimation: undefined,
                exitAnimation: undefined,
            });
            var result = (0, react_hooks_1.renderHook)(function () {
                return (0, use_animation_runner_1.default)('/selectPath', ref);
            }).result;
            expect(enterAnimation).toBeCalledTimes(0);
            expect(result.current.hidden).toEqual(false);
        });
        it("shouldn't be called if component isn't hidden", function () {
            var path = '/selectPath';
            var _a = (0, react_hooks_1.renderHook)(function () {
                return (0, use_animation_runner_1.default)(path, ref);
            }), result = _a.result, rerender = _a.rerender;
            (0, test_utils_1.act)(function () {
                path = '/selectPath';
            });
            rerender();
            expect(enterAnimation).toBeCalledTimes(1);
            expect(result.current.hidden).toEqual(false);
        });
    });
    describe("enterAnimation cleanup", function () {
        it("should be called if component is hidden and path is equal to selectedPath", function () {
            (0, react_hooks_1.renderHook)(function () { return (0, use_animation_runner_1.default)('/selectPath', ref); });
            expect(enterCleanup).toBeCalledTimes(1);
        });
        it("shouldn't be called if component is hidden and path isn't equal to selectedPath", function () {
            var result = (0, react_hooks_1.renderHook)(function () {
                return (0, use_animation_runner_1.default)('/notSelectPath', ref);
            }).result;
            expect(enterCleanup).toBeCalledTimes(0);
            expect(result.current.hidden).toEqual(true);
        });
        it("shouldn't be called if component is hidden and path is equal to selectedPath but enterAnimation is undefined", function () {
            jest.spyOn(useAnimations, 'default').mockReturnValue({
                enterAnimation: undefined,
                exitAnimation: undefined,
            });
            var result = (0, react_hooks_1.renderHook)(function () {
                return (0, use_animation_runner_1.default)('/selectPath', ref);
            }).result;
            expect(enterCleanup).toBeCalledTimes(0);
            expect(result.current.hidden).toEqual(false);
        });
        it("shouldn't be called if component is hidden and path is equal to selectedPath but enterCleanup is undefined", function () {
            jest.spyOn(useAnimations, 'default').mockReturnValue({
                enterAnimation: { animation: function () { }, time: 0, cleanup: undefined },
                exitAnimation: undefined,
            });
            var result = (0, react_hooks_1.renderHook)(function () {
                return (0, use_animation_runner_1.default)('/selectPath', ref);
            }).result;
            expect(enterCleanup).toBeCalledTimes(0);
            expect(result.current.hidden).toEqual(false);
        });
        it("shouldn't be called if component isn't hidden", function () {
            var path = '/selectPath';
            var _a = (0, react_hooks_1.renderHook)(function () {
                return (0, use_animation_runner_1.default)(path, ref);
            }), result = _a.result, rerender = _a.rerender;
            (0, test_utils_1.act)(function () {
                path = '/selectPath';
            });
            rerender();
            expect(enterCleanup).toBeCalledTimes(1);
            expect(result.current.hidden).toEqual(false);
        });
    });
    describe("exitAnimation", function () {
        it("should be called if component is showed and path is other than selectedPath", function () {
            var path = '/selectPath';
            var rerender = (0, react_hooks_1.renderHook)(function () { return (0, use_animation_runner_1.default)(path, ref); }).rerender;
            (0, test_utils_1.act)(function () {
                path = '/';
            });
            rerender();
            expect(exitAnimation).toBeCalledTimes(1);
        });
        it("shouldn't be called if component is showed and path is equal to selectedPath", function () {
            var path = '/selectPath';
            var _a = (0, react_hooks_1.renderHook)(function () {
                return (0, use_animation_runner_1.default)(path, ref);
            }), result = _a.result, rerender = _a.rerender;
            (0, test_utils_1.act)(function () {
                path = '/selectPath';
            });
            rerender();
            expect(exitAnimation).toBeCalledTimes(0);
            expect(result.current.hidden).toEqual(false);
        });
        it("shouldn't be called if component is showed and path is other than selectedPath but exitAnimation is undefined", function () {
            jest.spyOn(useAnimations, 'default').mockReturnValue({
                enterAnimation: undefined,
                exitAnimation: undefined,
            });
            var path = '/selectPath';
            var _a = (0, react_hooks_1.renderHook)(function () {
                return (0, use_animation_runner_1.default)(path, ref);
            }), result = _a.result, rerender = _a.rerender;
            (0, test_utils_1.act)(function () {
                path = '/';
            });
            rerender();
            expect(exitAnimation).toBeCalledTimes(0);
            expect(result.current.hidden).toEqual(true);
        });
        it("shouldn't be called if component is hidden", function () {
            var result = (0, react_hooks_1.renderHook)(function () { return (0, use_animation_runner_1.default)('/', ref); }).result;
            expect(enterCleanup).toBeCalledTimes(0);
            expect(result.current.hidden).toEqual(true);
        });
    });
    describe("exitAnimation cleanup", function () {
        it("should be called if component is showed and path is other than selectedPath", function () {
            var path = '/selectPath';
            var rerender = (0, react_hooks_1.renderHook)(function () { return (0, use_animation_runner_1.default)(path, ref); }).rerender;
            (0, test_utils_1.act)(function () {
                path = '/';
            });
            rerender();
            expect(exitCleanup).toBeCalledTimes(1);
        });
        it("shouldn't be called if component is showed and path is equal to selectedPath", function () {
            var path = '/selectPath';
            var _a = (0, react_hooks_1.renderHook)(function () {
                return (0, use_animation_runner_1.default)(path, ref);
            }), result = _a.result, rerender = _a.rerender;
            (0, test_utils_1.act)(function () {
                path = '/selectPath';
            });
            rerender();
            expect(exitCleanup).toBeCalledTimes(0);
            expect(result.current.hidden).toEqual(false);
        });
        it("shouldn't be called if component is showed and path is other than selectedPath but exitAnimation is undefined", function () {
            jest.spyOn(useAnimations, 'default').mockReturnValue({
                enterAnimation: undefined,
                exitAnimation: undefined,
            });
            var path = '/selectPath';
            var _a = (0, react_hooks_1.renderHook)(function () {
                return (0, use_animation_runner_1.default)(path, ref);
            }), result = _a.result, rerender = _a.rerender;
            (0, test_utils_1.act)(function () {
                path = '/';
            });
            rerender();
            expect(exitCleanup).toBeCalledTimes(0);
            expect(result.current.hidden).toEqual(true);
        });
        it("shouldn't be called if component is showed and path is other than selectedPath but exitCleanup is undefined", function () {
            jest.spyOn(useAnimations, 'default').mockReturnValue({
                enterAnimation: { animation: function () { }, time: 0, cleanup: undefined },
                exitAnimation: undefined,
            });
            var path = '/selectPath';
            var _a = (0, react_hooks_1.renderHook)(function () {
                return (0, use_animation_runner_1.default)(path, ref);
            }), result = _a.result, rerender = _a.rerender;
            (0, test_utils_1.act)(function () {
                path = '/';
            });
            rerender();
            expect(exitCleanup).toBeCalledTimes(0);
            expect(result.current.hidden).toEqual(true);
        });
    });
    describe("if animation are undefined", function () {
        beforeEach(function () {
            jest.spyOn(useAnimations, 'default').mockReturnValue({
                enterAnimation: undefined,
                exitAnimation: undefined,
            });
        });
        it("should hide component if component is showed and path is other than selectedPath", function () {
            var path = '/selectPath';
            var _a = (0, react_hooks_1.renderHook)(function () {
                return (0, use_animation_runner_1.default)(path, ref);
            }), result = _a.result, rerender = _a.rerender;
            (0, test_utils_1.act)(function () {
                path = '/';
            });
            rerender();
            expect(result.current.hidden).toEqual(true);
        });
        it("should show component if component is hidden and path is equal to selectedPath", function () {
            var path = '/';
            var _a = (0, react_hooks_1.renderHook)(function () {
                return (0, use_animation_runner_1.default)(path, ref);
            }), result = _a.result, rerender = _a.rerender;
            (0, test_utils_1.act)(function () {
                path = '/selectPath';
            });
            rerender();
            expect(result.current.hidden).toEqual(false);
        });
        it("shouldn't hide component if component is hidden and path is other than selectedPath", function () {
            var path = '/';
            var _a = (0, react_hooks_1.renderHook)(function () {
                return (0, use_animation_runner_1.default)(path, ref);
            }), result = _a.result, rerender = _a.rerender;
            (0, test_utils_1.act)(function () {
                path = '/';
            });
            rerender();
            expect(result.current.hidden).toEqual(true);
        });
        it("shouldn't show component if component is showed and path is equal to selectedPath", function () {
            var path = '/selectPath';
            var _a = (0, react_hooks_1.renderHook)(function () {
                return (0, use_animation_runner_1.default)(path, ref);
            }), result = _a.result, rerender = _a.rerender;
            (0, test_utils_1.act)(function () {
                path = '/selectPath';
            });
            rerender();
            expect(result.current.hidden).toEqual(false);
        });
    });
});
