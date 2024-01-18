import Background from '@/components/Background';
import withTitle from '@/components/withTitle';
import { withBrowser } from '@/utils/authUtils';
import styled from 'styled-components';

const GamePage = () => {
  return (
    <Wrapper>
      hello world
      <Background color={'#fcfcfc'} />
    </Wrapper>
  );
};

export default withTitle('Game')(GamePage);

// export const getServerSideProps = withBrowser(withGoogleAuth(noop, { allowAnonymous: true }));
export const getServerSideProps = withBrowser();

const Wrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media (min-width: 768px) {
    max-width: 768px;
    max-height: 1024px;
    border-radius: 20px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
  }
`;
