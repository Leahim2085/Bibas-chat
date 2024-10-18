import { FieldValues, UseFormRegister } from 'react-hook-form';
import { HTMLInputTypeAttribute } from 'react';

export interface InputProps {
	placeholder: string;
	name: string;
	label?: string;
	register: UseFormRegister<FieldValues>;
	type?: HTMLInputTypeAttribute;
}
