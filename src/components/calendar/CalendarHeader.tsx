import { type DateDuration } from '@internationalized/date';

import ChevronLottie from '../ChevronLottie';
import { convertNumToMonth } from '../../utils';
import { type Props } from './MainCalendar';

interface HeaderProps extends Props {
  viewValue: string;
}

export default function CalendarHeader({
  selectedValue,
  setSelectedValue,
  setFocusedValue,
  viewValue,
}: HeaderProps) {
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
    <div className="flex justify-between items-center basis-[300px] xl:basis-[265px] md:basis-[232px] sm:basis-40 xs:hidden">
      <h2 className="text-xl font-bold xl:text-lg md:text-base sm:text-sm">
        {`${selectedMonth} ${selectedValue.day}`}
        <span className="sm:hidden">{`, ${selectedValue.year}`}</span>
      </h2>
      <div className="flex gap-2 xl:gap-1 sm:gap-0">
        <ChevronLottie type="left" clickHandler={chevronLeftClickHandler} />
        <ChevronLottie type="right" clickHandler={chevronRightClickHandler} />
      </div>
    </div>
  );
}
