import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Body {
  sortBy: string;
  sortOrder: string;
  listId: string;
}

export default function useMutateSort() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Body) =>
      fetch('api/sort', {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }),
    onSuccess: async (data, { listId }) => {
      const sortedTasks = await data.json();
      queryClient.setQueryData(['taskLists'], (oldData: any) =>
        oldData.map((taskList: any) =>
          taskList.id === listId
            ? { ...taskList, tasks: sortedTasks }
            : taskList
        )
      );
    },
  });
}
