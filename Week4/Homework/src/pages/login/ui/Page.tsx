import {useState, type ChangeEvent, type KeyboardEvent} from 'react';
import {Button} from '@/shared/ui/Button';
import {Input} from '@/shared/ui/Input';
import {Link} from 'react-router';
import {useSignInMutation} from '@/features/auth/model/useSignInMutation';

export default function LoginPage() {
  const [form, setForm] = useState({loginId: '', password: ''});
  const {mutate: signIn, isPending} = useSignInMutation();

  const isDisabled = !form.loginId || !form.password || isPending;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm((prev) => ({...prev, [name]: value}));
  };

  const handleLogin = () => {
    signIn(form);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isDisabled) {
      handleLogin();
    }
  };

  return (
    <section className='bg-primary-100 flex min-h-screen flex-col items-center justify-center gap-5'>
      <div className='flex flex-col justify-center gap-5'>
        <h1 className='text-h1 text-center'>SOPT MEMBERS</h1>
        <div className='flex flex-col gap-5'>
          <Input
            name='loginId'
            label='아이디'
            value={form.loginId}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder='아이디를 입력하세요'
          />
          <Input
            name='password'
            label='비밀번호'
            type='password'
            value={form.password}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder='비밀번호를 입력하세요'
          />
        </div>

        <div className='flex flex-col gap-3'>
          <Button
            text={isPending ? '로그인 중...' : '로그인'}
            backgroundColor='bg-primary-400'
            textColor='text-neutral-100'
            onClick={handleLogin}
            disabled={isDisabled}
          />
          <Link to='/signup' className='w-full'>
            <Button
              text='회원가입'
              backgroundColor='bg-primary-400'
              textColor='text-neutral-100'
              ariaLabel='회원가입 페이지로 이동'
              className='w-full'
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
