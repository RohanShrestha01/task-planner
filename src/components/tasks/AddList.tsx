import { useEffect, useRef, type Dispatch, type SetStateAction } from 'react';

import AddButton from '../../components/AddButton';
import CrossLottie from '../../components/CrossLottie';
import { assertIsNode } from '../../utils';
import useMutateTasks from '../../hooks/useMutateTasks';
import { useToast } from '../../contexts/ToastContext';

interface Props {
  setShowBtn: Dispatch<SetStateAction<boolean>>;
}

export default function AddList({ setShowBtn }: Props) {
  const listRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const closeAddList = ({ target }: MouseEvent) => {
      assertIsNode(target);
      if (listRef.current?.contains(target)) return;
      setShowBtn(true);
    };

    document.body.addEventListener('mousedown', closeAddList);
    return () => document.body.removeEventListener('mousedown', closeAddList);
  }, [setShowBtn]);

  const { updateToast } = useToast();
  const mutation = useMutateTasks({ method: 'POST', url: 'api/taskLists' });

  const addClickHandler = () => {
    const validInput = inputRef.current?.reportValidity();
    if (!validInput) return;
    mutation.mutate({
      heading: inputRef.current?.value!,
      tasks: [],
      onMutateSuccess: () => {
        setShowBtn(true);
        updateToast('New List Added Successfully', 'success');
      },
    });
  };

  return (
    <section className="self-start" ref={listRef}>
      <div className="flex items-center h-10 gap-10 w-72 2xl:w-[272px] xl:w-56 xl:gap-6">
        <input
          className="flex-grow px-2 py-1 rounded input xl:w-44"
          type="text"
          placeholder="Enter list title"
          autoFocus
          ref={inputRef}
          spellCheck="false"
          required
          onKeyUp={e => {
            if (e.key === 'Enter') addClickHandler();
          }}
        />
        <CrossLottie clickHandler={() => setShowBtn(true)} />
      </div>
      <AddButton
        className="px-2 mt-1 rounded btn-text"
        text="Add List"
        lottieColor="black"
        textStyle="text-sm"
        clickHandler={addClickHandler}
      />
    </section>
  );
}
