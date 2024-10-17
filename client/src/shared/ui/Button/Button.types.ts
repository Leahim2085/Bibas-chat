export enum ButtonVariants {
  primary = "primary",
  secondary = "secondary",
  round = "round",
}

export interface ButtonProps {
  variant?: ButtonVariants;
  onClick?: () => void;
  text?: string;
  icon?: string;
}
