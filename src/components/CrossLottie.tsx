import { replaceColor } from 'lottie-colorify';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { useTheme } from 'next-themes';
import { useRef } from 'react';

import crossHoverAnimation from '../../public/lotties/crossHover.json';

const crossHoverAnimationLight = replaceColor(
  [0, 0, 0],
  [255, 255, 255],
  crossHoverAnimation
);

export default function CrossLottie({
  clickHandler,
}: {
  clickHandler: () => void;
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
      className="h-6 cursor-pointer"
    />
  );
}
