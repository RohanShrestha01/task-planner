import { useRef } from 'react';
import { useCalendar } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { useCalendarState } from '@react-stately/calendar';
import { GregorianCalendar } from '@internationalized/date';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { replaceColor } from 'lottie-colorify';
import { useTheme } from 'next-themes';

import chevronLeftAnimation from '../../../public/lotties/chevronLeft.json';
import chevronRightAnimation from '../../../public/lotties/chevronRight.json';
import CalendarGrid from './CalendarGrid';
import Button from './Button';

const createCalendar = () => new GregorianCalendar();
const chevronLeftAnimationLight = replaceColor(
  [0, 0, 0],
  [255, 255, 255],
  chevronLeftAnimation
);
const chevronRightAnimationLight = replaceColor(
  [0, 0, 0],
  [255, 255, 255],
  chevronRightAnimation
);

export default function Calendar(props: any) {
  const chevronLeftLottieRef = useRef<LottieRefCurrentProps>(null);
  const chevronRightLottieRef = useRef<LottieRefCurrentProps>(null);

  const { resolvedTheme } = useTheme();

  const chevronStyle =
    'h-7 hover:bg-violet-300 dark:hover:bg-violet-600 rounded-full flex items-center justify-center';

  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef<HTMLDivElement>(null);
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, state);

  return (
    <div {...calendarProps} ref={ref} className="inline-block">
      <div className="flex items-center justify-between py-4 px-2">
        <h2 className="font-bold">{title}</h2>
        <div className="flex gap-2">
          <Button {...prevButtonProps}>
            <Lottie
              animationData={
                resolvedTheme === 'dark'
                  ? chevronLeftAnimationLight
                  : chevronLeftAnimation
              }
              autoplay={false}
              loop={false}
              lottieRef={chevronLeftLottieRef}
              onClick={() =>
                chevronLeftLottieRef.current?.playSegments([0, 30], true)
              }
              className={chevronStyle}
            />
          </Button>
          <Button {...nextButtonProps}>
            <Lottie
              animationData={
                resolvedTheme === 'dark'
                  ? chevronRightAnimationLight
                  : chevronRightAnimation
              }
              autoplay={false}
              loop={false}
              lottieRef={chevronRightLottieRef}
              onClick={() =>
                chevronRightLottieRef.current?.playSegments([0, 30], true)
              }
              className={chevronStyle}
            />
          </Button>
        </div>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
}
