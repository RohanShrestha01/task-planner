import { useRef } from 'react';
import { useCalendarCell } from '@react-aria/calendar';
import { CalendarState } from '@react-stately/calendar';
import { CalendarDate } from '@internationalized/date';

interface Props {
  state: CalendarState;
  date: CalendarDate;
}

export default function CalendarCell({ state, date }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);

  return (
    <td {...cellProps}>
      <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={` ${isSelected ? '' : ''} ${isDisabled ? '' : ''} ${
          isUnavailable ? '' : ''
        }`}
      >
        {formattedDate}
      </div>
    </td>
  );
}
