import useDelayToggle from '@/hooks/useDelayToggle';
import { useEffect, useState } from 'react';

const useDelayToggleClick = (delay: number) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const [on, trigger] = useDelayToggle(delay);

  useEffect(() => {
    if (!ref) return;

    ref.addEventListener('click', trigger);

    return () => {
      ref.removeEventListener('click', trigger);
    };
  }, [ref, trigger]);

  return [setRef, on] as const;
};

export default useDelayToggleClick;
