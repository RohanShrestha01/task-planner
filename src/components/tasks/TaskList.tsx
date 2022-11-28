import AddButton from '../AddButton';
import DotsLottie from '../DotsLottie';
import TaskCards from './TaskCards';

export default function TaskList() {
  const headings = ['To Do', 'Doing', 'Needs Review'];

  return (
    <>
      {headings.map((heading, i) => (
        <section className="flex flex-col w-72" key={i}>
          <div className="flex items-center flex-grow h-10">
            <h2 className="flex-grow text-lg font-semibold cursor-pointer">
              {heading}
            </h2>
            <DotsLottie />
          </div>
          <TaskCards />
          <AddButton
            className="mt-4 rounded btn-text"
            lottieColor="black"
            text="Add new task"
            textStyle="text-sm"
          />
        </section>
      ))}
    </>
  );
}
