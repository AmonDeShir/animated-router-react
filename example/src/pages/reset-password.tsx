import React from 'react';
import { useOpenPage } from "animated-router-react";
import Text from '../components/text/text';
import Link from '../components/link/link';
import Box from '../components/box/box';
import Textbox from '../components/textbox/textbox';
import Button from '../components/button/button';

const ResetPassword = React.forwardRef<HTMLDivElement>((_, ref) => {
  const openPage = useOpenPage();
  
  return (
    <Box height="250px" ref={ref}>
      <Text>Write your email address below</Text>
      
      <div style={{padding: "10px 20px", width: "100%"}}>
        <Textbox placeholder="mail@example.com" type="email" />
        
        <div style={{display: 'flex', justifyContent:"space-between", paddingTop: "5px"}}>
          <Text size="small" weight="thin">Don't you have an account?</Text>
          <Link to="/register" bold="Click here" text="to <br/> register!" />
        </div>
      </div>

      <Button text="Send" onClick={() => openPage('/log-in', { updateHistory: true })} />
    </Box>
  )
})

export default ResetPassword;