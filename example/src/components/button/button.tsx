import "./button.css";

type Props = {
  text: string;
  onClick?: () => void;
}

const Button = ({text, onClick}: Props) => (
  <div className="button" onClick={onClick} role="button">
    {text}
  </div>
)

export default Button;