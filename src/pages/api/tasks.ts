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

  if (req.method === 'POST') {
    const createdTask = await prisma.task.create({
      data: { userId: id, ...req.body.task },
    });

    res.status(200).json(createdTask);
  }
}
