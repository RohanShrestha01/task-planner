import AddTaskButton from './AddTaskButton';
import DotsLottie from './DotsLottie';
import TaskCards from './TaskCards';

export default function TaskList() {
  const headings = ['To Do', 'Doing', 'Needs Review'];

  return (
    <>
      {headings.map((heading, i) => (
        <section className="flex flex-col w-72" key={i}>
          <div className="flex items-center flex-grow h-10">
            <h2 className="font-semibold text-lg flex-grow cursor-pointer">
              {heading}
            </h2>
            <DotsLottie />
          </div>
          <TaskCards />
          <AddTaskButton />
        </section>
      ))}
    </>
  );
}
