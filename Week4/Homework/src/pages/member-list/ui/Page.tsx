import {
  useUserMemberList,
  useUserQuery,
} from '@/features/user/model/useUserQuery';
import type {User} from '@/shared/api/schema';
import {Button} from '@/shared/ui/Button';
import {Card} from '@/shared/ui/Card';
import {DetailCard} from '@/shared/ui/DetailCard';
import {Input} from '@/shared/ui/Input';
import {useState} from 'react';
import {useNavigate} from 'react-router';

export default function MemberListPage() {
  const navigate = useNavigate();

  const [searchId, setSearchId] = useState<number>();
  const [queryId, setQueryId] = useState<number>();

  const {data: members, isLoading, isError} = useUserMemberList();
  const {
    data: searchResult,
    isLoading: searchLoading,
    isError: searchError,
  } = useUserQuery(queryId as number);

  const isSearchDisabled = typeof searchId !== 'number';

  return (
    <section className='flex flex-col items-center justify-center gap-7 p-5'>
      <h1 className='text-h1'>회원 조회</h1>
      <Input
        label='회원 ID'
        type='number'
        placeholder='ID를 입력하세요.'
        value={searchId ?? ''}
        onChange={(e) => {
          const value = e.target.value;
          setSearchId(value === '' ? undefined : Number(value));
        }}
      />
      <Button
        text='검색'
        backgroundColor='bg-primary-500'
        textColor='text-neutral-100'
        className='w-full'
        onClick={() => {
          setQueryId(searchId);
        }}
        disabled={isSearchDisabled}
      />

      <div className='w-full'>
        <h2 className='text-h2 mb-4'>검색 결과</h2>
        {searchLoading && <p>검색 중...</p>}
        {searchError && (
          <p className='text-red-500'>해당 ID의 회원을 찾을 수 없습니다.</p>
        )}

        {searchResult && !searchLoading && (
          <div className='flex justify-center'>
            <DetailCard
              key={searchResult.id}
              id={searchResult.id}
              age={searchResult.age}
              email={searchResult.email}
              name={searchResult.name}
              part={searchResult.part}
            />
          </div>
        )}
        {!searchResult && !searchLoading && !searchError && (
          <p className='text-center text-neutral-400'>
            검색 결과가 여기에 표시됩니다.
          </p>
        )}
      </div>

      <h2 className='text-h2'>전체 멤버 리스트</h2>
      {isLoading && <p>로딩 중...</p>}
      {isError && <p>데이터를 불러오는 중 오류가 발생했습니다.</p>}

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
        {members && members.length > 0 ? (
          members.map((member: User) => (
            <Card
              key={member.id}
              name={member.name}
              part={member.part}
              onClick={() => navigate(`${member.id}`)}
            />
          ))
        ) : (
          <p className='text-neutral-400'>등록된 멤버가 없습니다.</p>
        )}
      </div>
    </section>
  );
}
