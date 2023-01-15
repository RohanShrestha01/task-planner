import { useRef, useState } from 'react';
import Link from 'next/link';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';

import calendarAnimation from '../../public/calendarLogo.json';
import Nav from './Nav';
import Search from './Search';
import ThemeToggleButton from './ThemeToggleButton';
import SignInDialog from './SignInDialog';
import Profile from './Profile';
import { menuAnimation, menuAnimationLight } from '../icons/AllLotties';

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const menuLottieRef = useRef<LottieRefCurrentProps>(null);

  const { data: sessionData } = useSession();
  const { resolvedTheme } = useTheme();

  const menuClickHandler = () => {
    menuLottieRef.current?.setSpeed(10);
    setShowMenu(prev => !prev);
    if (showMenu) menuLottieRef.current?.setDirection(-1);
    else menuLottieRef.current?.setDirection(1);
    menuLottieRef.current?.play();
  };

  const menuOptionClickHandler = () => {
    setShowMenu(false);
    menuLottieRef.current?.stop();
  };

  return (
    <header className="relative flex items-center px-10 py-1 font-medium shadow-md bg-transition 2xl:px-6 xl:px-4 lg:px-2 h-14">
      <div className="flex items-center justify-between flex-grow sm:justify-start sm:gap-6 xs:gap-2">
        <div className="flex items-center gap-14 xl:gap-8">
          <Link
            href="/"
            onMouseEnter={() => lottieRef.current?.setSpeed(3)}
            onMouseLeave={() => lottieRef.current?.setSpeed(1)}
            className="flex items-center gap-4 group xl:gap-2"
          >
            <Lottie
              animationData={calendarAnimation}
              lottieRef={lottieRef}
              className="h-12 xs:h-11"
            />
            <h1 className="font-serif text-xl font-bold text-violetText dark:text-violetTextLight group-hover:text-violet-700 dark:group-hover:text-violet-300 sm:hidden">
              Task Planner
            </h1>
          </Link>
          <div className="lg:hidden">
            <Nav />
          </div>
        </div>
        <Search />
      </div>
      <div className="flex items-center gap-10 pl-20 2xl:pl-10 xl:pl-6 xl:gap-6 xs:pl-2">
        <ThemeToggleButton />
        <div className="lg:hidden">
          {sessionData ? <Profile /> : <SignInDialog />}
        </div>
      </div>
      {/* For Smaller Screens */}
      <Lottie
        animationData={
          resolvedTheme === 'dark' ? menuAnimationLight : menuAnimation
        }
        loop={false}
        autoplay={false}
        lottieRef={menuLottieRef}
        className="hidden h-10 ml-6 cursor-pointer lg:block xs:ml-2 xs:h-9"
        onClick={menuClickHandler}
      />
      {showMenu ? (
        <div className="absolute z-20 hidden p-4 rounded shadow-md w-72 right-4 bg-transition top-16 lg:flex lg:flex-col xs:right-0 xs:top-14 xs:w-full xs:rounded-none">
          <Nav clickHandler={menuOptionClickHandler} />
          <hr className="h-px my-4 border-none bg-blackText dark:bg-whiteText" />
          {sessionData ? <Profile /> : <SignInDialog />}
        </div>
      ) : null}
    </header>
  );
}
