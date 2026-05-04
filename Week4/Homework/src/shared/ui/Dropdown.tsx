import {useId, type SelectHTMLAttributes} from 'react';
import {clsx} from 'clsx';

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: {value: string; label: string}[];
}

export const Dropdown = ({
  label,
  error,
  options,
  className,
  ...props
}: DropdownProps) => {
  const id = useId();

  return (
    <div className='flex w-full flex-col gap-2'>
      {label && (
        <label htmlFor={id} className='text-h5 font-bold text-neutral-900'>
          {label}
        </label>
      )}
      <div className='relative w-full'>
        <select
          id={id}
          className={clsx(
            'w-full appearance-none rounded-lg border bg-neutral-50 px-4 py-2 transition-all outline-none',
            'focus:ring-primary-200 focus:ring-2',
            error
              ? 'border-red-500'
              : 'focus:border-primary-100 border-neutral-200',
            className
          )}
          {...props}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className='pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-400'>
          ▼
        </div>
      </div>
      {error && <span className='text-xs text-red-500'>{error}</span>}
    </div>
  );
};
