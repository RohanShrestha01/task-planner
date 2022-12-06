import TaskCards from './TaskCards';
import AddTask from './AddTask';
import ListHeading from './ListHeading';
import { useState } from 'react';

export default function TaskList() {
  const [headings, setHeadings] = useState(['To Do', 'Doing', 'In Review']);

  return (
    <>
      {headings.map((heading, i) => (
        <section className="flex flex-col w-[304px]" key={i}>
          <ListHeading heading={heading} />
          <div className="flex-grow overflow-hidden hover:overflow-y-auto mt-1.5 pb-1.5">
            <TaskCards />
            <AddTask />
          </div>
        </section>
      ))}
    </>
  );
}
