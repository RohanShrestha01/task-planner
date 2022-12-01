import * as Tabs from '@radix-ui/react-tabs';
import { useRef, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

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
  const [viewValue, setViewValue] = useState('day');

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
      <section className="flex items-center justify-between">
        <CalendarHeader {...props} viewValue={viewValue} />
        <Tabs.List className="flex rounded bg-transition">
          {tabs.map(({ trigger, value }, i) => (
            <Tabs.Trigger
              value={value}
              key={i}
              className="data-[state=active]:bg-primary data-[state=active]:hover:bg-primaryHover dark:data-[state=active]:bg-primaryDark dark:data-[state=active]:hover:bg-primaryHover data-[state=active]:text-whiteText hover:bg-violetHover dark:hover:bg-neutralHover px-8 py-2 rounded"
            >
              {trigger}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <button className="rounded btn-primary" onClick={todayClickHandler}>
          <Lottie
            animationData={todayAnimation}
            autoplay={false}
            loop={false}
            lottieRef={lottieRef}
            onComplete={() => lottieRef.current?.stop()}
            className="h-6"
          />
          <span>Today</span>
        </button>
      </section>
      <section className="mt-4 overflow-y-auto h-[calc(100vh-145px)] rounded bg-transition">
        {tabs.map(({ value, View }, i) => (
          <Tabs.Content value={value} key={i}>
            <View {...props} />
          </Tabs.Content>
        ))}
      </section>
    </Tabs.Root>
  );
}
