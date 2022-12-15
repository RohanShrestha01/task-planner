import type { IncomingMessage, ServerResponse } from 'http';
import cuid from 'cuid';
import cookie from 'cookie';

import prisma from './prismadb';
import seedDefaultData from './seedDefaultData';

export default async function createGuestUser(
  res: ServerResponse<IncomingMessage>
) {
  const id = cuid();
  await prisma.user.create({ data: { id, name: 'Guest' } });
  await seedDefaultData(id);

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('guestUserId', id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 365 * 2, // will default to 400 days
      path: '/',
    })
  );

  return id;
}
