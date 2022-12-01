import { useState } from 'react';
import { today, getLocalTimeZone } from '@internationalized/date';

import MonthCalendar from '../components/calendar/MonthCalendar';
import MainCalendar from '../components/calendar/MainCalendar';
import AddButton from '../components/AddButton';

export default function CalendarPage() {
  const [value, setValue] = useState(today(getLocalTimeZone()));
  const [focusedValue, setFocusedValue] = useState(today(getLocalTimeZone()));

  return (
    <main className="flex gap-12 px-6 pt-8">
      <aside className="flex-grow">
        <MainCalendar
          selectedValue={value}
          setSelectedValue={setValue}
          setFocusedValue={setFocusedValue}
        />
      </aside>
      <aside className="flex flex-col gap-8">
        <MonthCalendar
          aria-label="Event date"
          value={value}
          onChange={setValue}
          focusedValue={focusedValue}
          onFocusChange={setFocusedValue}
        />
        <AddButton
          className="justify-center rounded-full btn-primary"
          lottieColor="white"
          text="Create Task"
          textStyle="font-medium"
        />
      </aside>
    </main>
  );
}
