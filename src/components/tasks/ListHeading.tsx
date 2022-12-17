import { useState, useRef } from 'react';

import DotsLottie from '../DotsLottie';
import DropdownOptions from './DropdownOptions';
import useMutateTasks from '../../hooks/useMutateTasks';

type Props = {
  heading: string;
  listId: string;
};

export default function ListHeading({ heading, listId }: Props) {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const patchMutation = useMutateTasks({
    url: 'api/taskLists',
    method: 'PATCH',
    queryKey: ['taskLists'],
  });

  const deleteMutation = useMutateTasks({
    url: 'api/taskLists',
    method: 'DELETE',
    queryKey: ['taskLists'],
  });

  const inputBlurHandler = () => {
    patchMutation.mutate({ heading: inputRef.current?.value!, id: listId });
    setShowInput(false);
  };

  return (
    <div className="flex items-center h-10 pr-4">
      {showInput ? (
        <input
          type="text"
          defaultValue={heading}
          className="flex-grow py-0.5 text-lg font-semibold bg-transparent rounded outline-none caret-violetText dark:caret-violetTextLight outline-violetText dark:outline-violetTextLight"
          autoFocus
          spellCheck={false}
          onFocus={e => e.target.select()}
          onBlur={inputBlurHandler}
          maxLength={18}
          ref={inputRef}
        />
      ) : (
        <h2
          className="flex items-center flex-grow h-10 text-lg font-semibold rounded cursor-pointer"
          onClick={() => setShowInput(true)}
        >
          {heading}
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
