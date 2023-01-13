import { createContext, useState, useContext, type ReactNode } from 'react';

const initialState = { show: false, message: '', type: '' };

const ToastContext = createContext({
  toast: initialState,
  updateToast: (message: string, type: string) => {},
  setOpen: (open: boolean) => {},
});

let timerId: NodeJS.Timeout | null = null;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState(initialState);

  const updateToast = (message: string, type: string) => {
    setToast({ show: false, message, type });
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      setToast({ show: true, message, type });
    }, 100);
  };

  const setOpen = (open: boolean) =>
    setToast(toast => ({ ...toast, show: open }));

  return (
    <ToastContext.Provider value={{ toast, updateToast, setOpen }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
