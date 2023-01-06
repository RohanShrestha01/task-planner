import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useTheme } from 'next-themes';
import { useRef } from 'react';

import {
  crossHoverAnimation,
  crossHoverAnimationLight,
} from '../icons/AllLotties';

export default function CrossLottie({
  clickHandler,
}: {
  clickHandler?: () => void;
}) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const { resolvedTheme } = useTheme();

  return (
    <Lottie
      animationData={
        resolvedTheme === 'dark'
          ? crossHoverAnimationLight
          : crossHoverAnimation
      }
      autoplay={false}
      loop={false}
      lottieRef={lottieRef}
      onMouseEnter={() => lottieRef.current?.play()}
      onComplete={() => lottieRef.current?.stop()}
      onClick={clickHandler}
      className="w-6 cursor-pointer"
    />
  );
}
