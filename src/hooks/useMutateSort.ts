import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { TaskListType } from '../types';

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
      queryClient.setQueryData<TaskListType[]>(['taskLists'], oldData =>
        oldData?.map(taskList =>
          taskList.id === listId
            ? { ...taskList, tasks: sortedTasks }
            : taskList
        )
      );
    },
  });
}
