import { renderHook, act } from '@testing-library/react-hooks';
import { useContext } from 'react';
import NavigationProvider, { NavigationContext } from './navigation-context';
describe("NavigationContext", function () {
    it("should return default state values if is outside of NavigationContext", function () {
        var result = renderHook(function () { return useContext(NavigationContext); }).result;
        expect(result.current.state).toEqual({
            routes: new Map(),
            selected: null,
            selectPath: '/',
            previousPath: null,
            argument: '',
        });
    });
    it("dispatch should throw error if it is used outside of NavigationProvider", function () {
        var result = renderHook(function () { return useContext(NavigationContext); }).result;
        expect(function () {
            return act(function () {
                result.current.dispatch({ type: 'REMOVE', payload: '/2' });
            });
        }).toThrowError('Dispatch cannot be use outside of NavigationProvider!');
    });
    it("dispatch shouldn't throw error if it is used in NavigationProvider", function () {
        var result = renderHook(function () { return useContext(NavigationContext); }, {
            wrapper: NavigationProvider,
        }).result;
        expect(function () {
            return act(function () {
                result.current.dispatch({ type: 'REMOVE', payload: '/2' });
            });
        }).not.toThrowError('Dispatch cannot be use outside of NavigationProvider!');
    });
    it("should return default state with modified previousPath values if is in NavigationContext", function () {
        var result = renderHook(function () { return useContext(NavigationContext); }, {
            wrapper: NavigationProvider,
        }).result;
        expect(result.current.state).toEqual({
            routes: new Map(),
            selected: null,
            selectPath: '/',
            previousPath: null,
            argument: '',
        });
    });
});
