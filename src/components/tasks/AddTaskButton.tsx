import { useRef } from 'react';
import { LottieRefCurrentProps } from 'lottie-react';

import PlusLottie from '../PlusLottie';

export default function AddTaskButton() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <button
      onMouseEnter={() => lottieRef.current?.play()}
      className="flex gap-2 mt-4 justify-center hover:bg-violetHoverDark rounded-full py-2 dark:hover:bg-neutralHover"
    >
      <PlusLottie
        lottieRef={lottieRef}
        className="h-4 self-center stroke-black fill-black dark:stroke-white dark:fill-white"
      />
      <span className="text-sm">Add new task</span>
    </button>
  );
}
