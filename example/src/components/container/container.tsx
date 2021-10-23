import React from "react";
import "./container.css";

type Props = React.PropsWithChildren<{}>;

const Container = React.forwardRef<HTMLDivElement, Props>(({children}, ref) => (
  <div className="container" ref={ref}>
    {children}
  </div>
))

export default Container;