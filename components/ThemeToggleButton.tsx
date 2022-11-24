import { useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

import themeToggleAnimation from '../public/lotties/themeToggle.json';

export default function ThemeToggleButton() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const themeToggleHandler = () => {
    const darkMode = document.documentElement.classList.contains('dark');
    lottieRef.current?.setSpeed(1.75);
    if (darkMode) {
      lottieRef.current?.playSegments([0, 40], true);
      document.documentElement.classList.remove('dark');
    } else {
      lottieRef.current?.playSegments([40, 80], true);
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <Lottie
      className="h-9 cursor-pointer hover:scale-110 transition-transform duration-200"
      animationData={themeToggleAnimation}
      autoplay={false}
      loop={false}
      lottieRef={lottieRef}
      initialSegment={[40, 80]}
      onClick={themeToggleHandler}
    />
  );
}
