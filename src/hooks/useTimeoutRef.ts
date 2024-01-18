import { useEffect, useRef } from 'react';

const useTimeoutRef = () => {
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  return timeout;
};

export default useTimeoutRef;
