import { useRef } from 'react';
import Link from 'next/link';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

import calendarAnimation from '../public/calendarLogo.json';
import themeToggleAnimation from '../public/lotties/themeToggle.json';
import Nav from './Nav';
import SignInButton from './SignInButton';

export default function Header() {
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
    <header className="flex items-center justify-between transition-[background-color] duration-500 dark:bg-darkSlateBg py-1 px-4 bg-lightVioletBg">
      <Link href="/" className="flex items-center gap-3">
        <Lottie animationData={calendarAnimation} className="h-12" />
        <h1>Task Planner</h1>
      </Link>
      <Nav />
      <div className="flex gap-6 items-center">
        <Lottie
          className="h-9 cursor-pointer hover:scale-110 transition-transform duration-200"
          animationData={themeToggleAnimation}
          autoplay={false}
          loop={false}
          lottieRef={lottieRef}
          initialSegment={[40, 80]}
          onClick={themeToggleHandler}
        />
        <SignInButton />
      </div>
    </header>
  );
}
