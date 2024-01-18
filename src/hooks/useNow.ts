import { getValue } from '@/utils/funcUtils';
import { useEffect, useRef, useState } from 'react';

const useNow = () => {
  const [now, setNow] = useState(new Date());
  const did = useRef(false);
  const raf = useRef(0);

  useEffect(() => {
    const tick = async () => {
      const diff = Date.now() - (await getValue(setNow)).getTime();
      if (diff >= 1000 && !did.current) {
        setNow(new Date());
        did.current = true;
      } else {
        did.current = false;
      }

      raf.current = requestAnimationFrame(tick);
    };

    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf.current);
  }, []);

  return now;
};

export default useNow;
