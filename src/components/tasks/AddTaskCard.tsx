import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useTheme } from 'next-themes';
import { useRef, useEffect, type Dispatch, type SetStateAction } from 'react';
import { getLocalTimeZone, now } from '@internationalized/date';

import { tagAnimation, tagAnimationLight } from '../../icons/AllLotties';
import { assertIsNode } from '../../utils';
import CrossLottie from '../CrossLottie';

/* prettier-ignore */
const colors = ['#fda4af','#f9a8d4','#f0abfc','#d8b4fe','#c4b5fd','#a5b4fc','#93c5fd','#7dd3fc','#67e8f9','#5eead4','#6ee7b7','#86efac','#bef264','#fde047','#fcd34d','#fdba74','#fca5a5','#cbd5e1'];

interface Props {
  setShowBtn: Dispatch<SetStateAction<boolean>>;
}

export default function AddTaskCard({ setShowBtn }: Props) {
  const tagLottieRef = useRef<LottieRefCurrentProps>(null);
  const { resolvedTheme } = useTheme();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const closeAddTaskCard = ({ target }: MouseEvent) => {
      assertIsNode(target);
      if (formRef.current?.contains(target)) return;
      setShowBtn(true);
    };

    document.body.addEventListener('mousedown', closeAddTaskCard);
    return () =>
      document.body.removeEventListener('mousedown', closeAddTaskCard);
  }, [setShowBtn]);

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-3 px-4 py-4 mt-4 mr-2 rounded shadow-md bg-transition w-72"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-medium">Create New Card</h2>
        <CrossLottie clickHandler={() => setShowBtn(true)} />
      </div>
      <input
        type="text"
        placeholder="Enter title of task"
        required
        autoFocus
        className="w-full px-2 py-1 rounded input"
      />
      <textarea
        rows={2}
        placeholder="Enter description of task"
        required
        className="w-full px-2 py-1 rounded resize-none input"
      />
      <div>
        <label htmlFor="deadline" className="mb-1 text-sm font-medium">
          Select Deadline
        </label>
        <input
          id="deadline"
          type="datetime-local"
          name="deadline"
          required
          defaultValue={now(getLocalTimeZone())
            .add({ days: 1 })
            .toString()
            .slice(0, 16)}
          min={now(getLocalTimeZone()).toString().slice(0, 16)}
          className="w-full px-2 py-1 input"
        />
      </div>
      <div className="relative flex items-center justify-between">
        <Lottie
          animationData={
            resolvedTheme === 'dark' ? tagAnimationLight : tagAnimation
          }
          autoplay={false}
          loop={false}
          lottieRef={tagLottieRef}
          onComplete={() => tagLottieRef.current?.stop()}
          className="absolute h-5 left-1"
        />
        <input
          type="text"
          onClick={() => tagLottieRef.current?.play()}
          placeholder="Enter Tag"
          maxLength={18}
          className="pl-8 py-0.5 input w-44 pr-2"
        />
        <input
          type="color"
          list="presetColors"
          defaultValue="#93c5fd"
          className="w-14 bg-inherit"
        />
        <datalist id="presetColors">
          {colors.map((color, i) => (
            <option value={color} key={i} />
          ))}
        </datalist>
      </div>
      <button className="justify-center text-sm rounded btn-primary">
        Done
      </button>
    </form>
  );
}
