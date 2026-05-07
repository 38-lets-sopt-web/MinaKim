import {useState, type ChangeEvent} from 'react';
import {Input} from '@/shared/ui/Input';
import {Button} from '@/shared/ui/Button';
import {SignUpRequestSchema} from '@/shared/api/schema';

export const PasswordStep = ({onNext}: {onNext: (pw: string) => void}) => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const passwordValidator = SignUpRequestSchema.shape.password;

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    const result = passwordValidator.safeParse(value);
    if (!result.success) {
      setPasswordError(result.error.issues[0].message);
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const confirmError =
    confirmPassword.length > 0 && password !== confirmPassword
      ? '비밀번호가 일치하지 않습니다.'
      : undefined;

  const isValid =
    password.length > 0 && !passwordError && password === confirmPassword;

  return (
    <div className='flex flex-col gap-5'>
      <Input
        label='비밀번호'
        type='password'
        value={password}
        onChange={handlePasswordChange}
        error={passwordError}
      />
      <Input
        label='비밀번호 확인'
        type='password'
        value={confirmPassword}
        onChange={handleConfirmChange}
        error={confirmError}
      />
      <Button
        text='다음'
        disabled={!isValid}
        onClick={() => onNext(password)}
        backgroundColor={isValid ? 'bg-primary-400' : 'bg-neutral-400'}
        textColor='text-neutral-100'
      />
    </div>
  );
};
