import { useEffect, useRef, type Dispatch, type SetStateAction } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import AddButton from '../../components/AddButton';
import CrossLottie from '../../components/CrossLottie';
import { assertIsNode } from '../../utils';

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

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      fetch('api/taskLists', {
        method: 'POST',
        body: JSON.stringify(inputRef.current?.value),
        headers: { 'Content-Type': 'application/json' },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['taskLists'] });
      setShowBtn(true);
    },
  });

  return (
    <section className="self-start" ref={listRef}>
      <div className="flex items-center h-10 gap-10 w-72">
        <input
          className="flex-grow px-2 py-1 rounded input"
          type="text"
          placeholder="Enter list title"
          autoFocus
          ref={inputRef}
        />
        <CrossLottie clickHandler={() => setShowBtn(true)} />
      </div>
      <AddButton
        className="px-2 mt-1 rounded btn-text"
        text="Add List"
        lottieColor="black"
        textStyle="text-sm"
        clickHandler={() => mutation.mutate()}
      />
    </section>
  );
}
