import Image from 'next/image';
import styled from 'styled-components';

type Props = {
  onClick: () => void;
};

const GoogleButton = (props: Props) => {
  const { onClick } = props;

  return (
    <Wrapper onClick={onClick}>
      <Image src="/images/google.png" alt="google" width={20} height={20} />
      <Text>Sign in</Text>
    </Wrapper>
  );
};

export default GoogleButton;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  padding: 0.5rem 0.75rem 0.5rem 0.5rem;
  border-radius: 2rem;
  border: 1px solid #ddd;

  & > * + * {
    margin-left: 0.5rem;
  }
`;

const Text = styled.div`
  flex-shrink: 0;
  font-size: 1rem;
`;
