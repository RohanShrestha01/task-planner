import { useState, useRef } from 'react';

import DotsLottie from '../DotsLottie';
import DropdownOptions from './DropdownOptions';
import useMutateTasks from '../../hooks/useMutateTasks';

interface Props {
  heading: string;
  listId: string;
}

export default function ListHeading({ heading, listId }: Props) {
  const [showInput, setShowInput] = useState(false);
  const [newHeading, setNewHeading] = useState(heading);
  const inputRef = useRef<HTMLInputElement>(null);

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
    patchMutation.mutate({ heading: inputRef.current?.value!, id: listId });
    setShowInput(false);
  };

  return (
    <div className="flex items-center h-10 pr-4">
      {showInput ? (
        <input
          type="text"
          defaultValue={newHeading}
          className="flex-grow py-0.5 text-lg font-semibold bg-transparent rounded outline-none caret-violetText dark:caret-violetTextLight outline-violetText dark:outline-violetTextLight"
          autoFocus
          spellCheck="false"
          onFocus={e => e.target.select()}
          onBlur={inputBlurHandler}
          maxLength={18}
          ref={inputRef}
          required
          onKeyUp={e => e.key === 'Enter' && inputBlurHandler()}
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
        deleteHandler={() => deleteMutation.mutate({ id: listId })}
        modal={false}
      >
        <DotsLottie />
      </DropdownOptions>
    </div>
  );
}
