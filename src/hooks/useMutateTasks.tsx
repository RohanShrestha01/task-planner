import { useMutation, useQueryClient } from '@tanstack/react-query';

type Props = {
  url: string;
  queryKey: string[];
  method: 'POST' | 'PATCH' | 'DELETE';
};

export default function useMutateTasks({ url, method, queryKey }: Props) {
  const queryClient = useQueryClient();

  const updateData = (oldData: any, newData: any) => {
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

  return useMutation({
    mutationFn: (body: any) =>
      fetch(url, {
        method,
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }),
    onMutate: async newTaskList => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey });
      // Snapshot the previous value
      const previousTaskLists = queryClient.getQueryData(queryKey);
      // Optimistically update to the new value
      queryClient.setQueryData(queryKey, (oldTaskLists: any) =>
        updateData(oldTaskLists, newTaskList)
      );
      if (newTaskList.onMutateSuccess) newTaskList.onMutateSuccess();
      // Return a context object with the snapshotted value
      return { previousTaskLists };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (_err, _newTaskList, context) => {
      queryClient.setQueryData(queryKey, context?.previousTaskLists);
    },
    // Update with the response data sent from API (To update the id and other fields)
    onSettled: async (data, _err, _var, context) => {
      const responseData = await data?.json();
      queryClient.setQueryData(queryKey, () =>
        updateData(context?.previousTaskLists, responseData)
      );
    },
  });
}
