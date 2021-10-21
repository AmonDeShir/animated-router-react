import { useEffect, useState } from 'react';

const useTimeoutManager = (multipleTime = 1) => {
  const [timeouts, setTimeouts] = useState<number[]>([]);

  useEffect(
    () => () => {
      timeouts.forEach(window.clearTimeout);
      setTimeouts([]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    set: (callback: () => void, time: number = 0) => {
      const timeout = window.setTimeout(callback, time * multipleTime);
      timeouts.push(timeout);

      return timeout;
    },

    clear: (timeout: number) => {
      window.clearTimeout(timeout);
      setTimeouts(timeouts.filter((id) => id !== timeout));
    },

    clearAll: () => {
      timeouts.forEach(window.clearTimeout);
      setTimeouts([]);
    },

    length: () => timeouts.length,
  };
};

export default useTimeoutManager;
