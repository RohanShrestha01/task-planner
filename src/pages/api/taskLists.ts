import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';

import prisma from '../../lib/prismadb';
import { authOptions } from './auth/[...nextauth]';

export default async function taskLists(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const id = session?.user?.id || req.cookies.guestUserId || '';

  if (req.method === 'GET') {
    const taskLists = await prisma.taskList.findMany({
      where: { userId: id },
      include: { tasks: true },
    });

    res.status(200).json(taskLists);
  } else if (req.method === 'POST') {
    await prisma.taskList.create({ data: { heading: req.body, userId: id } });
    res.status(200).json({ message: 'Task list created' });
  }
}
