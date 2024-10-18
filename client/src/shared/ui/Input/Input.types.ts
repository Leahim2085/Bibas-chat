import { FieldValues, UseFormRegister } from 'react-hook-form';

export interface InputProps {
	placeholder: string;
	name: string;
	label?: string;
	register: UseFormRegister<FieldValues>;
}
