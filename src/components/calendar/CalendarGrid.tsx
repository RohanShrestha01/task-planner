import { useCalendarGrid } from '@react-aria/calendar';
import { getWeeksInMonth } from '@internationalized/date';
import { useLocale } from '@react-aria/i18n';
import { CalendarState } from '@react-stately/calendar';

import CalendarCell from './CalendarCell';

interface Props {
  state: CalendarState;
}

export default function CalendarGrid({ state, ...props }: Props) {
  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <table {...gridProps} id="calendar-table">
      <thead {...headerProps} className="text-violet-600 dark:text-violet-400">
        <tr>
          {weekDays.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map(weekIndex => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell key={i} state={state} date={date} />
                ) : (
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
