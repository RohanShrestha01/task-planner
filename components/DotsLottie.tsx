import { useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { replaceColor } from 'lottie-colorify';
import { useTheme } from 'next-themes';

import dotsAnimation from '../public/lotties/dots.json';

export default function DotsLottie({ size = 'normal' }) {
  const { resolvedTheme } = useTheme();
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
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
      className={`${
        size === 'small' ? 'h-5' : size === 'normal' ? 'h-6' : ''
      } cursor-pointer hover:bg-violetHoverDark dark:hover:bg-neutralHoverLight rounded-full px-3`}
    />
  );
}
