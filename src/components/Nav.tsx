import { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { replaceColor } from 'lottie-colorify';
import { useTheme } from 'next-themes';

import tasksAnimation from '../../public/lotties/tasks.json';
import calendarAnimation from '../../public/lotties/calendar.json';

const tasksAnimationLight = replaceColor(
  [0, 0, 0],
  [255, 255, 255],
  tasksAnimation
);
const calendarAnimationLight = replaceColor(
  [0, 0, 0],
  [255, 255, 255],
  calendarAnimation
);

export default function Nav() {
  const tasksLottieRef = useRef<LottieRefCurrentProps>(null);
  const calendarLottieRef = useRef<LottieRefCurrentProps>(null);

  const { pathname } = useRouter();
  const { resolvedTheme } = useTheme();

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
      <ul className="flex gap-8">
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
              <span>{navItem.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
