import * as AlertDialog from '@radix-ui/react-alert-dialog';
import type { ReactNode } from 'react';
import CrossLottie from '../CrossLottie';

interface Props {
  clickHandler: () => void;
  children: ReactNode;
}

const DeleteAlertDialog = (props: Props) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger className="w-full">
      {props.children}
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="overlay" />
      <AlertDialog.Content
        className="flex flex-col gap-5 py-5 px-7 modal-content"
        data-no-dnd="true"
      >
        <AlertDialog.Cancel className="absolute top-[22px] right-7">
          <CrossLottie />
        </AlertDialog.Cancel>
        <AlertDialog.Title className="text-lg font-medium">
          Are you absolutely sure?
        </AlertDialog.Title>
        <AlertDialog.Description className="text-[15px] dark:text-stone-400 text-stone-600">
          This action cannot be undone. This will permanently delete your data
          and remove your data from our servers.
        </AlertDialog.Description>
        <div className="flex self-end gap-8">
          <AlertDialog.Action asChild onClick={props.clickHandler}>
            <button className="px-4 py-2 font-medium rounded shadow text-rose-800 bg-rose-200 hover:bg-rose-300">
              Yes, delete data
            </button>
          </AlertDialog.Action>
          <AlertDialog.Cancel asChild>
            <button className="font-medium rounded shadow btn-primary">
              Cancel
            </button>
          </AlertDialog.Cancel>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default DeleteAlertDialog;
