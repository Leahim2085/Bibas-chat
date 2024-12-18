import { FC, PropsWithChildren } from 'react';
import { InputProps } from './Input.types.ts';
import './Input.css';

export const Input: FC<PropsWithChildren<InputProps>> = ({ placeholder, name, label, register, type }: InputProps) => {
	return (
		<div>
			<div className="input-label">{label}</div>
			<input placeholder={placeholder} {...register(name)} className="input" type={type ? type : 'text'} />
		</div>
	);
};
