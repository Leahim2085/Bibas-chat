import { FC, PropsWithChildren } from 'react';
import { TextProps, TextVariants } from './Text.types.ts';
import './Text.css';

export const Text: FC<PropsWithChildren<TextProps>> = ({ variant = TextVariants.paragraph, text }: TextProps) => {
	return <p className={`${variant}-text`}>{text}</p>;
};
