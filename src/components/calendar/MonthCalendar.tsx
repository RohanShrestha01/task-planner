import { useRef } from 'react';
import { useCalendar } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { useCalendarState } from '@react-stately/calendar';
import { GregorianCalendar } from '@internationalized/date';

import CalendarGrid from './CalendarGrid';
import Button from './Button';

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
    <div {...calendarProps} ref={ref} id="calendar" className="inline-block">
      <div className="flex justify-between py-4 px-2">
        <h2 className="font-bold">{title}</h2>
        <div className="flex gap-4">
          <Button {...prevButtonProps}>&lt;</Button>
          <Button {...nextButtonProps}>&gt;</Button>
        </div>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
}
