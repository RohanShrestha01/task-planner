import { useState } from 'react';
import { today, getLocalTimeZone } from '@internationalized/date';
import type { InferGetServerSidePropsType } from 'next';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import MonthCalendar from '../components/calendar/MonthCalendar';
import MainCalendar from '../components/calendar/MainCalendar';
import AddButton from '../components/AddButton';
import getServerSideProps from '../lib/serverProps';
import TaskCardEditor from '../components/tasks/TaskCardEditor';
import { useTaskListsData } from '../hooks/useQueryTasks';
import Error from '../components/Error';

export default function CalendarPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [value, setValue] = useState(today(getLocalTimeZone()));
  const [focusedValue, setFocusedValue] = useState(today(getLocalTimeZone()));
  const [showEditor, setShowEditor] = useState(false);

  const [animationParent] = useAutoAnimate<HTMLElement>();
  const { data } = useTaskListsData();

  if (!data) return <Error />;

  return (
    <main className="flex gap-12 px-6 pt-8">
      <aside className="flex-grow">
        <MainCalendar
          selectedValue={value}
          setSelectedValue={setValue}
          setFocusedValue={setFocusedValue}
        />
      </aside>
      <aside className="flex flex-col gap-8" ref={animationParent}>
        <MonthCalendar
          aria-label="Event date"
          value={value}
          onChange={setValue}
          focusedValue={focusedValue}
          onFocusChange={setFocusedValue}
        />
        {showEditor ? (
          <TaskCardEditor
            setShowEditor={setShowEditor}
            listId={data[0].id}
            type="addCalendar"
          />
        ) : (
          <AddButton
            className="justify-center rounded-full shadow-md btn-primary"
            lottieColor="white"
            text="Create Task"
            textStyle="font-medium"
            clickHandler={() => setShowEditor(true)}
          />
        )}
      </aside>
    </main>
  );
}

export { getServerSideProps };
