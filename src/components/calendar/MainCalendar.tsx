import * as Tabs from '@radix-ui/react-tabs';
import { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { CalendarDate } from '@internationalized/date';

import AddButton from '../AddButton';
import CalendarHeader from './CalendarHeader';
import DayView from './DayView';
import WeekView from './WeekView';
import MonthView from './MonthView';

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
        <AddButton
          className="flex-row-reverse rounded btn-primary"
          lottieColor="white"
          text="Add"
        />
      </section>
      <section className="mt-4">
        {tabs.map(({ value, View }, i) => (
          <Tabs.Content value={value} key={i}>
            <View {...props} />
          </Tabs.Content>
        ))}
      </section>
    </Tabs.Root>
  );
}
