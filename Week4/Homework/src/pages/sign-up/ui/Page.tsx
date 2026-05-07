import {SignUpFunnel} from '@/features/auth/ui/SignUpFunnel';
import {Link} from 'react-router';

export default function SignUpPage() {
  return (
    <section className='bg-primary-100 flex min-h-screen flex-col items-center justify-center gap-5'>
      <h1 className='text-h1'>회원가입</h1>
      <SignUpFunnel />
      <div className='flex gap-2'>
        <p className='font-semibold text-neutral-700'>이미 계정이 있나요?</p>
        <Link
          to='/login'
          className='text-primary-400 focus-visible:ring-primary-400 font-bold outline-none focus-visible:ring-2'
          aria-label='로그인 페이지로 이동'>
          로그인
        </Link>
      </div>
    </section>
  );
}
