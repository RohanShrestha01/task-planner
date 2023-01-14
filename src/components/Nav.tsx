import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useTheme } from 'next-themes';

import {
  calendarAnimation,
  calendarAnimationLight,
  tasksAnimation,
  tasksAnimationLight,
} from '../icons/AllLotties';

export default function Nav() {
  const tasksLottieRef = useRef<LottieRefCurrentProps>(null);
  const calendarLottieRef = useRef<LottieRefCurrentProps>(null);
  const [mounted, setMounted] = useState(false);

  const { pathname } = useRouter();
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const navItems = [
    {
      link: '/',
      name: 'Tasks',
      lottie: tasksAnimation,
      lottieLight: tasksAnimationLight,
      lottieRef: tasksLottieRef,
    },
    {
      link: '/calendar',
      name: 'Calendar',
      lottie: calendarAnimation,
      lottieLight: calendarAnimationLight,
      lottieRef: calendarLottieRef,
    },
  ];

  return (
    <nav>
      <ul className="flex gap-8 xl:gap-4">
        {navItems.map((navItem, i) => (
          <li
            key={i}
            onMouseEnter={() => navItem.lottieRef.current?.play()}
            onMouseLeave={() => navItem.lottieRef.current?.stop()}
          >
            <Link
              href={navItem.link}
              className={`flex items-center gap-2 hover:bg-violetHover dark:hover:bg-violetHoverDark py-1 px-4 rounded-full border-2 transition-[border-color] duration-500 ${
                pathname === navItem.link
                  ? 'border-violet-600 dark:border-violet-400'
                  : 'border-lightVioletBg dark:border-lightNeutralBg'
              }`}
            >
              {mounted ? (
                <Lottie
                  animationData={
                    resolvedTheme === 'dark'
                      ? navItem.lottieLight
                      : navItem.lottie
                  }
                  autoplay={false}
                  loop={false}
                  lottieRef={navItem.lottieRef}
                  className="h-7"
                />
              ) : null}
              <span>{navItem.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
