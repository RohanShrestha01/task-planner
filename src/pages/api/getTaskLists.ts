import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';

import prisma from '../../lib/prismadb';
import { authOptions } from './auth/[...nextauth]';

export default async function getTaskLists(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET')
    return res.status(405).json({
      message: 'HTTP method not allowed, only GET method accepted',
    });

  const session = await unstable_getServerSession(req, res, authOptions);
  const id = session?.user?.id || req.cookies.guestUserId || '';

  const taskLists = await prisma.taskList.findMany({
    where: { userId: id },
    include: { tasks: true },
  });

  res.status(200).json(taskLists);
}
