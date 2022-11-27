import { Dispatch, SetStateAction, useRef } from 'react';
import { LottieRefCurrentProps } from 'lottie-react';
import { CalendarDate } from '@internationalized/date';

import ChevronLottie from '../ChevronLottie';
import PlusLottie from '../PlusLottie';
import { convertNumToMonth } from '../../utils';

interface Props {
  selectedValue: CalendarDate;
  setSelectedValue: Dispatch<SetStateAction<CalendarDate>>;
}

export default function CalendarPageHeader({
  selectedValue,
  setSelectedValue,
}: Props) {
  const plusLottieRef = useRef<LottieRefCurrentProps>(null);

  const selectedMonth = convertNumToMonth(selectedValue.month);

  const chevronLeftClickHandler = () => {
    setSelectedValue(prevValue => prevValue.subtract({ months: 1 }));
  };
  const chevronRightClickHandler = () => {
    setSelectedValue(prevValue => prevValue.add({ months: 1 }));
  };

  return (
    <section className="flex items-center justify-between">
      <div className="flex justify-between basis-[300px]">
        <h2 className="font-bold text-xl">{`${selectedMonth} ${selectedValue.day}, ${selectedValue.year}`}</h2>
        <div className="flex gap-2">
          <ChevronLottie type="left" clickHandler={chevronLeftClickHandler} />
          <ChevronLottie type="right" clickHandler={chevronRightClickHandler} />
        </div>
      </div>
      <button
        onMouseEnter={() => plusLottieRef.current?.play()}
        className="px-4 py-2 flex items-center gap-2 rounded bg-violet-500 hover:bg-violet-600 dark:bg-violet-700 dark:hover:bg-violet-600 text-whiteText"
      >
        <span>Add</span>
        <PlusLottie
          lottieRef={plusLottieRef}
          className="h-4 self-center stroke-white fill-white"
        />
      </button>
    </section>
  );
}
