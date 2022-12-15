import { useState } from 'react';
import type { InferGetServerSidePropsType } from 'next';

import TaskList from '../components/tasks/TaskList';
import AddButton from '../components/AddButton';
import AddList from '../components/tasks/AddList';
import getServerSideProps from '../lib/serverProps';

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [showBtn, setShowBtn] = useState(true);

  return (
    <main className="flex gap-10 px-12 py-8 h-[calc(100vh-56px)]">
      <TaskList />
      {showBtn ? (
        <AddButton
          className="self-start rounded shadow-md w-72 btn-primary"
          lottieColor="white"
          text="Add another list"
          textStyle="font-medium"
          clickHandler={() => setShowBtn(false)}
        />
      ) : (
        <AddList setShowBtn={setShowBtn} />
      )}
    </main>
  );
}

export { getServerSideProps };
