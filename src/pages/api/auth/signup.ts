import type { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt';

import { registerSchema } from '../../../utils';
import prisma from '../../../lib/prismadb';
import seedDefaultData from '../../../lib/seedDefaultData';

type Data = {
  message?: string;
};

export default async function signupHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST')
    return res.status(405).json({
      message: 'HTTP method not allowed, only POST method accepted',
    });

  try {
    const signupData = registerSchema.parse(req.body);
    const existingUser = await prisma.user.findFirst({
      where: { email: signupData.email },
    });

    if (existingUser)
      return res.status(409).json({ message: 'User already exists' });

    const hashedPassword = await hash(signupData.password, 12);
    const newUser = await prisma.user.create({
      data: {
        name: signupData.username,
        email: signupData.email,
        password: hashedPassword,
      },
    });
    await seedDefaultData(newUser.id);

    res.status(201).json({ message: 'Account Created Successfully' });
  } catch (err) {
    res.status(422).json({ message: 'Invalid form data' });
  }
}
