export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  tagTitle: string;
  tagColor: string;
  isCompleted: boolean;
  taskListId: string;
}

export interface TaskList {
  id: string;
  heading: string;
  tasks: Task[];
  userId: string;
}
