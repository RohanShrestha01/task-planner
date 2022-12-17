import TaskCard from './TaskCard';
import type { Task } from '../../types';

export default function TaskCards({ tasks }: { tasks: Task[] }) {
  return (
    <div className="flex flex-col gap-4 mr-2 w-72">
      {tasks.map((task, i) => (
        <TaskCard key={i} task={task} />
      ))}
    </div>
  );
}
