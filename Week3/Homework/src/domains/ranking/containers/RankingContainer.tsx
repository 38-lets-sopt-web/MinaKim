import {Button} from '@/components/Button';
import {RankingTable} from '@/domains/ranking/components/RankingTable';
import {useRanking} from '@/hooks/useRanking';

export const RankingContainer = () => {
  const {rankings, clearRankings} = useRanking();

  return (
    <section className='bg-primary-100 mx-auto flex w-full flex-col gap-5 rounded-2xl border border-gray-100 p-6 shadow-sm'>
      <div className='flex items-center justify-between'>
        <h2 className='text-h2 text-neutral-800'>랭킹 보드</h2>
        <Button
          text='기록 초기화'
          onClick={clearRankings}
          backgroundColor='bg-red-600 hover:bg-red-500'
          textColor='text-white'
        />
      </div>
      <div className='overflow-hidden rounded-xl'>
        <RankingTable rankings={rankings} />
      </div>
    </section>
  );
};
