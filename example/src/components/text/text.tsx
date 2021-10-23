import { CSSProperties } from "react";

type Props = React.PropsWithChildren<{
  size: "normal" | "small";
  weight: 'normal' | 'thin' | 'bold';
  color: 'normal' | 'inverted';
}>;

const Text = ({children, size, weight, color}: Props) => {
  const css: CSSProperties = {
    fontWeight: weight === 'thin' ? 300 : weight,
    fontSize: size === 'normal' ? '18px' : '15px',
    color: color === 'inverted' ? 'var(--text-invert)' : 'var(--text)',
    textAlign: "center"
  }

  return (
    <p className="text" style={css}>
      {children}
    </p>
  )
}

Text.defaultProps = {
  size: 'normal',
  weight: 'normal',
  color: 'normal',
}

export default Text;