import { useState } from 'react';
import { today, getLocalTimeZone } from '@internationalized/date';
import MonthCalendar from '../components/calendar/MonthCalendar';

export default function CalendarPage() {
  const [value, setValue] = useState(today(getLocalTimeZone()));

  return (
    <main>
      <MonthCalendar
        aria-label="Event date"
        value={value}
        onChange={setValue}
      />
    </main>
  );
}
