import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { RefObject } from 'react';
import plusAnimation from '../../public/lotties/plus.json';

interface Props {
  lottieRef: RefObject<LottieRefCurrentProps>;
  className: string;
}

export default function PlusLottie({ lottieRef, className }: Props) {
  return (
    <Lottie
      animationData={plusAnimation}
      autoplay={false}
      loop={false}
      lottieRef={lottieRef}
      onComplete={() => lottieRef.current?.stop()}
      className={className}
    />
  );
}
