import DotsLottie from '../DotsLottie';
import TaskCards from './TaskCards';
import AddTask from './AddTask';

export default function TaskList() {
  const headings = ['To Do', 'Doing', 'In Review'];

  return (
    <>
      {headings.map((heading, i) => (
        <section className="flex flex-col w-[304px]" key={i}>
          <div className="flex items-center h-10 pr-4">
            <h2 className="flex-grow text-lg font-semibold cursor-pointer">
              {heading}
            </h2>
            <DotsLottie />
          </div>
          <div className="flex-grow overflow-y-auto mt-1.5">
            <TaskCards />
            <AddTask />
          </div>
        </section>
      ))}
    </>
  );
}
