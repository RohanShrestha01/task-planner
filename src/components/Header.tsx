import Link from 'next/link';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

import calendarAnimation from '../../public/calendarLogo.json';
import Nav from './Nav';
import SignInButton from './SignInButton';
import Search from './Search';
import ThemeToggleButton from './ThemeToggleButton';
import { useRef } from 'react';

export default function Header() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <header className="flex transition-[background-color] duration-500 dark:bg-lightNeutralBg py-1 px-10 bg-lightVioletBg font-medium">
      <div className="flex items-center flex-grow justify-between">
        <div className="flex items-center gap-14">
          <Link
            href="/"
            onMouseEnter={() => lottieRef.current?.pause()}
            onMouseLeave={() => lottieRef.current?.play()}
            className="flex items-center gap-4"
          >
            <Lottie
              animationData={calendarAnimation}
              lottieRef={lottieRef}
              className="h-12"
            />
            <h1 className="font-serif text-xl font-bold text-violet-600 dark:text-violet-400">
              Task Planner
            </h1>
          </Link>
          <Nav />
        </div>
        <Search />
      </div>
      <div className="flex gap-10 items-center pl-20">
        <ThemeToggleButton />
        <SignInButton />
      </div>
    </header>
  );
}
