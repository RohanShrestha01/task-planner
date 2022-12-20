import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  url: string;
  method: 'POST' | 'PATCH' | 'DELETE';
}

export default function useMutateTasks({ url, method }: Props) {
  const queryClient = useQueryClient();

  const updateTaskList = (oldData: any, newData: any) => {
    if (method === 'POST') return [...oldData, newData];
    else if (method === 'PATCH')
      return oldData.map((taskList: any) =>
        taskList.id === newData.id
          ? { ...taskList, heading: newData.heading }
          : taskList
      );
    else if (method === 'DELETE')
      return oldData.filter((taskList: any) => taskList.id !== newData.id);
  };

  const updateTask = (oldData: any, newData: any) => {
    if (method === 'POST')
      return oldData.map((taskList: any) =>
        taskList.id === newData.taskListId
          ? { ...taskList, tasks: [...taskList.tasks, newData] }
          : taskList
      );
    else if (method === 'PATCH')
      return oldData.map((taskList: any) =>
        taskList.id === newData.taskListId
          ? {
              ...taskList,
              tasks: taskList.tasks.map((task: any) =>
                task.id === newData.id ? newData : task
              ),
            }
          : taskList
      );
    else if (method === 'DELETE')
      return oldData.map((taskList: any) =>
        taskList.id === newData.taskListId
          ? {
              ...taskList,
              tasks: taskList.tasks.filter(
                (task: any) => task.id !== newData.id
              ),
            }
          : taskList
      );
  };

  const updateData = url === 'api/taskLists' ? updateTaskList : updateTask;

  return useMutation({
    mutationFn: (body: any) =>
      fetch(url, {
        method,
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }),
    onMutate: async newData => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['taskLists'] });
      // Snapshot the previous value
      const previousTaskLists = queryClient.getQueryData(['taskLists']);
      // Optimistically update to the new value
      await queryClient.setQueryData(['taskLists'], (oldData: any) =>
        updateData(oldData, newData)
      );
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
      queryClient.setQueryData(['taskLists'], () =>
        updateData(context?.previousTaskLists, responseData)
      );
    },
  });
}
