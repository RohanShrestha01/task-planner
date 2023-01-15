import { startOfWeek } from '@internationalized/date';

import { type Props } from './MainCalendar';

export const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
/* prettier-ignore */
export const hours = ['12 AM','','1 AM','','2 AM','','3 AM','','4 AM','','5 AM','','6 AM','','7 AM','','8 AM','','9 AM','','10 PM','','11 PM','','12 PM','','1 PM','','2 PM','','3 PM','','4 PM','','5 PM','','6 PM','','7 PM','','8 PM','','9 PM','','10 PM','','11 PM','',];

export default function WeekView({
  selectedValue,
  setSelectedValue,
  setFocusedValue,
}: Props) {
  let date = startOfWeek(selectedValue, 'en-US');
  let daysNum = 0;

  const weekViewHead = days.map((day, i) => {
    date = date.add({ days: daysNum });
    daysNum = 1;

    const dateIndividual = date;

    return (
      <td
        className={`text-lg cursor-pointer py-1 ${
          dateIndividual.compare(selectedValue) === 0
            ? 'select-color'
            : 'hover:bg-violetHover dark:hover:bg-neutralHover'
        }`}
        key={i}
        onClick={() => {
          setSelectedValue(dateIndividual);
          setFocusedValue(dateIndividual);
        }}
      >
        <div className="text-sm md:text-[13px] sm:text-xs xs:text-[10px]">
          {day}
        </div>
        <div className="text-xl font-semibold md:text-lg sm:text-base xs:text-sm">
          {date.day}
        </div>
      </td>
    );
  });

  return (
    <table className="w-full text-center table-fixed">
      <thead className="sticky top-0 z-10 shadow-md bg-transition">
        <tr>
          <td className="w-16 2xl:w-11 xs:w-10"></td>
          {weekViewHead}
          <td className="w-4 2xl:w-2"></td>
        </tr>
      </thead>
      <tbody>
        <tr className="h-5"></tr>
        {hours.map((time, i) => (
          <tr key={i} className="h-12">
            <td className="px-2 text-sm -translate-y-1/2 border-r border-neutral-500 2xl:text-xs 2xl:px-1 xs:text-[11px]">
              {time}
            </td>
            {days.map((_day, j) => (
              <td
                key={j}
                className={`border-t border-neutral-500 ${
                  i === hours.length - 1 ? 'border-b' : ''
                }`}
              ></td>
            ))}
            <td className="border-l border-neutral-500"></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
