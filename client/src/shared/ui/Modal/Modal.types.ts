import React from 'react';

export interface ModalProps {
	onClose: () => void;
	children: React.ReactNode;
}
