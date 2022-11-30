import { Dispatch, SetStateAction } from 'react';
import { CalendarDate, DateDuration } from '@internationalized/date';

import ChevronLottie from '../ChevronLottie';
import { convertNumToMonth } from '../../utils';

interface Props {
  selectedValue: CalendarDate;
  setSelectedValue: Dispatch<SetStateAction<CalendarDate>>;
  viewValue: string;
}

export default function CalendarHeader({
  selectedValue,
  setSelectedValue,
  viewValue,
}: Props) {
  const selectedMonth = convertNumToMonth(selectedValue.month);

  let duration: DateDuration;
  if (viewValue === 'day') duration = { days: 1 };
  else if (viewValue === 'week') duration = { weeks: 1 };
  else if (viewValue === 'month') duration = { months: 1 };

  const chevronLeftClickHandler = () =>
    setSelectedValue(prevValue => prevValue.subtract(duration));

  const chevronRightClickHandler = () =>
    setSelectedValue(prevValue => prevValue.add(duration));

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
