import prisma from './prismadb';

export default async function seedDefaultData(id: string) {
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 1);
  const tagColor = '#93c5fd';

  const defaultData = [
    {
      heading: 'To Do',
      task: {
        title: 'Support Small Screens',
        description:
          'Make website responsive for mobiles, tablets and other small screens',
        tagTitle: 'Support',
        tagColor,
        deadline,
      },
    },
    {
      heading: 'Doing',
      task: {
        title: 'Add Animations',
        description:
          'Animate dropdowns, modals, cards, page etc using Framer Motion',
        tagTitle: 'UX/UI Design',
        tagColor,
        deadline,
      },
    },
    {
      heading: 'In Review',
      task: {
        title: 'Calendar Features',
        description:
          'Improve user experience in the calendar page by adding features',
        tagTitle: 'Features',
        tagColor,
        deadline,
      },
    },
  ];

  await prisma.user.update({
    where: { id },
    data: {
      taskLists: {
        create: defaultData.map(({ heading, task }) => ({
          heading,
          tasks: { create: { userId: id, ...task } },
        })),
      },
    },
  });
}
