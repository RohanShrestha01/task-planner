import * as Toast from '@radix-ui/react-toast';

import { useToast } from '../contexts/ToastContext';
import {
  CheckCircleSvg,
  CrossSvg,
  ErrorSvg,
  InfoSvg,
  WarningSvg,
} from '../icons/AllSvgs';

export default function ToastNotification() {
  const { toast, setOpen } = useToast();
  const ToastSvg =
    toast.type === 'success'
      ? CheckCircleSvg
      : toast.type === 'warning'
      ? WarningSvg
      : toast.type === 'info'
      ? InfoSvg
      : ErrorSvg;

  return (
    <Toast.Provider>
      <Toast.Root
        duration={2000}
        open={toast.show}
        onOpenChange={setOpen}
        className={`flex items-center gap-3 rounded-md px-4 py-3 shadow-md ${
          toast.type === 'success'
            ? 'bg-green-100 text-green-800'
            : toast.type === 'warning'
            ? 'bg-orange-100 text-orange-800'
            : toast.type === 'info'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-red-100 text-red-800'
        } sm:py-3 sm:px-6 xs:justify-center xs:px-0`}
        id="ToastRoot"
      >
        <ToastSvg className="h-6" />
        <Toast.Title className="text-[15px] font-medium">
          {toast.message}
        </Toast.Title>
        <Toast.Close>
          <CrossSvg className="h-6 ml-1" />
        </Toast.Close>
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-0 right-0 p-10 z-[99999] lg:p-6 md:p-5 sm:p-4 xs:left-0" />
    </Toast.Provider>
  );
}
