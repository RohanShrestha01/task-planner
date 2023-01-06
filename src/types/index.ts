export interface TaskType {
  id: string;
  title: string;
  description: string;
  deadline: string;
  tagTitle: string;
  tagColor: string;
  isCompleted: boolean;
  orderIndex: number;
  taskListId: string;
  userId: string;
}

export interface TaskListType {
  id: string;
  heading: string;
  sortBy: string;
  sortOrder: string;
  tasks: TaskType[];
  userId: string;
}
