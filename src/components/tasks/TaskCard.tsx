import { useEffect, useRef, useState } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';

import DotsLottie from '../DotsLottie';
import checkBoxAnimation from '../../../public/lotties/checkBox.json';
import DropdownOptions from './DropdownOptions';
import type { TaskType } from '../../types';
import { convertNumToMonth } from '../../utils';
import useMutateTasks from '../../hooks/useMutateTasks';
import TaskCardEditor from './TaskCardEditor';

interface Props {
  task: TaskType;
  dragOverlay?: boolean;
}
let timeoutId: NodeJS.Timeout | null = null;

export default function TaskCard({ task, dragOverlay }: Props) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [checked, setChecked] = useState(task.isCompleted);
  const [allowHover, setAllowHover] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const deleteMutaion = useMutateTasks({ method: 'DELETE', url: 'api/tasks' });
  const patchMutation = useMutateTasks({ method: 'PATCH', url: 'api/tasks' });

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    lottieRef.current?.goToAndStop(task.isCompleted ? 29 : 0, true);
    setChecked(task.isCompleted);
  }, [task.isCompleted]);

  const checkBoxClickHandler = () => {
    lottieRef.current?.setDirection(checked ? -1 : 1);
    lottieRef.current?.play();
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      patchMutation.mutate({ ...task, isCompleted: !checked });
    }, 1000);
    setChecked(checked => !checked);
  };

  const deadline = new Date(task.deadline);
  const formattedDeadline =
    deadline.getDate() +
    ' ' +
    convertNumToMonth(deadline.getMonth() + 1).slice(0, 3) +
    ' ' +
    deadline.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

  if (showEditor)
    return (
      <TaskCardEditor
        setShowEditor={setShowEditor}
        listId={task.taskListId}
        type="edit"
        task={task}
      />
    );

  return (
    <article
      className={`bg-transition rounded pl-4 pr-2 py-4 flex flex-col gap-3 shadow-md ${
        allowHover ? 'hover:bg-violetHover dark:hover:bg-neutralHover' : ''
      } ${
        dragOverlay
          ? 'cursor-grabbing bg-violetHover dark:bg-neutralHover'
          : 'cursor-grab'
      }`}
    >
      <div className="flex items-center justify-between">
        <h3
          style={{ backgroundColor: task.tagColor }}
          className={
            'px-2 py-1 text-sm font-medium rounded-full shadow-md text-blackText'
          }
        >
          {task.tagTitle}
        </h3>
        <DropdownOptions
          heading="Card Actions"
          editHandler={() => setShowEditor(true)}
          deleteHandler={() =>
            deleteMutaion.mutate({ id: task.id, taskListId: task.taskListId })
          }
        >
          <DotsLottie size="small" setCardHover={setAllowHover} />
        </DropdownOptions>
      </div>
      <div>
        <h2 className="font-medium text-[15px]">{task.title}</h2>
        <p className="mt-1 text-sm">{task.description}</p>
      </div>
      <div className="flex items-center justify-between pr-2">
        <span className="text-sm text-violet-700 dark:text-violetTextLight">
          {hydrated ? formattedDeadline : ''}
        </span>
        <Lottie
          animationData={checkBoxAnimation}
          loop={false}
          autoplay={false}
          lottieRef={lottieRef}
          onClick={checkBoxClickHandler}
          onMouseEnter={() => setAllowHover(false)}
          onMouseLeave={() => setAllowHover(true)}
          onDOMLoaded={() =>
            lottieRef.current?.goToAndStop(checked ? 29 : 0, true)
          }
          data-no-dnd="true"
          className="transition-transform duration-200 cursor-pointer h-7 hover:scale-110"
        />
      </div>
    </article>
  );
}
