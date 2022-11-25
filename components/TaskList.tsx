import { useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { replaceColor } from 'lottie-colorify';
import { useTheme } from 'next-themes';

import dotsAnimation from '../public/lotties/dots.json';

export default function TaskList() {
  const { resolvedTheme } = useTheme();

  const listData = [
    { heading: 'To Do', lottieRef: useRef<LottieRefCurrentProps>(null) },
    { heading: 'Doing', lottieRef: useRef<LottieRefCurrentProps>(null) },
    { heading: 'Done', lottieRef: useRef<LottieRefCurrentProps>(null) },
  ];

  return (
    <>
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
    </>
  );
}
