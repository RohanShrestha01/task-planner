import {
  type CalendarDate,
  getWeeksInMonth,
  startOfWeek,
  startOfMonth,
} from '@internationalized/date';
import { days } from './WeekView';

interface Props {
  selectedValue: CalendarDate;
}

export default function MonthView({ selectedValue }: Props) {
  const weeksInMonth = getWeeksInMonth(selectedValue, 'en-US');
  let date = startOfWeek(startOfMonth(selectedValue), 'en-US');
  let daysNum = 0;

  const monthViewBody = [...Array(weeksInMonth)].map((_, i) => (
    <tr key={i}>
      {days.map((_, i) => {
        date = date.add({ days: daysNum });
        daysNum = 1;

        return (
          <td
            key={i}
            className="px-2 py-1 border border-b-0 border-neutral-500"
          >
            {date.day}
          </td>
        );
      })}
    </tr>
  ));

  return (
    <table className="w-full h-full table-fixed">
      <thead className="text-center">
        <tr>
          {days.map((day, i) => (
            <td key={i} className="py-2 font-medium">
              {day}
            </td>
          ))}
        </tr>
      </thead>
      <tbody className="align-top">{monthViewBody}</tbody>
    </table>
  );
}
