import prisma from './prismadb';

const getDate = (num: number) => {
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + num);
  return deadline;
};

const defaultData = [
  {
    heading: 'To Do',
    task: {
      title: 'Support Small Screens',
      description: 'Make website responsive for mobile and other small screens',
      tagTitle: 'Support',
      tagColor: '#86efac',
      deadline: getDate(3),
    },
  },
  {
    heading: 'Doing',
    task: {
      title: 'Add Animations',
      description: 'Animate dropdowns, modals, page etc using Framer Motion',
      tagTitle: 'UX/UI Design',
      tagColor: '#93c5fd',
      deadline: getDate(2),
    },
  },
  {
    heading: 'In Review',
    task: {
      title: 'Calendar Features',
      description:
        'Improve user experience in calendar page by adding features',
      tagTitle: 'Features',
      tagColor: '#f9a8d4',
      deadline: getDate(1),
    },
  },
];

export default async function seedDefaultData(id: string) {
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
