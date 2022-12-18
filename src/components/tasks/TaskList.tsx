import { useQuery } from '@tanstack/react-query';

import TaskCards from './TaskCards';
import AddTask from './AddTask';
import ListHeading from './ListHeading';

export default function TaskList() {
  const { data } = useQuery({
    queryKey: ['taskLists'],
    queryFn: () => fetch('/api/taskLists').then(res => res.json()),
  });

  const headings = data.map(
    ({ heading }: { heading: string }) => heading
  ) as string[];

  return (
    <>
      {headings.map((heading, i) => (
        <section className="flex flex-col w-[304px]" key={i}>
          <ListHeading heading={heading} listId={data[i].id} />
          <div className="flex-grow overflow-hidden hover:overflow-y-auto mt-1.5 pb-1.5">
            <TaskCards tasks={data[i].tasks} listId={data[i].id} />
            <AddTask listId={data[i].id} />
          </div>
        </section>
      ))}
    </>
  );
}
