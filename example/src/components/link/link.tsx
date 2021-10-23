import "./link.css";
import { Link as LinkComponent } from 'animated-router-react';

type Props = {
  to: string;
  bold: string;
  text: string;
}

const handleNewLine = (text: string) => {
  const data = text.split(/.<br\/>./g);

  if (data.length < 2) {
    return <>{text}</>;
  }

  return <>{data[0]}<br/>{data[1]}</>
}

const Link = ({to, text, bold}: Props) => (
  <LinkComponent to={to} className="link">
    <b>{bold} </b>{handleNewLine(text)}
  </LinkComponent>
)

export default Link;