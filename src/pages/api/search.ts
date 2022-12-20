import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';

import prisma from '../../lib/prismadb';
import { authOptions } from './auth/[...nextauth]';

export default async function searchHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const id = session?.user?.id || req.cookies.guestUserId || '';
  const searchQuery = req.query.query as string;

  if (req.method !== 'GET')
    return res.status(405).json({
      message: 'HTTP method not allowed, only GET method accepted',
    });

  const searchResults = await prisma.task.findMany({
    where: {
      userId: id,
      OR: [
        { title: { contains: searchQuery } },
        { description: { contains: searchQuery } },
      ],
    },
  });

  res.status(200).json(searchResults);
}
