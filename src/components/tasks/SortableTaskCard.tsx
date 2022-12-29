import { useSortable } from '@dnd-kit/sortable';

import type { Task } from '../../types';
import TaskCard from './TaskCard';

export default function SortableTaskCard({ task }: { task: Task }) {
  const {
    setNodeRef,
    listeners,
    attributes,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { task } });

  const cardStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  return (
    <li style={cardStyle} ref={setNodeRef} {...listeners} {...attributes}>
      <TaskCard task={task} />
    </li>
  );
}
