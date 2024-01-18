import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/dbUtils';
import { User } from '@prisma/client';
import { handleMethod } from '@/utils/serverUtils';
import { getServerSessionWithAuth } from '@/utils/authUtils';
import { addSeconds } from 'date-fns';
import { v4 as uuid } from 'uuid';

const get = async (request: NextApiRequest, response: NextApiResponse) => {
  const session = await getServerSessionWithAuth(request, response);
  const hash = request.cookies.hash;

  const email = session?.user?.email || hash;
  if (!email) return response.status(200).json(null);

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) return response.status(200).json(null);

  return response.status(200).json(user);
};

export type GetUserMeRequest = null;
export type GetUserMeResponse = User | null;

const post = async (request: NextApiRequest, response: NextApiResponse) => {
  const { nick } = request.body as PostUserMeRequest['body'];
  const session = await getServerSessionWithAuth(request, response);

  if (!nick) return response.status(400).json({ message: 'Please enter your nickname' });
  if (nick.length > 9) return response.status(400).json({ message: 'Nickname must be less than 10 characters' });

  let email = session?.user?.email;
  const name = session?.user?.name || 'Anonymous';

  if (!email) {
    email = uuid();
    response.setHeader('Set-Cookie', `hash=${email}; path=/; expires=${addSeconds(new Date(), 60 * 60 * 24 * 365).toUTCString()};`);
  }

  const isUserExist = await prisma.user.findUnique({ where: { email } });
  if (isUserExist) return response.status(400).json({ message: 'User is already exist' });

  const isNickExist = await prisma.user.findUnique({ where: { nick } });
  if (isNickExist) return response.status(400).json({ message: `"${nick}" is already exist ` });

  const user = await prisma.user.create({ data: { email, name, nick } });

  return response.status(200).json(user);
};

export type PostUserMeRequest = { body: { nick: string } };
export type PostUserMeResponse = User;

export default handleMethod({ get, post });
