import {clsx} from 'clsx';
import type {ButtonHTMLAttributes} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  backgroundColor: string;
  textColor: string;
}

export const Button = ({
  text,
  backgroundColor,
  textColor,
  onClick,
  disabled,
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={clsx(
        'transition-alls rounded-lg px-4 py-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        backgroundColor,
        textColor
      )}>
      {text}
    </button>
  );
};
