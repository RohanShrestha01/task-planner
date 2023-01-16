import * as Tabs from '@radix-ui/react-tabs';
import { useRef, useState } from 'react';
import { type Dispatch, type SetStateAction } from 'react';
import {
  type CalendarDate,
  getLocalTimeZone,
  today,
} from '@internationalized/date';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';

import CalendarHeader from './CalendarHeader';
import DayView from './DayView';
import WeekView from './WeekView';
import MonthView from './MonthView';
import todayAnimation from '../../../public/lotties/today.json';

export interface Props {
  selectedValue: CalendarDate;
  setSelectedValue: Dispatch<SetStateAction<CalendarDate>>;
  setFocusedValue: Dispatch<SetStateAction<CalendarDate>>;
}

export default function MainCalendar(props: Props) {
  const [viewValue, setViewValue] = useState('month');

  const tabs = [
    { trigger: 'Day', value: 'day', View: DayView },
    { trigger: 'Week', value: 'week', View: WeekView },
    { trigger: 'Month', value: 'month', View: MonthView },
  ];

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const todayClickHandler = () => {
    lottieRef.current?.play();
    const todayDate = today(getLocalTimeZone());
    props.setSelectedValue(todayDate);
    props.setFocusedValue(todayDate);
  };

  return (
    <Tabs.Root value={viewValue} onValueChange={setViewValue}>
      <section className="flex items-center justify-between xs:justify-center">
        <CalendarHeader {...props} viewValue={viewValue} />
        <Tabs.List className="flex rounded shadow-md bg-transition">
          {tabs.map(({ trigger, value }, i) => (
            <Tabs.Trigger
              value={value}
              key={i}
              className="data-[state=active]:bg-primary data-[state=active]:hover:bg-primaryHover dark:data-[state=active]:bg-primaryDark dark:data-[state=active]:hover:bg-primaryHover data-[state=active]:text-whiteText hover:bg-violetHover dark:hover:bg-neutralHover px-8 py-2 rounded xl:px-6 md:px-4 md:text-sm sm:text-xs"
            >
              {trigger}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <button
          className="rounded shadow-md btn-primary md:text-sm sm:hidden"
          onClick={todayClickHandler}
        >
          <Lottie
            animationData={todayAnimation}
            autoplay={false}
            loop={false}
            lottieRef={lottieRef}
            onComplete={() => lottieRef.current?.stop()}
            className="h-6 md:h-5"
          />
          <span>Today</span>
        </button>
      </section>
      <section className="mt-4 overflow-y-auto h-[calc(100vh-145px)] md:h-[calc(100vh-141px)] sm:h-[calc(100vh-137px)] rounded bg-transition shadow-md">
        {tabs.map(({ value, View }, i) => (
          <Tabs.Content value={value} key={i} className="h-full">
            <View {...props} />
          </Tabs.Content>
        ))}
      </section>
    </Tabs.Root>
  );
}
