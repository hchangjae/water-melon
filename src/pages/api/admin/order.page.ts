import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/dbUtils';
import { Prisma } from '@prisma/client';
import { handleMethod, withGoogleAuth } from '@/utils/serverUtils';

const get = async (request: NextApiRequest, response: NextApiResponse) => {
  const orders = (
    await prisma.order.findMany({
      include: {
        user: true,
      },
    })
  ).map((v) => ({ ...v, dollar: Number(v.dollar), user: { ...v.user, dollar: Number(v.user.dollar), fee: Number(v.user.fee) } }));

  return response.status(200).json(orders);
};

export type GetAdminOrderRequest = null;
export type GetAdminOrderResponse = Prisma.OrderGetPayload<{ include: { user: true } }>[];

export default withGoogleAuth(handleMethod({ get }), { onlyAdmin: true });
