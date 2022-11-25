import { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LottieRefCurrentProps } from 'lottie-react';

import ThemedLottie from './ThemedLottie';
import tasksAnimation from '../public/lotties/tasks.json';
import calendarAnimation from '../public/lotties/calendar.json';

export default function Nav() {
  const tasksLottieRef = useRef<LottieRefCurrentProps>(null);
  const calendarLottieRef = useRef<LottieRefCurrentProps>(null);

  const { pathname } = useRouter();

  const navItems = [
    {
      link: '/',
      name: 'Tasks',
      lottie: tasksAnimation,
      lottieRef: tasksLottieRef,
    },
    {
      link: '/calendar',
      name: 'Calendar',
      lottie: calendarAnimation,
      lottieRef: calendarLottieRef,
    },
  ];

  return (
    <nav>
      <ul className="flex gap-8">
        {navItems.map((navItem, i) => (
          <li
            key={i}
            onMouseEnter={() => navItem.lottieRef.current?.play()}
            onMouseLeave={() => navItem.lottieRef.current?.stop()}
          >
            <Link
              href={navItem.link}
              className={`flex items-center gap-2 hover:bg-violetHover dark:hover:bg-neutralHover py-2 px-4 rounded-full border-2 transition-[border-color] duration-500 ${
                pathname === navItem.link
                  ? 'border-violet-600 dark:border-neutral-400'
                  : 'border-lightVioletBg dark:border-lightNeutralBg'
              }`}
            >
              <ThemedLottie
                className="h-7"
                animationData={navItem.lottie}
                lottieRef={navItem.lottieRef}
              />
              <span>{navItem.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
