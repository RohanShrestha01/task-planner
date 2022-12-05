import { useState } from 'react';

import AddButton from '../AddButton';
import AddTaskCard from './AddTaskCard';

export default function AddTask() {
  const [showBtn, setShowBtn] = useState(true);

  return showBtn ? (
    <AddButton
      className="w-[calc(100%-16px)] mt-4 mr-2 rounded btn-text"
      lottieColor="black"
      text="Add new task"
      textStyle="text-sm"
      clickHandler={() => setShowBtn(false)}
    />
  ) : (
    <AddTaskCard setShowBtn={setShowBtn} />
  );
}
