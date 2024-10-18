import { FC, PropsWithChildren } from 'react';
import { ButtonProps, ButtonVariants } from './Button.types';
import './Button.css';

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
	variant = ButtonVariants.primary,
	onClick,
	children,
}: ButtonProps) => {
	return (
		<button className={`${variant}-button`} onClick={onClick}>
			<div className={`${variant}-children`}>{children}</div>
		</button>
	);
};
