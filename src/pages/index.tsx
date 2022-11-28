import TaskList from '../components/tasks/TaskList';
import AddButton from '../components/AddButton';

export default function Home() {
  return (
    <main className="flex gap-10 px-12 py-8">
      <TaskList />
      <AddButton
        className="self-start w-64 rounded btn-primary"
        lottieColor="white"
        text="Add another list"
        textStyle="font-medium"
      />
    </main>
  );
}
