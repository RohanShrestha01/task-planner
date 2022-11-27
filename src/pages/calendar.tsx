import { useState } from 'react';
import { today, getLocalTimeZone } from '@internationalized/date';

import MonthCalendar from '../components/calendar/MonthCalendar';
import CreateTaskButton from '../components/calendar/CreateTaskButton';
import CalendarPageHeader from '../components/calendar/CalendarPageHeader';

export default function CalendarPage() {
  const [value, setValue] = useState(today(getLocalTimeZone()));

  return (
    <main className="py-8 px-6 flex gap-12">
      <aside className="flex-grow">
        <CalendarPageHeader selectedValue={value} setSelectedValue={setValue} />
        <section></section>
      </aside>
      <aside className="flex flex-col gap-8">
        <MonthCalendar
          aria-label="Event date"
          value={value}
          onChange={setValue}
        />
        <CreateTaskButton />
      </aside>
    </main>
  );
}
