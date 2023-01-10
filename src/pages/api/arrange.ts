import type { NextApiRequest, NextApiResponse } from 'next';
import type { TaskType } from '../../types';
import prisma from '../../lib/prismadb';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    overListId: string;
    task: TaskType;
    updatedTasks: TaskType[];
  };
}

interface ResponseData {
  message: string;
}

export default async function arrangeHandler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'PATCH')
    return res.status(405).json({
      message: 'HTTP method not allowed, only PATCH method accepted',
    });

  const { overListId, task, updatedTasks } = req.body;
  await prisma.task.update({
    where: { id: task.id },
    data: { taskListId: overListId },
  });

  updatedTasks.forEach(async (task, i) => {
    await prisma.task.update({
      where: { id: task.id },
      data: { orderIndex: i },
    });
  });

  return res.status(200).json({ message: 'Successfully moved task' });
}
