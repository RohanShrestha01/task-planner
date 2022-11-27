import { useRef } from 'react';
import { useCalendar } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { useCalendarState } from '@react-stately/calendar';
import { GregorianCalendar } from '@internationalized/date';

import CalendarGrid from './CalendarGrid';
import Button from './Button';
import ChevronLottie from '../ChevronLottie';

const createCalendar = () => new GregorianCalendar();

export default function Calendar(props: any) {
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
    <div
      {...calendarProps}
      ref={ref}
      className="inline-block bg-lightVioletBg dark:bg-lightNeutralBg rounded pb-4 px-2 transition-[background-color] duration-500"
    >
      <div className="flex items-center justify-between py-4 px-2">
        <h2 className="font-bold">{title}</h2>
        <div className="flex gap-2">
          <Button {...prevButtonProps}>
            <ChevronLottie type="left" />
          </Button>
          <Button {...nextButtonProps}>
            <ChevronLottie type="right" />
          </Button>
        </div>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
}
