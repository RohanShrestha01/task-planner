import { Dispatch, SetStateAction } from 'react';
import { CalendarDate, DateDuration } from '@internationalized/date';

import ChevronLottie from '../ChevronLottie';
import { convertNumToMonth } from '../../utils';

interface Props {
  selectedValue: CalendarDate;
  setSelectedValue: Dispatch<SetStateAction<CalendarDate>>;
  setFocusedValue: Dispatch<SetStateAction<CalendarDate>>;
  viewValue: string;
}

export default function CalendarHeader({
  selectedValue,
  setSelectedValue,
  setFocusedValue,
  viewValue,
}: Props) {
  const selectedMonth = convertNumToMonth(selectedValue.month);

  let duration: DateDuration;
  if (viewValue === 'day') duration = { days: 1 };
  else if (viewValue === 'week') duration = { weeks: 1 };
  else if (viewValue === 'month') duration = { months: 1 };

  const chevronLeftClickHandler = () =>
    setSelectedValue(prevValue => {
      const newValue = prevValue.subtract(duration);
      setFocusedValue(newValue);
      return newValue;
    });

  const chevronRightClickHandler = () =>
    setSelectedValue(prevValue => {
      const newValue = prevValue.add(duration);
      setFocusedValue(newValue);
      return newValue;
    });

  return (
    <div className="flex justify-between basis-[300px]">
      <h2 className="text-xl font-bold">{`${selectedMonth} ${selectedValue.day}, ${selectedValue.year}`}</h2>
      <div className="flex gap-2">
        <ChevronLottie type="left" clickHandler={chevronLeftClickHandler} />
        <ChevronLottie type="right" clickHandler={chevronRightClickHandler} />
      </div>
    </div>
  );
}
