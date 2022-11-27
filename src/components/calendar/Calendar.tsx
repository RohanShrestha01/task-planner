import { useRef } from 'react';
import { useCalendar } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { useCalendarState } from '@react-stately/calendar';
import { createCalendar } from '@internationalized/date';

import CalendarGrid from './CalendarGrid';
import Button from './Button';

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
    <div {...calendarProps} ref={ref} id="calendar">
      <div>
        <h2>{title}</h2>
        <Button {...prevButtonProps}>&lt;</Button>
        <Button {...nextButtonProps}>&gt;</Button>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
}
