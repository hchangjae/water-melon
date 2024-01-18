import { isClient } from '@/utils/deviceUtils';
import { useEffect, useRef } from 'react';

type Effect = (e: MouseEvent | TouchEvent) => void;

type Props = {
  onStart?: Effect;
  onMove?: Effect;
  onEnd?: Effect;
};

const useScrollEffect = (props: Props) => {
  const { onStart, onMove, onEnd } = props;
  const ref = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: MouseEvent) => {
    if (!ref.current) return;

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    onStart?.(e);
  };

  const onTouchDown = (e: TouchEvent) => {
    if (!ref.current) return;

    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchUp);

    onStart?.(e);
  };

  const onMouseMove = (e: MouseEvent) => {
    onMove?.(e);
  };

  const onTouchMove = (e: TouchEvent) => {
    onMove?.(e);
  };

  const onMouseUp = (e: MouseEvent) => {
    if (!ref.current) return;

    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);

    onEnd?.(e);
  };

  const onTouchUp = (e: TouchEvent) => {
    if (!ref.current) return;

    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchUp);

    onEnd?.(e);
  };

  useEffect(() => {
    if (!isClient) return;
    if (!ref.current) return;

    const { current } = ref;

    current.addEventListener('mousedown', onMouseDown);
    current.addEventListener('touchstart', onTouchDown);

    return () => {
      current.removeEventListener('mousedown', onMouseDown);
      current.removeEventListener('touchstart', onTouchDown);
    };
  }, []);

  return ref;
};

export default useScrollEffect;
