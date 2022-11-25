import { useRef } from 'react';
import { useTheme } from 'next-themes';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { replaceColor } from 'lottie-colorify';

import dotsAnimation from '../public/lotties/dots.json';
import plusAnimation from '../public/lotties/plus.json';

export default function Home() {
  const { resolvedTheme } = useTheme();
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const listData = [
    { heading: 'To Do', lottieRef: useRef<LottieRefCurrentProps>(null) },
    { heading: 'Doing', lottieRef: useRef<LottieRefCurrentProps>(null) },
    { heading: 'Done', lottieRef: useRef<LottieRefCurrentProps>(null) },
  ];

  return (
    <main className="py-8 flex justify-around">
      {listData.map(({ heading, lottieRef }, i) => (
        <section className="flex items-center justify-between w-64" key={i}>
          <h2 className="font-medium text-lg flex-grow cursor-pointer">
            {heading}
          </h2>
          <Lottie
            animationData={
              resolvedTheme === 'dark'
                ? replaceColor([0, 0, 0], [255, 255, 255], dotsAnimation)
                : dotsAnimation
            }
            autoplay={false}
            lottieRef={lottieRef}
            onMouseEnter={() => lottieRef.current?.play()}
            onMouseLeave={() => lottieRef.current?.stop()}
            className="h-6 cursor-pointer hover:bg-violetHoverDark dark:hover:bg-neutralHoverLight rounded-full px-3"
          />
        </section>
      ))}
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
    </main>
  );
}
