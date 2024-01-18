import React from 'react';
import Head from 'next/head';

type Props = { [key: string]: any };

const withTitle =
  (_title: string) =>
  <T extends Props>(Component: React.ComponentType<T>) => {
    const title = `White daisy echo - ${_title}`;
    const ComponentWithTitle = (props: T) => (
      <React.Fragment>
        <Head>{title && <title>{title}</title>}</Head>
        <Component {...props} />
      </React.Fragment>
    );

    return ComponentWithTitle;
  };

export default withTitle;
