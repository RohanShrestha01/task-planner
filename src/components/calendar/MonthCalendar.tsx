import { useRef } from 'react';
import { useCalendar } from '@react-aria/calendar';
import { useCalendarState } from '@react-stately/calendar';
import { GregorianCalendar } from '@internationalized/date';

import CalendarGrid from './CalendarGrid';
import Button from './Button';
import ChevronLottie from '../ChevronLottie';

const createCalendar = () => new GregorianCalendar();

export default function MonthCalendar(props: any) {
  const state = useCalendarState({
    ...props,
    locale: 'en-US',
    createCalendar,
  });

  const ref = useRef<HTMLDivElement>(null);
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, state);

  return (
    <div
      {...calendarProps}
      ref={ref}
      className="inline-block px-2 pb-4 rounded bg-transition"
    >
      <div className="flex items-center justify-between px-2 py-4">
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
