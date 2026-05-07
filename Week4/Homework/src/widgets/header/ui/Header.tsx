import {Button} from '@/shared/ui/Button';
import {useLocation, useNavigate} from 'react-router';

interface HeaderProps {
  userName: string;
}

export const Header = ({userName}: HeaderProps) => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const isMyPage = pathname === '/mypage';
  const isMembers = pathname.startsWith('/mypage/members');

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <header className='bg-primary-100 flex flex-row justify-between p-5'>
      <div className='flex flex-col'>
        <p className='text-h1'>SOPT MEMBERS</p>
        <p className='text-h5'>안녕하세요, {userName}님</p>
      </div>
      <div className='flex flex-row gap-2 p-3'>
        <Button
          text='내 정보'
          backgroundColor={isMyPage ? 'bg-primary-500' : 'bg-primary-300'}
          textColor='text-neutral-100'
          onClick={() => navigate('/mypage')}
        />
        <Button
          text='회원 조회'
          backgroundColor={isMembers ? 'bg-primary-500' : 'bg-primary-300'}
          textColor='text-neutral-100'
          onClick={() => navigate('/mypage/members')}
        />
        <Button
          text='로그아웃'
          backgroundColor='bg-primary-300'
          textColor='text-neutral-100'
          onClick={handleLogout}
        />
      </div>
    </header>
  );
};
