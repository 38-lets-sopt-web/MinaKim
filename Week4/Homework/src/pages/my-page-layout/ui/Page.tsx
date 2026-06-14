import {useUserQuery} from '@/features/user/model/useUserQuery';
import {Header} from '@/widgets/header';
import {Navigate, Outlet} from 'react-router';

export default function MyPageLayout() {
  const userId = Number(localStorage.getItem('userId'));

  const {data: user} = useUserQuery(userId);

  if (!userId) {
    return <Navigate to='/login' replace />;
  }

  return (
    <div>
      <Header userName={user?.name ?? ''} />
      <main className='flex flex-col items-center justify-center'>
        <Outlet />
      </main>
    </div>
  );
}
