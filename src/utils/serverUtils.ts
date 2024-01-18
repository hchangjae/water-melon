import { getServerSessionWithAuth, isAdminEmail } from '@/utils/authUtils';
import { NextApiRequest, NextApiResponse } from 'next';

type Options = { onlyAdmin?: boolean };
type ApiHandlerProps = {
  get?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
  post?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
  put?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
  delete?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
};

export const handleMethod = (props: ApiHandlerProps) => async (req: NextApiRequest, res: NextApiResponse) => {
  const handler = props?.[req.method?.toLowerCase() as keyof ApiHandlerProps];

  if (!handler) return res.status(405).json({ error: 'Method not allowed' });

  try {
    await handler(req, res);
    res.end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

export const withGoogleAuth =
  (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>, options?: Options) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSessionWithAuth(req, res);

    if (!session) {
      return res.status(401).json({ error: '인증 정보가 없습니다. 구글 계정으로 로그인해주세요.' });
    }

    const email = session.user?.email!;
    if (!email) {
      return res.status(401).json({ error: '이메일 정보가 없습니다. 구글 계정으로 로그인해주세요.' });
    }

    const isAdmin = isAdminEmail(email);
    const onlyAdmin = options?.onlyAdmin;
    if (onlyAdmin && !isAdmin) {
      return res.status(401).json({ error: '관리자만 접근 가능합니다.' });
    }

    return handler(req, res);
  };
