import { CalendarDate } from '@internationalized/date';
import { useTaskListsData } from '../../hooks/useQueryTasks';
import { hours } from './WeekView';

interface Props {
  selectedValue: CalendarDate;
}

export default function DayView({ selectedValue }: Props) {
  const { data } = useTaskListsData();
  const tasks = data?.map(taskList => taskList.tasks).flat();
  const tasksOfDay = tasks?.filter(
    task => task.deadline.slice(0, 10) === selectedValue.toString()
  );

  return (
    <table className="w-full text-center">
      <tbody>
        <tr className="h-5"></tr>
        {hours.map((time, i) => (
          <tr key={i} className="h-12">
            <td className="w-16 px-2 text-sm -translate-y-1/2 border-r border-neutral-500 sm:text-[13px] sm:w-14 xs:text-xs xs:px-1 xs:w-11">
              {time}
            </td>
            <td
              className={`border-t border-neutral-500 ${
                i === hours.length - 1 ? 'border-b' : ''
              } text-black p-1 text-left`}
            >
              <div className="flex flex-col gap-1">
                {tasksOfDay?.length !== 0
                  ? tasksOfDay?.map((task, i) =>
                      new Date(task.deadline).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        hour12: true,
                      }) === time ? (
                        <div
                          key={task.id}
                          style={{ backgroundColor: task.tagColor }}
                          className="px-4 py-1 rounded-md sm:px-2"
                          ref={
                            i === 0
                              ? el => el?.scrollIntoView({ behavior: 'smooth' })
                              : null
                          }
                        >
                          <p className="font-medium xs:text-[15px]">
                            {new Date(task.deadline).toLocaleTimeString(
                              'en-US',
                              {
                                hour12: true,
                                hour: 'numeric',
                                minute: 'numeric',
                              }
                            )}
                          </p>
                          <h3 className="font-medium xs:text-[15px]">
                            {task.title}
                          </h3>
                          <p className="text-sm single-line-text">
                            {task.description}
                          </p>
                        </div>
                      ) : null
                    )
                  : null}
              </div>
            </td>
            <td className="w-8 border-l border-neutral-500 sm:w-4 xs:w-2"></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
