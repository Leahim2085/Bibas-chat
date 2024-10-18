import React from 'react';

export enum ButtonVariants {
	primary = 'primary',
	secondary = 'secondary',
	round = 'round',
}

export interface ButtonProps {
	variant?: ButtonVariants;
	onClick?: () => void;
	children: React.ReactNode;
	type?: 'submit' | 'reset' | 'button';
}
