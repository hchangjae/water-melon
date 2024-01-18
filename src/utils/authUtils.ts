import { GetServerSideProps, GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { AuthOptions } from 'next-auth';
import { getSession, signIn, signOut } from 'next-auth/react';
import NextAuth, { getServerSession } from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/utils/dbUtils';

type Props = { [key: string]: any };
type Options = { onlyAdmin?: boolean; allowAnonymous?: boolean };

export const noop = async <T extends Props>() => ({ props: {} as T });
export const isAdminEmail = (email: string) => email === 'ckdwo3030@gmail.com';

export const withGoogleAuth =
  <T extends Props>(getServerSideProps: GetServerSideProps<T> = noop, options?: Options) =>
  async (context: GetServerSidePropsContext) => {
    const session = await getSession(context);
    const allowAnonymous = options?.allowAnonymous;
    const hash = context.req.cookies.hash;

    /**
     * 익명 사용자 허용 && 익명 사용자 키가 존재할 시
     */
    if (allowAnonymous && hash && !session) {
      const user = await prisma.user.findUnique({ where: { email: hash } });
      if (user) {
        return getServerSideProps(context);
      }
    }

    /**
     * 익명 사용자 허용 && 익명 사용자 키가 존재하지 않을 시
     */
    if (allowAnonymous && !hash && !session) {
      return {
        redirect: {
          destination: `/`,
          permanent: false,
        },
      };
    }

    /**
     * Google Oauth sign-in 여부 확인
     */
    if (!session) {
      return {
        redirect: {
          destination: `/`,
          permanent: false,
        },
      };
    }

    /**
     * 가입 여부 확인
     */
    const email = session.user?.email!;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return {
        redirect: {
          destination: `/`,
          permanent: false,
        },
      };
    }

    /**
     * 관리자 여부 확인
     */
    const isAdmin = isAdminEmail(email);
    const onlyAdmin = options?.onlyAdmin;
    if (onlyAdmin && !isAdmin) {
      return {
        redirect: {
          destination: `/`,
          permanent: false,
        },
      };
    }

    return getServerSideProps(context);
  };

export const withBrowser =
  <T extends Props>(getServerSideProps: GetServerSideProps<T> = noop) =>
  async (context: GetServerSidePropsContext) => {
    const url = context.req.url;
    const host = context.req.headers.host;
    const resolvedUrl = `https://${host}${url}`;
    const userAgent = context.req.headers['user-agent']?.toUpperCase() || '';

    /**
     * 카카오톡 브라우저에서 접속 시 외부 브라우저로 이동
     */
    const isKakaotalk = userAgent.includes('KAKAOTALK');
    const isKakaotalkBot = userAgent.includes('KAKAOTALK-SCRAP');
    if (isKakaotalk && !isKakaotalkBot) {
      return {
        redirect: {
          destination: `kakaotalk://web/openExternal?url=${encodeURIComponent(resolvedUrl)}`,
          permanent: true,
        },
      };
    }

    return getServerSideProps(context);
  };

export const logout = () => signOut({ redirect: false });
export const login = (callbackUrl?: string, change?: boolean) => {
  const signInOption = change ? { prompt: 'consent', access_type: 'offline', response_type: 'code' } : undefined;
  return signIn('google', { callbackUrl }, signInOption);
};

/**
 * Server Side
 *
 */
const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export const getServerSessionWithAuth = (request: NextApiRequest, response: NextApiResponse) => getServerSession(request, response, authOptions);

export const NextAuthApp = NextAuth(authOptions);
