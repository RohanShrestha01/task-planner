import { useState, useRef } from 'react';

import DotsLottie from '../DotsLottie';
import DropdownOptions from './DropdownOptions';
import useMutateTasks from '../../hooks/useMutateTasks';
import { useToast } from '../../contexts/ToastContext';
import { useTaskListsData } from '../../hooks/useQueryTasks';

interface Props {
  heading: string;
  listId: string;
}

export default function ListHeading({ heading, listId }: Props) {
  const [showInput, setShowInput] = useState(false);
  const [newHeading, setNewHeading] = useState(heading);
  const inputRef = useRef<HTMLInputElement>(null);
  const { updateToast } = useToast();
  const { data } = useTaskListsData();

  const patchMutation = useMutateTasks({
    url: 'api/taskLists',
    method: 'PATCH',
  });

  const deleteMutation = useMutateTasks({
    url: 'api/taskLists',
    method: 'DELETE',
  });

  const inputBlurHandler = () => {
    const validInput = inputRef.current?.reportValidity();
    if (!validInput) return;
    setNewHeading(inputRef.current?.value!);
    updateToast('List Heading Updated Successfully', 'success');
    patchMutation.mutate({ heading: inputRef.current?.value!, id: listId });
    setShowInput(false);
  };

  return (
    <div className="flex items-center h-10 pr-4">
      {showInput ? (
        <input
          type="text"
          defaultValue={newHeading}
          className="flex-grow py-0.5 text-lg font-semibold bg-transparent rounded outline-none caret-violetText dark:caret-violetTextLight outline-violetText dark:outline-violetTextLight h-10"
          autoFocus
          spellCheck="false"
          onFocus={e => e.target.select()}
          onBlur={inputBlurHandler}
          maxLength={18}
          ref={inputRef}
          required
          onKeyUp={e => {
            if (e.key === 'Enter') inputBlurHandler();
          }}
        />
      ) : (
        <h2
          className="flex items-center flex-grow h-10 text-lg font-semibold rounded cursor-pointer"
          onClick={() => setShowInput(true)}
        >
          {newHeading}
        </h2>
      )}
      <DropdownOptions
        heading="List Actions"
        editHandler={() => setShowInput(true)}
        deleteHandler={() => {
          if (data && data[0].id === listId)
            return updateToast('Cannot Delete Last List', 'warning');
          deleteMutation.mutate({ id: listId });
          updateToast('List Deleted Successfully', 'warning');
        }}
        listId={listId}
        modal={false}
      >
        <DotsLottie />
      </DropdownOptions>
    </div>
  );
}
