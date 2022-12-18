import { useRef, useState } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';

import DotsLottie from '../DotsLottie';
import checkBoxAnimation from '../../../public/lotties/checkBox.json';
import DropdownOptions from './DropdownOptions';
import type { Task } from '../../types';
import { convertNumToMonth } from '../../utils';
import useMutateTasks from '../../hooks/useMutateTasks';
import TaskCardEditor from './TaskCardEditor';

interface Props {
  task: Task;
  listId: string;
}

export default function TaskCard({ task, listId }: Props) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [checked, setChecked] = useState(task.isCompleted);
  const [allowHover, setAllowHover] = useState(true);
  const [showEditor, setShowEditor] = useState(false);

  const deleteMutaion = useMutateTasks({ method: 'DELETE', url: 'api/tasks' });
  const patchMutation = useMutateTasks({ method: 'PATCH', url: 'api/tasks' });

  const checkBoxClickHandler = () => {
    if (checked) {
      lottieRef.current?.setDirection(-1);
      setChecked(false);
      patchMutation.mutate({ ...task, isCompleted: false });
    } else {
      lottieRef.current?.setDirection(1);
      setChecked(true);
      patchMutation.mutate({ ...task, isCompleted: true });
    }
    lottieRef.current?.play();
  };

  const deadline = new Date(task.deadline);
  const formattedDeadline =
    deadline.getDate() +
    ' ' +
    convertNumToMonth(deadline.getMonth()).slice(0, 3) +
    ' ' +
    deadline.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

  if (showEditor)
    return (
      <TaskCardEditor
        setShowEditor={setShowEditor}
        listId={listId}
        type="edit"
        task={task}
      />
    );

  return (
    <article
      className={`bg-transition cursor-pointer rounded pl-4 pr-2 py-4 flex flex-col gap-3 shadow-md ${
        allowHover && 'hover:bg-violetHover dark:hover:bg-neutralHover'
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
            deleteMutaion.mutate({ id: task.id, taskListId: listId })
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
          {formattedDeadline}
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
            checked === true && lottieRef.current?.goToAndStop(29, true)
          }
          className="transition-transform duration-200 h-7 hover:scale-110"
        />
      </div>
    </article>
  );
}
