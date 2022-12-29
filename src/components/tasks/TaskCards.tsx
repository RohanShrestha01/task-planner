import { useDroppable } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';

import type { Task } from '../../types';
import SortableTaskCard from './SortableTaskCard';

interface Props {
  tasks: Task[];
  listId: string;
}

export default function TaskCards({ tasks, listId }: Props) {
  const { setNodeRef } = useDroppable({ id: listId });

  return (
    <SortableContext items={tasks} id={listId}>
      <ul className="flex flex-col gap-4 mr-4 w-72" ref={setNodeRef}>
        {tasks.map(task => (
          <SortableTaskCard key={task.id} task={task} />
        ))}
      </ul>
    </SortableContext>
  );
}
