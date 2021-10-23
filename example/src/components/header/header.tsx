import React from "react";
import "./header.css";

const Header = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div className="header" ref={ref}>
    <div className="background"></div>
    <div className="bar"></div>
  </div>
));

export default Header;