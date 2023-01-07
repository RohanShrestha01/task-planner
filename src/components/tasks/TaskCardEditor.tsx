import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useTheme } from 'next-themes';
import { useRef, useEffect, type Dispatch, type SetStateAction } from 'react';
import { getLocalTimeZone, now } from '@internationalized/date';

import { tagAnimation, tagAnimationLight } from '../../icons/AllLotties';
import { assertIsNode } from '../../utils';
import CrossLottie from '../CrossLottie';
import useMutateTasks from '../../hooks/useMutateTasks';
import type { TaskType } from '../../types';

/* prettier-ignore */
const colors = ['#fda4af','#f9a8d4','#f0abfc','#d8b4fe','#c4b5fd','#a5b4fc','#93c5fd','#7dd3fc','#67e8f9','#5eead4','#6ee7b7','#86efac','#bef264','#fde047','#fcd34d','#fdba74','#fca5a5','#cbd5e1'];

interface Props {
  setShowEditor: Dispatch<SetStateAction<boolean>>;
  listId: string;
  task?: TaskType;
  type?: string;
}

export default function TaskCardEditor({
  setShowEditor,
  listId,
  task,
  type = 'add',
}: Props) {
  const tagLottieRef = useRef<LottieRefCurrentProps>(null);
  const { resolvedTheme } = useTheme();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const closeTaskCardEditor = ({ target }: MouseEvent) => {
      assertIsNode(target);
      if (formRef.current?.contains(target)) return;
      setShowEditor(false);
    };

    document.body.addEventListener('mousedown', closeTaskCardEditor);
    return () =>
      document.body.removeEventListener('mousedown', closeTaskCardEditor);
  }, [setShowEditor]);

  const postMutation = useMutateTasks({ url: 'api/tasks', method: 'POST' });
  const patchMutation = useMutateTasks({ url: 'api/tasks', method: 'PATCH' });
  const mutation = type === 'edit' ? patchMutation : postMutation;

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Define types for form values
    const target = e.target as typeof e.target & {
      title: { value: string };
      description: { value: string };
      deadline: { value: string };
      tagTitle: { value: string };
      tagColor: { value: string };
    };
    mutation.mutate({
      title: target.title.value,
      description: target.description.value,
      deadline: new Date(target.deadline.value),
      tagTitle: target.tagTitle.value,
      tagColor: target.tagColor.value,
      taskListId: listId,
      id: type === 'edit' && task ? task.id : '',
      isCompleted: type === 'edit' && task ? task.isCompleted : false,
      onMutateSuccess: () => setShowEditor(false),
    });
  };

  const deadline = task ? new Date(task.deadline) : new Date();
  const minDeadline =
    deadline.getFullYear() +
    '-' +
    (deadline.getMonth() + 1) +
    '-' +
    deadline.getDate() +
    'T' +
    deadline.getHours() +
    ':' +
    deadline.getMinutes();

  return (
    <form
      ref={formRef}
      className={`flex flex-col gap-3 px-4 py-4 mr-4 rounded shadow-md bg-transition w-72 ${
        type === 'add' ? 'mt-4' : ''
      }`}
      onSubmit={submitHandler}
      data-no-dnd="true"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-medium">
          {type === 'edit' ? 'Edit Card' : 'Create New Card'}
        </h2>
        <CrossLottie clickHandler={() => setShowEditor(false)} />
      </div>
      <input
        type="text"
        placeholder="Enter title of task"
        required
        autoFocus
        className="w-full px-2 py-1 rounded input"
        name="title"
        defaultValue={type === 'edit' && task ? task.title : ''}
      />
      <textarea
        rows={2}
        placeholder="Enter description of task"
        required
        className="w-full px-2 py-1 rounded resize-none input"
        name="description"
        defaultValue={type === 'edit' && task ? task.description : ''}
      />
      <div>
        <label htmlFor="deadline" className="mb-1 text-sm font-medium">
          Select Deadline
        </label>
        <input
          id="deadline"
          type="datetime-local"
          name="deadline"
          required
          defaultValue={
            type === 'edit' && task
              ? minDeadline
              : now(getLocalTimeZone()).add({ days: 1 }).toString().slice(0, 16)
          }
          min={
            type === 'edit' && task
              ? minDeadline
              : now(getLocalTimeZone()).toString().slice(0, 16)
          }
          className="w-full px-2 py-1 input"
        />
      </div>
      <div className="relative flex items-center justify-between">
        <Lottie
          animationData={
            resolvedTheme === 'dark' ? tagAnimationLight : tagAnimation
          }
          autoplay={false}
          loop={false}
          lottieRef={tagLottieRef}
          onComplete={() => tagLottieRef.current?.stop()}
          className="absolute h-5 left-1"
        />
        <input
          type="text"
          onClick={() => tagLottieRef.current?.play()}
          placeholder="Enter Tag"
          maxLength={18}
          className="pl-8 py-0.5 input w-44 pr-2"
          required
          onFocus={e => e.target.select()}
          defaultValue={
            type === 'edit' && task ? task.tagTitle : 'Personal Task'
          }
          name="tagTitle"
        />
        <input
          type="color"
          list="presetColors"
          defaultValue={type === 'edit' && task ? task.tagColor : '#93c5fd'}
          className="w-14 bg-inherit"
          name="tagColor"
        />
        <datalist id="presetColors">
          {colors.map((color, i) => (
            <option value={color} key={i} />
          ))}
        </datalist>
      </div>
      <button className="justify-center text-sm rounded btn-primary">
        Done
      </button>
    </form>
  );
}
