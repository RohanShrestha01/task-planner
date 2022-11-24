import Link from 'next/link';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import tasksAnimation from '../public/lotties/tasks.json';
import calendarAnimation from '../public/lotties/calendar.json';
import { useRef } from 'react';

export default function Nav() {
  const tasksLottieRef = useRef<LottieRefCurrentProps>(null);
  const calendarLottieRef = useRef<LottieRefCurrentProps>(null);

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
              className="flex items-center gap-2 hover:bg-violetHover dark:hover:bg-slateHover py-2 px-4 rounded-full"
            >
              <Lottie
                className="lottie h-7"
                animationData={navItem.lottie}
                autoplay={false}
                loop={false}
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
