import { z } from 'zod';
import type { Task, TaskList } from './types';

export const convertNumToMonth = (num: number) => {
  switch (num) {
    case 1:
      return 'January';
    case 2:
      return 'February';
    case 3:
      return 'March';
    case 4:
      return 'April';
    case 5:
      return 'May';
    case 6:
      return 'June';
    case 7:
      return 'July';
    case 8:
      return 'August';
    case 9:
      return 'September';
    case 10:
      return 'October';
    case 11:
      return 'November';
    case 12:
      return 'December';
    default:
      return 'Invalid Month';
  }
};

export function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !('nodeType' in e)) {
    throw new Error(`Node expected`);
  }
}

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = loginSchema
  .extend({
    username: z.string().trim().min(1).max(32),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password and Confirm Password must match',
        path: ['password'],
      });
      ctx.addIssue({
        code: 'custom',
        message: 'Password and Confirm Password must match',
        path: ['confirmPassword'],
      });
    }
  });

export type FlattenedErrors = z.inferFlattenedErrors<typeof registerSchema>;

export const moveBetweenLists = (
  taskLists: TaskList[],
  activeListId: string,
  activeIndex: number,
  overListId: string,
  overIndex: number,
  task: Task
) =>
  taskLists.map(taskList => {
    if (taskList.id === activeListId)
      return {
        ...taskList,
        tasks: [
          ...taskList.tasks.slice(0, activeIndex),
          ...taskList.tasks.slice(activeIndex + 1),
        ],
      };
    else if (taskList.id === overListId)
      return {
        ...taskList,
        tasks: [
          ...taskList.tasks.slice(0, overIndex),
          task,
          ...taskList.tasks.slice(overIndex),
        ],
      };
    else return taskList;
  });
