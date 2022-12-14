import { Dispatch, SetStateAction, useRef, useState, useEffect } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useTheme } from 'next-themes';

import { dotsAnimation, dotsAnimationLight } from '../icons/AllLotties';

interface Props {
  size?: string;
  setCardHover?: Dispatch<SetStateAction<boolean>> | null;
}

export default function DotsLottie({
  size = 'normal',
  setCardHover = null,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Lottie
      animationData={
        resolvedTheme === 'dark' ? dotsAnimationLight : dotsAnimation
      }
      autoplay={false}
      lottieRef={lottieRef}
      onMouseEnter={() => {
        if (setCardHover) setCardHover(false);
        lottieRef.current?.play();
      }}
      onMouseLeave={() => {
        if (setCardHover) setCardHover(true);
        lottieRef.current?.stop();
      }}
      className={`${
        size === 'small' ? 'h-5' : size === 'normal' ? 'h-6' : ''
      } cursor-pointer hover:bg-violetHover dark:hover:bg-neutralHover rounded-full px-3`}
    />
  );
}
