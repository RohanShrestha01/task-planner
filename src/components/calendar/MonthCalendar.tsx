import { useRef } from 'react';
import { useCalendar } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { useCalendarState } from '@react-stately/calendar';
import { GregorianCalendar } from '@internationalized/date';
import { LottieRefCurrentProps } from 'lottie-react';

import ThemedLottie from '../ThemedLottie';
import chevronLeftAnimation from '../../../public/lotties/chevronLeft.json';
import chevronRightAnimation from '../../../public/lotties/chevronRight.json';
import CalendarGrid from './CalendarGrid';
import Button from './Button';

const createCalendar = () => new GregorianCalendar();

export default function Calendar(props: any) {
  const chevronLeftLottieRef = useRef<LottieRefCurrentProps>(null);
  const chevronRightLottieRef = useRef<LottieRefCurrentProps>(null);

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
    <div {...calendarProps} ref={ref} id="calendar" className="inline-block">
      <div className="flex items-center justify-between py-4 px-2">
        <h2 className="font-bold">{title}</h2>
        <div className="flex gap-2">
          <Button {...prevButtonProps}>
            <ThemedLottie
              animationData={chevronLeftAnimation}
              lottieRef={chevronLeftLottieRef}
              type="click"
              className={chevronStyle}
            />
          </Button>
          <Button {...nextButtonProps}>
            <ThemedLottie
              animationData={chevronRightAnimation}
              lottieRef={chevronRightLottieRef}
              type="click"
              className={chevronStyle}
            />
          </Button>
        </div>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
}
