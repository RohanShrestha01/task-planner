import {
  useSortable,
  defaultAnimateLayoutChanges,
  type AnimateLayoutChanges,
} from '@dnd-kit/sortable';

import type { TaskType } from '../../types';
import TaskCard from './TaskCard';

const animateLayoutChanges: AnimateLayoutChanges = args => {
  const { isSorting, wasDragging } = args;
  if (isSorting || wasDragging) return defaultAnimateLayoutChanges(args);
  return true;
};

export default function SortableTaskCard({ task }: { task: TaskType }) {
  const {
    setNodeRef,
    listeners,
    attributes,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { task }, animateLayoutChanges });

  const cardStyle = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      style={cardStyle}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="touch-none"
    >
      <TaskCard task={task} />
    </li>
  );
}
