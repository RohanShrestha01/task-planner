import { Dispatch, SetStateAction } from 'react';
import { CalendarDate } from '@internationalized/date';

import ChevronLottie from '../ChevronLottie';
import { convertNumToMonth } from '../../utils';

export interface Props {
  selectedValue: CalendarDate;
  setSelectedValue: Dispatch<SetStateAction<CalendarDate>>;
}

export default function CalendarHeader({
  selectedValue,
  setSelectedValue,
}: Props) {
  const selectedMonth = convertNumToMonth(selectedValue.month);

  const chevronLeftClickHandler = () => {
    setSelectedValue(prevValue => prevValue.subtract({ months: 1 }));
  };
  const chevronRightClickHandler = () => {
    setSelectedValue(prevValue => prevValue.add({ months: 1 }));
  };

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
