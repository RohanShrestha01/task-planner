import { useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { replaceColor } from 'lottie-colorify';
import { useTheme } from 'next-themes';

import chevronLeftAnimation from '../../public/lotties/chevronLeft.json';
import chevronRightAnimation from '../../public/lotties/chevronRight.json';

const chevronLeftAnimationLight = replaceColor(
  [0, 0, 0],
  [255, 255, 255],
  chevronLeftAnimation
);
const chevronRightAnimationLight = replaceColor(
  [0, 0, 0],
  [255, 255, 255],
  chevronRightAnimation
);

interface Props {
  type: string;
  clickHandler?: () => void;
}

export default function ChevronLottie({ type, clickHandler }: Props) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const { resolvedTheme } = useTheme();

  let animationData;
  if (resolvedTheme === 'dark') {
    if (type === 'left') animationData = chevronLeftAnimationLight;
    else if (type === 'right') animationData = chevronRightAnimationLight;
  } else if (resolvedTheme === 'light') {
    if (type === 'left') animationData = chevronLeftAnimation;
    else if (type === 'right') animationData = chevronRightAnimation;
  }

  return (
    <Lottie
      animationData={animationData}
      autoplay={false}
      loop={false}
      lottieRef={lottieRef}
      onClick={() => {
        lottieRef.current?.playSegments([0, 30], true);
        if (clickHandler) clickHandler();
      }}
      className={
        'h-7 hover:bg-violetHover dark:hover:bg-violetHoverDark rounded-full flex items-center justify-center cursor-pointer'
      }
    />
  );
}
