import {useUserQuery} from '@/features/user/model/useUserQuery';
import {Button} from '@/shared/ui/Button';
import {DetailCard} from '@/shared/ui/DetailCard';
import {useNavigate, useParams} from 'react-router';

export default function MemberDetailPage() {
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();
  const userId = id ? Number(id) : undefined;

  const {
    data: user,
    isLoading,
    isError,
  } = useUserQuery(userId && !isNaN(userId) ? userId : 0);

  if (isLoading) return <div className='p-10 text-center'>로딩 중...</div>;

  if (isError || !user || isNaN(userId as number))
    return (
      <div className='p-10 text-center text-red-500'>
        사용자를 찾을 수 없습니다.
      </div>
    );

  return (
    <section className='mx-auto flex max-w-2xl flex-col gap-5 p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-h1'>상세 정보</h1>
        <Button
          text='뒤로가기'
          backgroundColor='bg-primary-300'
          textColor='text-neutral-100'
          onClick={() => navigate(-1)}
        />
      </div>

      <DetailCard
        name={user.name}
        email={user.email}
        age={user.age}
        id={user.id}
        part={user.part}
      />
    </section>
  );
}
