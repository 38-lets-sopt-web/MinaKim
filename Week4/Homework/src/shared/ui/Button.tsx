import {clsx} from 'clsx';
import type {ButtonHTMLAttributes} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  backgroundColor: string;
  textColor: string;
  ariaLabel?: string;
}

export const Button = ({
  text,
  backgroundColor,
  textColor,
  ariaLabel,
  onClick,
  disabled,
  type = 'button',
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={ariaLabel || text}
      className={clsx(
        'cursor-pointer rounded-lg px-4 py-2 transition-all',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:ring-primary-400 outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        backgroundColor,
        textColor,
        className
      )}
      {...props}>
      {text}
    </button>
  );
};
