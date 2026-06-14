import {clsx} from 'clsx';
import {useId, useState, type InputHTMLAttributes} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({
  label,
  error,
  className,
  type = 'text',
  ...props
}: InputProps) => {
  const id = useId();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isPasswordType = type === 'password';
  const currentType = isPasswordType
    ? showPassword
      ? 'text'
      : 'password'
    : type;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className='flex w-full flex-col gap-2'>
      {label && (
        <label htmlFor={id} className='text-h5 font-bold text-neutral-900'>
          {label}
        </label>
      )}

      <div className='relative w-full'>
        <input
          id={id}
          type={currentType}
          className={clsx(
            'w-full rounded-lg border bg-neutral-50 px-4 py-2 transition-all outline-none',
            'focus:ring-primary-200 focus:ring-2',
            'disabled:cursor-not-allowed disabled:bg-neutral-50',

            isPasswordType && 'pr-10',
            error
              ? 'border-red-500'
              : 'focus:border-primary-100 border-neutral-200',
            className
          )}
          {...props}
        />

        {isPasswordType && (
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-neutral-500 hover:text-neutral-700'
            tabIndex={-1}>
            {showPassword ? <span>🙈</span> : <span>👁️</span>}
          </button>
        )}
      </div>

      {error && <span className='text-xs text-red-500'>{error}</span>}
    </div>
  );
};
