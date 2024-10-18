export enum TextVariants {
	paragraph = 'paragraph',
	heading = 'heading',
	'mega-heading' = 'megaheading',
}

export interface TextProps {
	variant?: TextVariants;
	text: string;
}
