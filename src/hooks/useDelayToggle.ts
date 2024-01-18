import { useCallback, useEffect, useRef, useState } from 'react';

const useDelayToggle = (delay: number) => {
  const [on, setOn] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const raf = useRef<number | null>(null);

  const doOn = () => setOn(true);

  const doOff = () => setOn(false);

  const trigger = useCallback(() => {
    doOn();

    return new Promise((resolve) => {
      const doOffWithResolve = () => {
        doOff();
        resolve(null);
      };
      if (timeout.current) {
        doOffWithResolve();
        clearTimeout(timeout.current);
        timeout.current = null;
        raf.current = requestAnimationFrame(trigger);
        return;
      }

      timeout.current = setTimeout(doOffWithResolve, delay);
    });
  }, [delay]);

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return [on, trigger] as const;
};

export default useDelayToggle;
