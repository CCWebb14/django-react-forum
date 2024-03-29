import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  /* flex-direction:  */
  justify-content: space-between;
  border-radius: 25px;
  border: 1px solid transparent;
  box-shadow: 9.91px 9.91px 15px #1c2532, -9.91px -9.91px 15px #222d3c;
  background: linear-gradient(145deg, #1a232f, #242f3f);
  color: white;
  padding: 20px 20px;
  margin: 25px 0px;
  text-decoration: none;
  :hover {
    border: 1px solid #3882f6;
  }
`;

export const Text = styled.div`
  h1 {
    font-size: var(--fontSuperBig);
  }

  p {
    font-size: var(--fontMed);
  }
`;

export const Image = styled.img`
  height: 250px;
  width: 250px;
`;
