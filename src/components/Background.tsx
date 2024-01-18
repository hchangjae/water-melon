import Head from 'next/head';

type Props = {
  color: string;
};

const Background = (props: Props) => {
  const { color } = props;
  return (
    <Head>
      <meta name="theme-color" content={color} />
      <style>{`
        :root {
          background-color: ${color};
          transition: background-color 200ms ease-in-out;
        }
      `}</style>
    </Head>
  );
};

export default Background;
