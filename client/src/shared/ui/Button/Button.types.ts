import { ReactNode } from 'react';

export enum ButtonVariants {
	primary = 'primary',
	secondary = 'secondary',
	round = 'round',
}

export interface ButtonProps {
	variant?: ButtonVariants;
	onClick?: () => void;
	children: ReactNode;
	type?: "submit" | "reset" | "button" ;
}
