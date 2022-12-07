import { useCalendarGrid } from '@react-aria/calendar';
import { getWeeksInMonth } from '@internationalized/date';
import { type CalendarState } from '@react-stately/calendar';

import CalendarCell from './CalendarCell';

interface Props {
  state: CalendarState;
}

export default function CalendarGrid({ state, ...props }: Props) {
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, 'en-US');

  return (
    <table {...gridProps}>
      <thead
        {...headerProps}
        className="text-violetText dark:text-violetTextLight"
      >
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
