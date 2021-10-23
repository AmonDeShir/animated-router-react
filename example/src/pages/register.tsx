import React from 'react';
import { useOpenPage } from "animated-router-react";
import Text from '../components/text/text';
import Link from '../components/link/link';
import Box from '../components/box/box';
import Textbox from '../components/textbox/textbox';
import Button from '../components/button/button';

const Register = React.forwardRef<HTMLDivElement>((_, ref) => {
  const openPage = useOpenPage();
  
  return (
    <Box height="450px" ref={ref}>
      <Text>Write your name, email and password below</Text>
      
      <div style={{padding: "0 20px", width: "100%"}}>
        <Textbox placeholder="Name" />
      </div>

      <div style={{padding: "0 20px", width: "100%"}}>
        <Textbox placeholder="Email" />
        
        <div style={{display: 'flex', justifyContent:"space-evenly", paddingTop: "5px"}}>
          <Text size="small" weight="thin">Do you have an account?</Text>
          <Link to="/log-in" bold="Click here" text="to <br/> log in!" />
        </div>
      </div>

      <div style={{padding: "0 20px", width: "100%"}}>
        <Textbox placeholder="••••••••" type="password" />
      </div>

      <div style={{padding: "0 20px", width: "100%"}}>
        <div style={{display: 'flex', justifyContent:"space-evenly", paddingBottom: "5px"}}>
          <Text size="small" weight="thin">Repeat password below</Text>
        </div>
        
        <Textbox placeholder="••••••••" type="password" />
      </div>

      <Button text="Register" onClick={() => openPage('/', { updateHistory: true })} />
    </Box>
  )
})

export default Register;