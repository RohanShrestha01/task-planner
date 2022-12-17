import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';

import prisma from '../../lib/prismadb';
import { authOptions } from './auth/[...nextauth]';

export default async function taskListsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const id = session?.user?.id || req.cookies.guestUserId || '';

  // Handles GET requests
  if (req.method === 'GET') {
    const taskLists = await prisma.taskList.findMany({
      where: { userId: id },
      include: { tasks: true },
    });

    res.status(200).json(taskLists);
  }

  // Handles POST requests
  else if (req.method === 'POST') {
    const createdTaskList = await prisma.taskList.create({
      data: { heading: req.body.heading, userId: id },
      include: { tasks: true },
    });

    res.status(200).json(createdTaskList);
  }

  // Handles UPDATE requests
  else if (req.method === 'PATCH') {
    const updatedTaskList = await prisma.taskList.update({
      where: { id: req.body.id },
      data: { heading: req.body.heading },
    });

    res.status(200).json(updatedTaskList);
  }

  // Handles DELETE requests
  else if (req.method === 'DELETE') {
    const deletedTaskList = await prisma.taskList.delete({
      where: { id: req.body.id },
    });

    res.status(200).json(deletedTaskList);
  }
}
