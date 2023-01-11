import { useRef, useState, useEffect } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useTheme } from 'next-themes';

import {
  chevronLeftAnimation,
  chevronLeftAnimationLight,
  chevronRightAnimation,
  chevronRightAnimationLight,
} from '../icons/AllLotties';

interface Props {
  type: string;
  clickHandler?: () => void;
}

export default function ChevronLottie({ type, clickHandler }: Props) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

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
