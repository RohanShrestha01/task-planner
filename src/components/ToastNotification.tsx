import * as Toast from '@radix-ui/react-toast';
import { useToast } from '../contexts/ToastContext';

export default function ToastNotification() {
  const { toast, setOpen } = useToast();

  return (
    <Toast.Provider>
      <Toast.Root
        open={toast.show}
        onOpenChange={setOpen}
        className={`py-4 px-8 rounded-md shadow-md ${
          toast.type === 'success'
            ? 'bg-green-100 text-green-800'
            : toast.type === 'warning'
            ? 'bg-red-100 text-red-800'
            : toast.type === 'info'
            ? 'bg-blue-100 text-blue-800'
            : ''
        } sm:py-3 sm:px-6 xs:text-center xs:px-0`}
        id="ToastRoot"
      >
        <Toast.Title className="font-medium">{toast.message}</Toast.Title>
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-0 right-0 p-10 z-[99999] lg:p-6 md:p-5 sm:p-4 xs:left-0" />
    </Toast.Provider>
  );
}
