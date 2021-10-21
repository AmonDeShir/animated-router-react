declare const useTimeoutManager: (multipleTime?: number) => {
    set: (callback: () => void, time?: number) => number;
    clear: (timeout: number) => void;
    clearAll: () => void;
    length: () => number;
};
export default useTimeoutManager;
