import type { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { QueryClient, dehydrate } from '@tanstack/react-query';

import { authOptions } from '../pages/api/auth/[...nextauth]';
import createGuestUser from './createGuestUser';
import prisma from './prismadb';

const getServerSideProps: GetServerSideProps = async context => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  let id = session?.user?.id || context.req.cookies['guestUserId'] || '';

  if (!context.req.cookies['guestUserId'] && !session)
    id = await createGuestUser(context.res);

  const getTaskLists = async () => {
    const taskLists = await prisma.taskList.findMany({
      where: { userId: id },
      include: { tasks: { orderBy: { orderIndex: 'asc' } } },
    });
    return JSON.parse(JSON.stringify(taskLists));
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['taskLists'], getTaskLists);

  return {
    props: { session, dehydratedState: dehydrate(queryClient) },
  };
};

export default getServerSideProps;
