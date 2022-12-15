import { useQuery } from '@tanstack/react-query';

import TaskCard from './TaskCard';
import type { Task } from '../../types';

export default function TaskCards({ index }: { index: number }) {
  const { data } = useQuery({
    queryKey: ['taskLists'],
    queryFn: () => fetch('/api/taskLists').then(res => res.json()),
  });

  const tasks = data[index].tasks as Task[];

  return (
    <div className="flex flex-col gap-4 mr-2 w-72">
      {tasks.map((task, i) => (
        <TaskCard key={i} task={task} />
      ))}
    </div>
  );
}
