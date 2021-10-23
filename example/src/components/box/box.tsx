import React from "react";
import "./box.css";

type Props = React.PropsWithChildren<{
  height: string;
}>;

const Box = React.forwardRef<HTMLDivElement, Props>(({children, height}, ref) => (
  <div className="box" ref={ref} style={{ height }}>
    {children}
  </div>
))

export default Box;