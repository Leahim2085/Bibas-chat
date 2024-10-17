import * as React from "react";
import "./Button.css";
import { ButtonProps, ButtonVariants } from "./Button.types.ts";

function Button({
  variant = ButtonVariants.primary,
  onClick,
  text,
  icon,
}: ButtonProps) {
  return (
    <button className={`${variant}-button`} onClick={onClick}>
      {text && <p className={`button-text`}>{text}</p>}
      {icon && <img src={icon} alt="button-icon" />}
    </button>
  );
}

export default Button;
