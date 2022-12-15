import { useState } from 'react';
import { today, getLocalTimeZone } from '@internationalized/date';
import type { InferGetServerSidePropsType } from 'next';

import MonthCalendar from '../components/calendar/MonthCalendar';
import MainCalendar from '../components/calendar/MainCalendar';
import AddButton from '../components/AddButton';
import getServerSideProps from '../lib/serverProps';

export default function CalendarPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
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
          className="justify-center rounded-full shadow-md btn-primary"
          lottieColor="white"
          text="Create Task"
          textStyle="font-medium"
          clickHandler={() => {}}
        />
      </aside>
    </main>
  );
}

export { getServerSideProps };
