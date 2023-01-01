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
  MeasuringStrategy,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import { useQueryClient } from '@tanstack/react-query';

import TaskCards from './TaskCards';
import ListHeading from './ListHeading';
import { useTaskListsData } from '../../hooks/useQueryTasks';
import type { Task, TaskList } from '../../types';
import TaskCard from './TaskCard';
import { KeyboardSensor, PointerSensor } from '../../lib/dndKitSensors';
import { moveBetweenLists } from '../../utils';

export default function TaskList() {
  const { data } = useTaskListsData();
  const [activeCard, setActiveCard] = useState<Task | null>(null);

  const queryClient = useQueryClient();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  if (!data)
    return (
      <h1 className="text-lg font-medium">
        Error fetching data from the database. Please try again later.
      </h1>
    );

  const handleDragStart = (e: DragStartEvent) =>
    setActiveCard(e.active.data.current?.task);

  /* Fires if a drag operation is cancelled (eg: if user preses 'esc' while dragging) */
  const handleDragCancel = () => setActiveCard(null);

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id;
    if (!overId) return;

    const activeListId = active.data.current?.sortable.containerId;
    const overListId = over.data.current?.sortable.containerId || overId;

    if (activeListId === overListId) return;

    const taskList = data.find(list => list.id === overId);
    const activeIndex = active.data.current?.sortable.index as number;
    const overIndex = taskList
      ? taskList.tasks.length + 1
      : (over.data.current?.sortable.index as number);

    queryClient.setQueryData<TaskList[]>(['taskLists'], oldData => {
      if (oldData)
        return moveBetweenLists(
          oldData,
          activeListId,
          activeIndex,
          overListId,
          overIndex,
          active.data.current?.task
        );
    });
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) {
      setActiveCard(null);
      return;
    }
    const activeListId = active.data.current?.sortable.containerId;
    const overListId = over.data.current?.sortable.containerId || over.id;

    const taskList = data.find(list => list.id === over.id);
    const activeIndex = active.data.current?.sortable.index as number;
    const overIndex = taskList
      ? taskList.tasks.length + 1
      : (over.data.current?.sortable.index as number);

    queryClient.setQueryData<TaskList[]>(['taskLists'], oldData => {
      if (!oldData) return;

      if (activeListId === overListId)
        return oldData.map(taskList => {
          if (taskList.id === activeListId)
            return {
              ...taskList,
              tasks: arrayMove(taskList.tasks, activeIndex, overIndex),
            };
          else return taskList;
        });
      else
        return moveBetweenLists(
          oldData,
          activeListId,
          activeIndex,
          overListId,
          overIndex,
          active.data.current?.task
        );
    });
    setActiveCard(null);
  };

  const headings = data.map(({ heading }) => heading);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
    >
      {headings.map((heading, i) => (
        <section className="flex flex-col w-[304px]" key={i}>
          <ListHeading heading={heading} listId={data[i].id} />
          <TaskCards tasks={data[i].tasks} listId={data[i].id} />
        </section>
      ))}
      <DragOverlay>
        {activeCard ? <TaskCard task={activeCard} dragOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}
