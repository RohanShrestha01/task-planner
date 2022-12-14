import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth/next';

import TaskList from '../components/tasks/TaskList';
import AddButton from '../components/AddButton';
import AddList from '../components/tasks/AddList';
import { authOptions } from './api/auth/[...nextauth]';

export default function Home() {
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

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  return { props: { session } };
};
