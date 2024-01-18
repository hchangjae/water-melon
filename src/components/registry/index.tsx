import NextAuthRegistry from '@/components/registry/NextAuthRegistry';
import ReactContextRegistry from '@/components/registry/ReactContextRegistry';
import ReactQueryRegistry from '@/components/registry/ReactQueryRegistry';
import React from 'react';

type Props = Parameters<typeof ReactQueryRegistry>[0] & Parameters<typeof NextAuthRegistry>[0];

const Registry = (props: Props) => {
  const { children, session } = props;
  return (
    <ReactContextRegistry>
      <ReactQueryRegistry>
        <NextAuthRegistry session={session}>
          {/* For lint */}
          {children}
        </NextAuthRegistry>
      </ReactQueryRegistry>
    </ReactContextRegistry>
  );
};

export default Registry;
