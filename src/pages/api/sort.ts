import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prismadb';

export default async function sortHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PATCH')
    return res.status(405).json({
      message: 'HTTP method not allowed, only PATCH method accepted',
    });

  const sortedTasks = await prisma.task.findMany({
    where: { taskListId: req.body.listId },
    orderBy: { [req.body.sortBy]: req.body.sortOrder },
  });

  await prisma.taskList.update({
    where: { id: req.body.listId },
    data: { sortBy: req.body.sortBy, sortOrder: req.body.sortOrder },
  });

  sortedTasks.forEach(async (task, i) => {
    await prisma.task.update({
      where: { id: task.id },
      data: { orderIndex: i },
    });
  });

  res.status(200).json(sortedTasks);
}
