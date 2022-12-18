import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';

import prisma from '../../lib/prismadb';
import { authOptions } from './auth/[...nextauth]';

export default async function tasksHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const id = session?.user?.id || req.cookies.guestUserId || '';

  // Handles POST requests
  if (req.method === 'POST') {
    const createdTask = await prisma.task.create({
      data: {
        userId: id,
        taskListId: req.body.taskListId,
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline,
        tagTitle: req.body.tagTitle,
        tagColor: req.body.tagColor,
      },
    });

    res.status(200).json(createdTask);
  }

  // Handles UPDATE requests
  else if (req.method === 'PATCH') {
    const updatedTask = await prisma.task.update({
      where: { id: req.body.id },
      data: {
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline,
        tagTitle: req.body.tagTitle,
        tagColor: req.body.tagColor,
        isCompleted: req.body.isCompleted,
      },
    });

    res.status(200).json(updatedTask);
  }

  // Handles DELETE requests
  else if (req.method === 'DELETE') {
    const deletedTask = await prisma.task.delete({
      where: { id: req.body.id },
    });

    res.status(200).json(deletedTask);
  }
}
