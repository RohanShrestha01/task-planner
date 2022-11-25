import Lottie from 'lottie-react';
import { replaceColor } from 'lottie-colorify';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';

export default function ThemedLottie(props: any) {
  const { resolvedTheme, theme } = useTheme();

  const { animationData, lottieRef, className } = props;

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
