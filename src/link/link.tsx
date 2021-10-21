import React, { useContext, CSSProperties, PropsWithChildren } from 'react';
import { NavigationContext } from '../reducer/context/navigation-context';

type Props = PropsWithChildren<{
  to: string;
  className?: string;
  style?: CSSProperties;
}>;

const Link = ({ children, className, style, to }: Props) => {
  const { dispatch } = useContext(NavigationContext);

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch({ type: 'SELECT', payload: to });
  };

  return (
    <a href={to} onClick={handleClick} className={className} style={style}>
      {children}
    </a>
  );
};

export default Link;
