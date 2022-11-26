import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { replaceColor } from 'lottie-colorify';
import { useTheme } from 'next-themes';
import { RefObject, useMemo } from 'react';

interface Props {
  animationData: any;
  lottieRef: RefObject<LottieRefCurrentProps>;
  className: string;
}

export default function ThemedLottie({
  animationData,
  lottieRef,
  className,
}: Props) {
  const { resolvedTheme } = useTheme();

  const animationDataLight = useMemo(
    () => replaceColor([0, 0, 0], [255, 255, 255], animationData),
    [animationData]
  );

  return (
    <Lottie
      animationData={
        resolvedTheme === 'dark' ? animationDataLight : animationData
      }
      autoplay={false}
      loop={false}
      lottieRef={lottieRef}
      className={className}
    />
  );
}
