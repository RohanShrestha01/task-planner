import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import type { Task } from '../../types';
import SortableTaskCard from './SortableTaskCard';
import AddTask from './AddTask';

interface Props {
  tasks: Task[];
  listId: string;
}

export default function TaskCards({ tasks, listId }: Props) {
  const { setNodeRef } = useDroppable({ id: listId });
  const taskIds = tasks.map(task => task.id);

  return (
    <SortableContext
      items={taskIds}
      id={listId}
      strategy={verticalListSortingStrategy}
    >
      <div className="overflow-hidden hover:overflow-y-auto mt-1.5 pb-1.5">
        <ul className="flex flex-col gap-4 mr-4 w-72" ref={setNodeRef}>
          {tasks.map(task => (
            <SortableTaskCard key={task.id} task={task} />
          ))}
        </ul>
        <AddTask listId={listId} />
      </div>
    </SortableContext>
  );
}
