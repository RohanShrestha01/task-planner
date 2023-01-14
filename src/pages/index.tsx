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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import type { TaskType, TaskListType } from '../types';
import { KeyboardSensor, PointerSensor } from '../lib/dndKitSensors';
import { useTaskListsData } from '../hooks/useQueryTasks';
import TaskCard from '../components/tasks/TaskCard';
import TaskList from '../components/tasks/TaskList';
import AddButton from '../components/AddButton';
import AddList from '../components/tasks/AddList';
import getServerSideProps from '../lib/serverProps';
import { moveBetweenLists } from '../utils';
import Error from '../components/Error';
import { useToast } from '../contexts/ToastContext';

interface Body {
  overListId: string;
  task: TaskType;
  updatedTasks: TaskType[];
}

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [showBtn, setShowBtn] = useState(true);
  const [activeCard, setActiveCard] = useState<TaskType | null>(null);

  const queryClient = useQueryClient();
  const [animationParent] = useAutoAnimate<HTMLElement>();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const mutation = useMutation({
    mutationFn: (body: Body) =>
      fetch('/api/arrange', {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }),
  });
  const { updateToast } = useToast();

  const { data } = useTaskListsData();
  if (!data) return <Error />;

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

    // Update the state of the taskLists query
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
    setActiveCard(null);
    if (!over) return;

    const activeListId = active.data.current?.sortable.containerId;
    const overListId = over.data.current?.sortable.containerId || over.id;

    const taskList = data.find(list => list.id === over.id);
    const activeIndex = active.data.current?.sortable.index as number;
    const overIndex = taskList
      ? taskList.tasks.length + 1
      : (over.data.current?.sortable.index as number);

    // Update the state of the taskLists query
    if (active.id !== over.id)
      queryClient.setQueryData<TaskListType[]>(['taskLists'], oldData => {
        if (!oldData) return;

        if (activeListId !== overListId) return oldData;

        return oldData.map(taskList => {
          if (taskList.id !== activeListId) return taskList;

          return {
            ...taskList,
            tasks: arrayMove(taskList.tasks, activeIndex, overIndex),
          };
        });
      });

    // Update the database
    const newData = queryClient.getQueryData<TaskListType[]>(['taskLists']);
    const updatedTasks = newData?.find(list => list.id === overListId)?.tasks;
    if (updatedTasks) {
      mutation.mutate({
        overListId,
        task: active.data.current?.task,
        updatedTasks,
      });
      updateToast('Task Moved Successfully', 'info');
    }
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
      id="0"
    >
      <main
        className="flex gap-10 px-12 py-8 h-[calc(100vh-56px)] overflow-x-auto overflow-y-hidden 2xl:px-8 2xl:gap-6 xl:px-6 xl:gap-4"
        ref={animationParent}
      >
        {data.map((taskList, i) => (
          <TaskList taskList={taskList} key={i} />
        ))}
        {showBtn ? (
          <AddButton
            className="self-start rounded shadow-md w-72 btn-primary shrink-0 2xl:w-[272px] xl:w-56"
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
