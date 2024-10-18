import React, { ButtonHTMLAttributes } from 'react';

export enum ButtonVariants {
	primary = 'primary',
	secondary = 'secondary',
	round = 'round',
}

export interface ButtonProps {
	variant?: ButtonVariants;
	onClick?: () => void;
	children: React.ReactNode;
	type?: ButtonHTMLAttributes<string>;
}
