import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { TaskType, TaskListType } from '../types';

interface Props {
  url: string;
  method: 'POST' | 'PATCH' | 'DELETE';
}

interface Body extends Partial<TaskType> {
  heading?: string;
  tasks?: TaskType[];
  onMutateSuccess?: () => void;
}

export default function useMutateTasks({ url, method }: Props) {
  const queryClient = useQueryClient();

  const updateTaskList = (oldData: TaskListType[], newData: Body) => {
    if (method === 'POST') return [...oldData, newData] as TaskListType[];
    else if (method === 'PATCH')
      return oldData.map(taskList =>
        taskList.id === newData.id
          ? { ...taskList, heading: newData.heading }
          : taskList
      ) as TaskListType[];
    else return oldData.filter(taskList => taskList.id !== newData.id);
  };

  const updateTask = (oldData: TaskListType[], newData: Body) => {
    if (method === 'POST')
      return oldData.map(taskList =>
        taskList.id === newData.taskListId
          ? { ...taskList, tasks: [...taskList.tasks, newData] as TaskType[] }
          : taskList
      );
    else if (method === 'PATCH')
      return oldData.map(taskList =>
        taskList.id === newData.taskListId
          ? {
              ...taskList,
              tasks: taskList.tasks.map(task =>
                task.id === newData.id ? newData : task
              ) as TaskType[],
            }
          : taskList
      );
    else
      return oldData.map(taskList =>
        taskList.id === newData.taskListId
          ? {
              ...taskList,
              tasks: taskList.tasks.filter(task => task.id !== newData.id),
            }
          : taskList
      );
  };

  const updateData = url === 'api/taskLists' ? updateTaskList : updateTask;

  return useMutation({
    mutationFn: (body: Body) =>
      fetch(url, {
        method,
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }),
    onMutate: async newData => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['taskLists'] });
      // Snapshot the previous value
      const previousTaskLists = queryClient.getQueryData<TaskListType[]>([
        'taskLists',
      ]);
      // Optimistically update to the new value
      queryClient.setQueryData<TaskListType[]>(['taskLists'], oldData => {
        if (oldData) return updateData(oldData, newData);
      });
      if (newData.onMutateSuccess) newData.onMutateSuccess();
      // Return a context object with the snapshotted value
      return { previousTaskLists };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (_err, _newData, context) => {
      queryClient.setQueryData(['taskLists'], context?.previousTaskLists);
    },
    // Update with the response data sent from API (To update the id and other fields)
    onSettled: async (data, _err, _var, context) => {
      const responseData = await data?.json();
      queryClient.setQueryData(['taskLists'], () => {
        if (context?.previousTaskLists)
          return updateData(context.previousTaskLists, responseData);
      });
    },
  });
}
