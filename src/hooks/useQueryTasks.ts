import { useQuery } from '@tanstack/react-query';
import type { TaskListType } from '../types';

export const useTaskListsData = () =>
  useQuery<TaskListType[]>({
    queryKey: ['taskLists'],
    queryFn: () => fetch('/api/taskLists').then(res => res.json()),
    refetchOnMount: false,
  });
