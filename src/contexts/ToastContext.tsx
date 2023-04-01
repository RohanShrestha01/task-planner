import { createContext, useState, useContext } from 'react';

const initialState = {
  show: false,
  message: '',
  type: '' as 'success' | 'warning' | 'error' | 'info',
};

const ToastContext = createContext({
  toast: initialState,
  updateToast: (
    message: string,
    type: 'success' | 'warning' | 'error' | 'info'
  ) => {},
  setOpen: (open: boolean) => {},
});

let timerId: NodeJS.Timeout | null = null;

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState(initialState);

  const updateToast = (
    message: string,
    type: 'success' | 'warning' | 'error' | 'info'
  ) => {
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
