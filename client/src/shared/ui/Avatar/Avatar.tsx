import { FC, PropsWithChildren } from 'react';
import { AvatarProps, AvatarVariants } from './Avatar.types.ts';
import './Avatar.css';

export const Avatar: FC<PropsWithChildren<AvatarProps>> = ({
	src,
	variant = AvatarVariants.user,
	onContextMenu,
}: AvatarProps) => {
	return <img src={src} onContextMenu={onContextMenu ? onContextMenu : undefined} className={`${variant}-avatar`} />;
};
