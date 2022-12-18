import { useState } from 'react';

import AddButton from '../AddButton';
import AddTaskCard from './AddTaskCard';

export default function AddTask({ listId }: { listId: string }) {
  const [showBtn, setShowBtn] = useState(true);

  return showBtn ? (
    <AddButton
      className="mt-4 rounded w-72 btn-text"
      lottieColor="black"
      text="Add new task"
      textStyle="text-sm"
      clickHandler={() => setShowBtn(false)}
    />
  ) : (
    <AddTaskCard setShowBtn={setShowBtn} listId={listId} />
  );
}
