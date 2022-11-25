import TaskList from '../components/TaskList';
import AddListButton from '../components/AddListButton';

export default function Home() {
  return (
    <main className="py-8 flex justify-around">
      <TaskList />
      <AddListButton />
    </main>
  );
}
