import { useQuery } from '@tanstack/react-query';
import type { TaskList } from '../types';

export const useTaskListsData = () =>
  useQuery<TaskList[]>({
    queryKey: ['taskLists'],
    queryFn: () => fetch('/api/taskLists').then(res => res.json()),
    refetchOnMount: false,
  });
