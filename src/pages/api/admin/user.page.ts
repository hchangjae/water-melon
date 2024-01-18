import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/dbUtils';
import { User } from '@prisma/client';
import { handleMethod, withGoogleAuth } from '@/utils/serverUtils';

const get = async (request: NextApiRequest, response: NextApiResponse) => {
  const users = await prisma.user.findMany();

  return response.status(200).json(users);
};

export type GetAdminUserRequest = null;
export type GetAdminUserResponse = User[];

export default withGoogleAuth(handleMethod({ get }), { onlyAdmin: true });
