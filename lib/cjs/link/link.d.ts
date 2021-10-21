import { CSSProperties, PropsWithChildren } from 'react';
declare type Props = PropsWithChildren<{
    to: string;
    className?: string;
    style?: CSSProperties;
}>;
declare const Link: ({ children, className, style, to }: Props) => JSX.Element;
export default Link;
