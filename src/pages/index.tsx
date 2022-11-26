import TaskList from '../components/tasks/TaskList';
import AddListButton from '../components/tasks/AddListButton';

export default function Home() {
  return (
    <main className="py-8 px-12 flex gap-10">
      <TaskList />
      <AddListButton />
    </main>
  );
}
