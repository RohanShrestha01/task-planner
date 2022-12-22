import { useQuery } from '@tanstack/react-query';

export const useTaskListsData = () =>
  useQuery({
    queryKey: ['taskLists'],
    queryFn: () => fetch('/api/taskLists').then(res => res.json()),
  });
