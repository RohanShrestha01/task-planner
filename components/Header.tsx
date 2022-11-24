import Link from 'next/link';
import Lottie from 'lottie-react';

import calendarAnimation from '../public/calendarLogo.json';
import Nav from './Nav';
import SignInButton from './SignInButton';
import Search from './Search';
import ThemeToggleButton from './ThemeToggleButton';

export default function Header() {
  return (
    <header className="flex transition-[background-color] duration-500 dark:bg-lightNeutralBg py-1 px-10 bg-lightVioletBg font-medium">
      <div className="flex items-center flex-grow justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3">
            <Lottie animationData={calendarAnimation} className="h-12" />
            <h1 className="font-serif text-xl font-bold">Task Planner</h1>
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
