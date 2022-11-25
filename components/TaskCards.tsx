import TaskCard from './TaskCard';

export default function TaskCards() {
  return (
    <div className="mt-1.5 flex flex-col gap-4">
      <TaskCard />
      <TaskCard />
    </div>
  );
}
