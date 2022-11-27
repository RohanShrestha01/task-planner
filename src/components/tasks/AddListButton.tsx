import { useRef } from 'react';
import { LottieRefCurrentProps } from 'lottie-react';

import PlusLottie from '../PlusLottie';

export default function AddListButton() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <section
      className="w-64 bg-violet-500 hover:bg-violet-600 dark:bg-violet-700 dark:hover:bg-violet-600 text-whiteText flex gap-2 item-center rounded cursor-pointer px-4 py-2 self-start"
      onMouseEnter={() => lottieRef.current?.play()}
    >
      <PlusLottie
        lottieRef={lottieRef}
        className="h-4 self-center stroke-white fill-white"
      />
      <h2 className="font-medium">Add another list</h2>
    </section>
  );
}
