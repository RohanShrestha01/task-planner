import { useRef } from 'react';
import { useCalendarCell } from '@react-aria/calendar';
import { CalendarState } from '@react-stately/calendar';
import { CalendarDate, today, getLocalTimeZone } from '@internationalized/date';

interface Props {
  state: CalendarState;
  date: CalendarDate;
}

const todayDate = today(getLocalTimeZone());

export default function CalendarCell({ state, date }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);

  return (
    <td {...cellProps}>
      <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={`h-8 w-8 text-sm flex items-center justify-center rounded-full outline-none ${
          isSelected
            ? 'bg-violet-600 hover:bg-violet-700 dark:bg-violet-800 dark:hover:bg-violet-900 text-whiteText'
            : 'hover:bg-violet-300 dark:hover:bg-violet-600'
        } ${
          isDisabled
            ? 'hover:bg-transparent dark:hover:bg-transparent cursor-default text-gray-400'
            : ''
        } ${
          date.compare(todayDate) === 0
            ? 'border border-blackText dark:border-whiteText'
            : ''
        }`}
      >
        {formattedDate}
      </div>
    </td>
  );
}
