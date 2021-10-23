import React from 'react';
import { useOpenPage } from "animated-router-react";
import Text from '../components/text/text';
import Link from '../components/link/link';
import Box from '../components/box/box';
import Textbox from '../components/textbox/textbox';
import Button from '../components/button/button';

const LogIn = React.forwardRef<HTMLDivElement>((_, ref) => {
  const openPage = useOpenPage();
  
  return (
    <Box height="340px" ref={ref}>
      <Text>Write your email and password below</Text>
      
      <div style={{padding: "10px 20px", width: "100%"}}>
        <Textbox placeholder="mail@example.com" />

        <div style={{display: 'flex', justifyContent:"space-evenly", paddingTop: "5px"}}>
          <Text size="small" weight="thin">You don’t have account?</Text>
          <Link to="/register" bold="Click here" text="to <br/> register!" />
        </div>
      </div>

      <div style={{padding: "10px 20px", width: "100%"}}>
        <Textbox placeholder="••••••••" type="password" />
        
        <div style={{display: 'flex', justifyContent:"space-between", paddingTop: "5px"}}>
          <Text size="small" weight="thin">Do you forgot your password?</Text>
          <Link to="/reset-password" bold="Click here" text="to <br/> reset it!" />
        </div>

      </div>

      <Button text="Log in" onClick={() => openPage('/', { updateHistory: true })} />
    </Box>
  )
})

export default LogIn;