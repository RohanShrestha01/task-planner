import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import TaskCards from './TaskCards';
import AddTask from './AddTask';
import ListHeading from './ListHeading';
import { useTaskListsData } from '../../hooks/useQueryTasks';
import type { Task } from '../../types';
import TaskCard from './TaskCard';
import { KeyboardSensor, PointerSensor } from '../../lib/dndKitSensors';

export default function TaskList() {
  const { data } = useTaskListsData();
  const [activeCard, setActiveCard] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (e: DragStartEvent) =>
    setActiveCard(e.active.data.current?.task);

  /* Fires if a drag operation is cancelled (eg: if user preses 'esc' while dragging) */
  const handleDragCancel = () => setActiveCard(null);

  const handleDragOver = ({ active, over }: DragOverEvent) => {};

  const handleDragEnd = (e: DragEndEvent) => {
    console.log('end', e);
    setActiveCard(null);
  };

  const headings = data.map(
    ({ heading }: { heading: string }) => heading
  ) as string[];

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {headings.map((heading, i) => (
        <section className="flex flex-col w-[304px]" key={i}>
          <ListHeading heading={heading} listId={data[i].id} />
          <div className="flex-grow overflow-hidden hover:overflow-y-auto mt-1.5 pb-1.5">
            <TaskCards tasks={data[i].tasks} listId={data[i].id} />
            <AddTask listId={data[i].id} />
          </div>
        </section>
      ))}
      <DragOverlay>
        {activeCard ? <TaskCard task={activeCard} dragOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}
