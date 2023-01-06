import { useRef } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';

import plusAnimation from '../../public/lotties/plus.json';

interface Props {
  text: string;
  className: string;
  lottieColor: 'white' | 'black';
  textStyle?: string;
  clickHandler: () => void;
}

export default function AddButton({
  text,
  className,
  lottieColor,
  textStyle = '',
  clickHandler,
}: Props) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <button
      className={className}
      onMouseEnter={() => lottieRef.current?.play()}
      onClick={clickHandler}
    >
      <Lottie
        animationData={plusAnimation}
        autoplay={false}
        loop={false}
        lottieRef={lottieRef}
        onComplete={() => lottieRef.current?.stop()}
        className={`self-center w-4 ${
          lottieColor === 'white' ? 'stroke-white fill-white' : ''
        } ${
          lottieColor === 'black'
            ? 'stroke-black fill-black dark:stroke-white dark:fill-white'
            : ''
        }`}
      />
      <span className={textStyle}>{text}</span>
    </button>
  );
}
