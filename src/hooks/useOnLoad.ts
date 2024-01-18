import { isClient } from '@/utils/deviceUtils';
import { useEffect } from 'react';

const useOnLoad = (callback: () => void, enable: boolean = true) => {
  useEffect(() => {
    if (!enable) return;
    if (!isClient) return;
    if (document.readyState === 'complete') return callback();

    window.addEventListener('load', callback);
    return () => window.removeEventListener('load', callback);
  }, [enable]);
};

export default useOnLoad;
