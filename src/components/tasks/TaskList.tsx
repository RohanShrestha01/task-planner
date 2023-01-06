import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import type { TaskListType } from '../../types';
import ListHeading from './ListHeading';
import AddTask from './AddTask';
import SortableTaskCard from './SortableTaskCard';

export default function TaskList({ taskList }: { taskList: TaskListType }) {
  const { heading, id, tasks } = taskList;
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext
      items={tasks}
      id={id}
      strategy={verticalListSortingStrategy}
    >
      <section className="flex flex-col w-[304px]" ref={setNodeRef}>
        <ListHeading heading={heading} listId={id} />
        <div className="overflow-hidden hover:overflow-y-auto mt-1.5 pb-1.5">
          <ul className="flex flex-col gap-4 mr-4 w-72">
            {tasks.map(task => (
              <SortableTaskCard key={task.id} task={task} />
            ))}
          </ul>
          <AddTask listId={id} />
        </div>
      </section>
    </SortableContext>
  );
}
