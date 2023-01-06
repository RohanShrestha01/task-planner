import { useState } from 'react';
import type { InferGetServerSidePropsType } from 'next';
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
  MeasuringStrategy,
  closestCenter,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import { useQueryClient } from '@tanstack/react-query';

import type { TaskType, TaskListType } from '../types';
import { KeyboardSensor, PointerSensor } from '../lib/dndKitSensors';
import { useTaskListsData } from '../hooks/useQueryTasks';
import TaskCard from '../components/tasks/TaskCard';
import TaskList from '../components/tasks/TaskList';
import AddButton from '../components/AddButton';
import AddList from '../components/tasks/AddList';
import getServerSideProps from '../lib/serverProps';
import { moveBetweenLists } from '../utils';

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [showBtn, setShowBtn] = useState(true);
  const [activeCard, setActiveCard] = useState<TaskType | null>(null);

  const queryClient = useQueryClient();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { data } = useTaskListsData();
  if (!data)
    return (
      <h1 className="text-lg font-medium">
        Error fetching data from the database. Please try again later.
      </h1>
    );

  const handleDragStart = (e: DragStartEvent) =>
    setActiveCard(e.active.data.current?.task);

  // Fires if a drag operation is cancelled (eg: if user preses 'esc' while dragging)
  const handleDragCancel = () => setActiveCard(null);

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const activeListId = active.data.current?.sortable.containerId;
    const overListId = over?.data.current?.sortable.containerId || over?.id;

    if (activeListId === overListId || !overListId) return;

    const taskList = data.find(list => list.id === over.id);
    const activeIndex = active.data.current?.sortable.index as number;
    const overIndex = taskList
      ? taskList.tasks.length + 1
      : (over.data.current?.sortable.index as number);

    queryClient.setQueryData<TaskListType[]>(['taskLists'], oldData => {
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

    queryClient.setQueryData<TaskListType[]>(['taskLists'], oldData => {
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

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
    >
      <main className="flex gap-10 mx-auto py-8 h-[calc(100vh-56px)] w-[calc(100vw-96px)] overflow-y-auto">
        {data.map((taskList, i) => (
          <TaskList taskList={taskList} key={i} />
        ))}
        {showBtn ? (
          <AddButton
            className="self-start rounded shadow-md w-72 btn-primary shrink-0"
            lottieColor="white"
            text="Add another list"
            textStyle="font-medium"
            clickHandler={() => setShowBtn(false)}
          />
        ) : (
          <AddList setShowBtn={setShowBtn} />
        )}
      </main>
      <DragOverlay>
        {activeCard ? <TaskCard task={activeCard} dragOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}

export { getServerSideProps };
