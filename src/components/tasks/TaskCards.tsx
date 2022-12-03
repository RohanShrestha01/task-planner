import TaskCard from './TaskCard';

export default function TaskCards() {
  return (
    <div className="flex flex-col gap-4 mr-2 w-72">
      <TaskCard />
      <TaskCard />
    </div>
  );
}
