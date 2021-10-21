import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { act } from 'react-dom/test-utils';
import * as useTimeoutManager from '../use-timeout-manager/use-timeout-manager';
import * as useAnimations from '../use-animations/use-animations';
import * as usePaths from '../use-paths/use-paths';
import useAnimationRunner from './use-animation-runner';
var enterAnimation = jest.fn();
var exitAnimation = jest.fn();
var enterCleanup = jest.fn();
var exitCleanup = jest.fn();
var ref = React.createRef();
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
            renderHook(function () { return useAnimationRunner('/selectPath', ref); });
            expect(enterAnimation).toBeCalledTimes(1);
        });
        it("shouldn't be called if component is hidden and path isn't equal to selectedPath", function () {
            var result = renderHook(function () {
                return useAnimationRunner('/notSelectPath', ref);
            }).result;
            expect(enterAnimation).toBeCalledTimes(0);
            expect(result.current.hidden).toEqual(true);
        });
        it("shouldn't be called if component is hidden and path is equal to selectedPath but enterAnimation is undefined", function () {
            jest.spyOn(useAnimations, 'default').mockReturnValue({
                enterAnimation: undefined,
                exitAnimation: undefined,
            });
            var result = renderHook(function () {
                return useAnimationRunner('/selectPath', ref);
            }).result;
            expect(enterAnimation).toBeCalledTimes(0);
            expect(result.current.hidden).toEqual(false);
        });
        it("shouldn't be called if component isn't hidden", function () {
            var path = '/selectPath';
            var _a = renderHook(function () {
                return useAnimationRunner(path, ref);
            }), result = _a.result, rerender = _a.rerender;
            act(function () {
                path = '/selectPath';
            });
            rerender();
            expect(enterAnimation).toBeCalledTimes(1);
            expect(result.current.hidden).toEqual(false);
        });
    });
    describe("enterAnimation cleanup", function () {
        it("should be called if component is hidden and path is equal to selectedPath", function () {
            renderHook(function () { return useAnimationRunner('/selectPath', ref); });
            expect(enterCleanup).toBeCalledTimes(1);
        });
        it("shouldn't be called if component is hidden and path isn't equal to selectedPath", function () {
            var result = renderHook(function () {
                return useAnimationRunner('/notSelectPath', ref);
            }).result;
            expect(enterCleanup).toBeCalledTimes(0);
            expect(result.current.hidden).toEqual(true);
        });
        it("shouldn't be called if component is hidden and path is equal to selectedPath but enterAnimation is undefined", function () {
            jest.spyOn(useAnimations, 'default').mockReturnValue({
                enterAnimation: undefined,
                exitAnimation: undefined,
            });
            var result = renderHook(function () {
                return useAnimationRunner('/selectPath', ref);
            }).result;
            expect(enterCleanup).toBeCalledTimes(0);
            expect(result.current.hidden).toEqual(false);
        });
        it("shouldn't be called if component is hidden and path is equal to selectedPath but enterCleanup is undefined", function () {
            jest.spyOn(useAnimations, 'default').mockReturnValue({
                enterAnimation: { animation: function () { }, time: 0, cleanup: undefined },
                exitAnimation: undefined,
            });
            var result = renderHook(function () {
                return useAnimationRunner('/selectPath', ref);
            }).result;
            expect(enterCleanup).toBeCalledTimes(0);
            expect(result.current.hidden).toEqual(false);
        });
        it("shouldn't be called if component isn't hidden", function () {
            var path = '/selectPath';
            var _a = renderHook(function () {
                return useAnimationRunner(path, ref);
            }), result = _a.result, rerender = _a.rerender;
            act(function () {
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
            var rerender = renderHook(function () { return useAnimationRunner(path, ref); }).rerender;
            act(function () {
                path = '/';
            });
            rerender();
            expect(exitAnimation).toBeCalledTimes(1);
        });
        it("shouldn't be called if component is showed and path is equal to selectedPath", function () {
            var path = '/selectPath';
            var _a = renderHook(function () {
                return useAnimationRunner(path, ref);
            }), result = _a.result, rerender = _a.rerender;
            act(function () {
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
            var _a = renderHook(function () {
                return useAnimationRunner(path, ref);
            }), result = _a.result, rerender = _a.rerender;
            act(function () {
                path = '/';
            });
            rerender();
            expect(exitAnimation).toBeCalledTimes(0);
            expect(result.current.hidden).toEqual(true);
        });
        it("shouldn't be called if component is hidden", function () {
            var result = renderHook(function () { return useAnimationRunner('/', ref); }).result;
            expect(enterCleanup).toBeCalledTimes(0);
            expect(result.current.hidden).toEqual(true);
        });
    });
    describe("exitAnimation cleanup", function () {
        it("should be called if component is showed and path is other than selectedPath", function () {
            var path = '/selectPath';
            var rerender = renderHook(function () { return useAnimationRunner(path, ref); }).rerender;
            act(function () {
                path = '/';
            });
            rerender();
            expect(exitCleanup).toBeCalledTimes(1);
        });
        it("shouldn't be called if component is showed and path is equal to selectedPath", function () {
            var path = '/selectPath';
            var _a = renderHook(function () {
                return useAnimationRunner(path, ref);
            }), result = _a.result, rerender = _a.rerender;
            act(function () {
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
            var _a = renderHook(function () {
                return useAnimationRunner(path, ref);
            }), result = _a.result, rerender = _a.rerender;
            act(function () {
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
            var _a = renderHook(function () {
                return useAnimationRunner(path, ref);
            }), result = _a.result, rerender = _a.rerender;
            act(function () {
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
            var _a = renderHook(function () {
                return useAnimationRunner(path, ref);
            }), result = _a.result, rerender = _a.rerender;
            act(function () {
                path = '/';
            });
            rerender();
            expect(result.current.hidden).toEqual(true);
        });
        it("should show component if component is hidden and path is equal to selectedPath", function () {
            var path = '/';
            var _a = renderHook(function () {
                return useAnimationRunner(path, ref);
            }), result = _a.result, rerender = _a.rerender;
            act(function () {
                path = '/selectPath';
            });
            rerender();
            expect(result.current.hidden).toEqual(false);
        });
        it("shouldn't hide component if component is hidden and path is other than selectedPath", function () {
            var path = '/';
            var _a = renderHook(function () {
                return useAnimationRunner(path, ref);
            }), result = _a.result, rerender = _a.rerender;
            act(function () {
                path = '/';
            });
            rerender();
            expect(result.current.hidden).toEqual(true);
        });
        it("shouldn't show component if component is showed and path is equal to selectedPath", function () {
            var path = '/selectPath';
            var _a = renderHook(function () {
                return useAnimationRunner(path, ref);
            }), result = _a.result, rerender = _a.rerender;
            act(function () {
                path = '/selectPath';
            });
            rerender();
            expect(result.current.hidden).toEqual(false);
        });
    });
});
