import { Dispatch, SetStateAction, createContext, useState } from 'react';

type Setter<T> = Dispatch<SetStateAction<T>>;
export type Context<T> = [T, Setter<T>];

/**
 * Toast Context
 */
export const ToastContext = createContext<Context<string>>(['', () => '']);

const ToastContextRegistry = ({ children }: { children: React.ReactNode }) => {
  const [toastState, setToastState] = useState<string>('');

  return <ToastContext.Provider value={[toastState, setToastState]}>{children}</ToastContext.Provider>;
};

/**
 * Layout Context
 */
// export const LayoutContext = createContext<Context<LayoutContextState>>([{ tab: Tab.GAME }, () => ({})]);

// const LayoutContextRegistry = ({ children }: { children: React.ReactNode }) => {
//   const [layoutState, setLayoutState] = useState<LayoutContextState>({ tab: Tab.GAME });

//   return <LayoutContext.Provider value={[layoutState, setLayoutState]}>{children}</LayoutContext.Provider>;
// };

/**
 * React Context
 */
const ReactContextRegistry = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToastContextRegistry>
      {/* Comment 4 lint */}
      {children}
    </ToastContextRegistry>
  );
};

export default ReactContextRegistry;
