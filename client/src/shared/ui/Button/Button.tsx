import { FC, PropsWithChildren } from 'react';
import { ButtonProps, ButtonVariants } from './Button.types';
import './Button.css';

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
	variant = ButtonVariants.primary,
	onClick,
	children,
	type,
}: ButtonProps) => {
	return (
		<button className={`${variant}-button`} onClick={onClick} type={type ? type : "button" }>
			<div className={`${variant}-children`}>{children}</div>
		</button>
	);
};
