export enum AvatarVariants {
	user = 'user',
	room = 'room',
}

export interface AvatarProps {
	src: string;
	variant: AvatarVariants;
	onContextMenu?: void;
}
