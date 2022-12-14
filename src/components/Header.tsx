import { useRef } from 'react';
import Link from 'next/link';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useSession } from 'next-auth/react';

import calendarAnimation from '../../public/calendarLogo.json';
import Nav from './Nav';
import Search from './Search';
import ThemeToggleButton from './ThemeToggleButton';
import SignInDialog from './SignInDialog';
import Profile from './Profile';

export default function Header() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const { data: sessionData } = useSession();

  return (
    <header className="flex px-10 py-1 font-medium shadow-md bg-transition">
      <div className="flex items-center justify-between flex-grow">
        <div className="flex items-center gap-14">
          <Link
            href="/"
            onMouseEnter={() => lottieRef.current?.setSpeed(3)}
            onMouseLeave={() => lottieRef.current?.setSpeed(1)}
            className="flex items-center gap-4 group"
          >
            <Lottie
              animationData={calendarAnimation}
              lottieRef={lottieRef}
              className="h-12"
            />
            <h1 className="font-serif text-xl font-bold text-violetText dark:text-violetTextLight group-hover:text-violet-700 dark:group-hover:text-violet-300">
              Task Planner
            </h1>
          </Link>
          <Nav />
        </div>
        <Search />
      </div>
      <div className="flex items-center gap-10 pl-20">
        <ThemeToggleButton />
        {sessionData ? <Profile /> : <SignInDialog />}
      </div>
    </header>
  );
}
