import "./textbox.css";

type Props = {
  placeholder: string;
  type?: 'text' | 'password' | 'email';
}

const Textbox = ({placeholder, type}: Props) => (
  <input 
    type={type ?? 'text'} 
    placeholder={placeholder}
    className="textbox" 
  />
)

export default Textbox;