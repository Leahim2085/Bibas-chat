import { FC, PropsWithChildren } from 'react';
import { ModalProps } from './Modal.types.ts';
import './Modal.css';

export const Modal: FC<PropsWithChildren<ModalProps>> = ({ onClose, children }: ModalProps) => {
	return (
		<>
			<div className="background" onClick={onClose}></div>
			<div className="modal">{children}</div>
		</>
	);
};
