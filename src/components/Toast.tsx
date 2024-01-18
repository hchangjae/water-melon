import { ToastContext } from '@/components/registry/ReactContextRegistry';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

const DURATION = 2500;

const Toast = () => {
  const [toast, setToast] = useContext(ToastContext);
  const [toastList, setToastList] = useState<{ content: string; key: string }[]>([]);

  useEffect(() => {
    if (!toast) return;

    const key = uuid();
    setToastList((prev) => [...prev, { content: toast, key }]);
    setToast('');

    const timeout = setTimeout(() => {
      setToastList((prev) => prev.filter((v) => v.key !== key));
    }, DURATION);

    return () => {
      if (!toast && timeout) clearTimeout(timeout);
    };
  }, [toast]);

  return (
    <Wrapper>
      {toastList.map((v, i) => (
        <ToastItem key={v.key}>{v.content}</ToastItem>
      ))}
    </Wrapper>
  );
};

export default Toast;

const Wrapper = styled.div`
  position: fixed;
  left: 50%;
  bottom: 10%;

  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  pointer-events: none;

  & > * + * {
    margin-top: 0.5rem;
  }
`;

const ToastItem = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  flex-shrink: 0;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;

  background-color: #fff;
  box-shadow: 0px 1px 5px 0 rgba(0, 0, 0, 0.1);

  font-size: 1rem;
  font-weight: 700;
  color: #444;
  text-align: center;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  pointer-events: none;

  transition: all 0.2s ease-in-out;
  opacity: 0;

  animation: fadein 0.2s ease-in-out forwards, fadeout 0.2s ease-in-out forwards 2.3s;
  @keyframes fadein {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(20%);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0%);
    }
  }
  @keyframes fadeout {
    from {
      opacity: 1;
      transform: translateX(-50%) translateY(0%);
    }
    to {
      opacity: 0;
      transform: translateX(-50%) translateY(20%);
    }
  }
`;
