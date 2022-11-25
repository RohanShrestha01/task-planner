import { useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

import plusAnimation from '../public/lotties/plus.json';

export default function AddTaskButton() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <button
      onMouseEnter={() => lottieRef.current?.play()}
      className="flex gap-2 mt-4 justify-center hover:bg-violetHoverDark rounded-full py-2 dark:hover:bg-neutralHover"
    >
      <Lottie
        animationData={plusAnimation}
        autoplay={false}
        loop={false}
        lottieRef={lottieRef}
        onComplete={() => lottieRef.current?.stop()}
        className="h-4 self-center dark:stroke-white dark:fill-white stroke-black fill-black"
      />
      <span>Add new task</span>
    </button>
  );
}
