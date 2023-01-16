import {
  type CalendarDate,
  getWeeksInMonth,
  startOfWeek,
  startOfMonth,
} from '@internationalized/date';
import { days } from './WeekView';
import { useTaskListsData } from '../../hooks/useQueryTasks';

interface Props {
  selectedValue: CalendarDate;
}

export default function MonthView({ selectedValue }: Props) {
  const { data } = useTaskListsData();
  const tasks = data?.map(taskList => taskList.tasks).flat();
  const tasksOfMonth = tasks?.filter(
    task => task.deadline.slice(0, 7) === selectedValue.toString().slice(0, 7)
  );

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
            className="px-2 py-1 border border-b-0 border-neutral-500 sm:px-1 xs:px-0"
          >
            <ul className="flex flex-col gap-1">
              <li
                className={`self-start rounded-full px-2 py-1 ${
                  date.compare(selectedValue) === 0 ? 'select-color' : ''
                } sm:self-center`}
              >
                {date.day}
              </li>
              {tasksOfMonth?.length !== 0
                ? tasksOfMonth?.map(task =>
                    task.deadline.slice(0, 10) === date.toString() ? (
                      <li
                        key={task.id}
                        style={{ backgroundColor: task.tagColor }}
                        className="px-1 text-xs font-medium text-black rounded-sm single-line-text md:text-[11px] sm:text-[10px] xs:text-[9px]"
                      >
                        {task.title}
                      </li>
                    ) : null
                  )
                : null}
            </ul>
          </td>
        );
      })}
    </tr>
  ));

  return (
    <table className="w-full h-full table-fixed md:text-sm sm:text-xs">
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
