import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

type Props = {
  session: Session;
  children: ReactNode;
};
const NextAuthRegistry = (props: Props) => {
  const { session, children } = props;

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default NextAuthRegistry;
