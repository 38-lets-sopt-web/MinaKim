import {useState, type ChangeEvent} from 'react';
import {Input} from '@/shared/ui/Input';
import {Button} from '@/shared/ui/Button';
import {SignUpRequestSchema} from '@/shared/api/schema';

export const IdStep = ({onNext}: {onNext: (id: string) => void}) => {
  const [value, setValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const loginIdValidator = SignUpRequestSchema.shape.loginId;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    const result = loginIdValidator.safeParse(inputValue);

    if (!result.success) {
      setErrorMessage(result.error.issues[0].message);
    } else {
      setErrorMessage('');
    }
  };

  const isValid = value.length > 0 && !errorMessage;

  return (
    <div className='flex flex-col gap-5'>
      <Input
        label='아이디'
        value={value}
        error={errorMessage}
        onChange={handleChange}
        placeholder='사용할 아이디를 입력해 주세요'
      />
      <Button
        text='다음으로'
        onClick={() => onNext(value)}
        disabled={!isValid}
        backgroundColor={isValid ? 'bg-primary-400' : 'bg-neutral-400'}
        textColor='text-neutral-100'
      />
    </div>
  );
};
