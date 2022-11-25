import { useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

import plusAnimation from '../public/lotties/plus.json';

export default function AddListButton() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <section
      className="w-64 bg-violet-500 hover:bg-violet-600 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-whiteText flex gap-2 item-center rounded cursor-pointer px-4 py-2"
      onMouseEnter={() => lottieRef.current?.play()}
    >
      <Lottie
        animationData={plusAnimation}
        autoplay={false}
        loop={false}
        lottieRef={lottieRef}
        onComplete={() => lottieRef.current?.stop()}
        className="h-4 self-center stroke-white fill-white"
      />
      <h2 className="font-medium flex items-center">Add another list</h2>
    </section>
  );
}
