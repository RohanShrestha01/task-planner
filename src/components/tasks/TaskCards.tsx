import TaskCard from './TaskCard';
import type { Task } from '../../types';

interface Props {
  tasks: Task[];
  listId: string;
}

export default function TaskCards({ tasks, listId }: Props) {
  return (
    <div className="flex flex-col gap-4 w-72">
      {tasks.map((task, i) => (
        <TaskCard key={i} task={task} listId={listId} />
      ))}
    </div>
  );
}
