import { useState } from 'react';

import AddButton from '../AddButton';
import TaskCardEditor from './TaskCardEditor';

export default function AddTask({ listId }: { listId: string }) {
  const [showEditor, setShowEditor] = useState(false);

  return showEditor ? (
    <TaskCardEditor setShowEditor={setShowEditor} listId={listId} />
  ) : (
    <AddButton
      className="mt-4 mr-4 rounded w-72 btn-text 2xl:w-[272px] xl:w-56"
      lottieColor="black"
      text="Add new task"
      textStyle="text-sm"
      clickHandler={() => setShowEditor(true)}
    />
  );
}
