import { LottieRefCurrentProps } from 'lottie-react';
import { useRef } from 'react';

import PlusLottie from '../PlusLottie';

export default function CreateTaskButton() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <button
      className="py-2 flex gap-2 justify-center items-center rounded-full bg-violet-500 hover:bg-violet-600 dark:bg-violet-700 dark:hover:bg-violet-600 text-whiteText"
      onMouseEnter={() => lottieRef.current?.play()}
    >
      <PlusLottie
        lottieRef={lottieRef}
        className="h-4 self-center stroke-white fill-white"
      />
      <span className="font-medium">Create Task</span>
    </button>
  );
}
