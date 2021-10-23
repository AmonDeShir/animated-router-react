import React from 'react';
import Link from '../components/link/link';
import Container from '../components/container/container';

const Main = React.forwardRef<HTMLDivElement>((_, ref) => (
  <Container ref={ref}>
    <h1 style={{color: "var(--secondary-color)", fontSize: "40px", height: "40%"}}>
      Congratulations!
    </h1>
    <Link to="/log-in" bold="Click here" text="to <br/> log out!" />
  </Container>
))

export default Main;