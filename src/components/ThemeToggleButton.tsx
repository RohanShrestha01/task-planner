import { useEffect, useRef, useState } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useTheme } from 'next-themes';

import themeToggleAnimation from '../../public/lotties/themeToggle.json';

export default function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9 w-9" />;

  const themeToggleHandler = () => {
    lottieRef.current?.setSpeed(1.75);
    if (resolvedTheme === 'dark') {
      lottieRef.current?.playSegments([0, 40], true);
      setTheme('light');
    } else {
      lottieRef.current?.playSegments([40, 80], true);
      setTheme('dark');
    }
  };

  return (
    <Lottie
      className="transition-transform duration-200 cursor-pointer h-9 hover:scale-110"
      animationData={themeToggleAnimation}
      autoplay={false}
      loop={false}
      lottieRef={lottieRef}
      onDOMLoaded={() => {
        if (resolvedTheme === 'light') lottieRef.current?.goToAndStop(40, true);
      }}
      onClick={themeToggleHandler}
    />
  );
}
