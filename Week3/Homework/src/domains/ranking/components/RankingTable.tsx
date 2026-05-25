import type {RankItem} from '@/types/rank-item-type';

interface RankingTableProps {
  rankings: RankItem[];
}

export const RankingTable = ({rankings}: RankingTableProps) => {
  return (
    <table className='text-body-l border-primary-200 w-full border-2 text-center'>
      <thead className='text-body-l bg-primary-200 text-neutral-500 uppercase'>
        <tr>
          <th className='px-6 py-4'>순위</th>
          <th className='px-6 py-4'>레벨</th>
          <th className='px-6 py-4'>점수</th>
          <th className='px-6 py-4'>기록 시간</th>
        </tr>
      </thead>
      <tbody className='divide-primary-200 divide-y-2'>
        {rankings.length > 0 ? (
          rankings.map((rank, index) => (
            <tr key={rank.id}>
              <td className='px-6 py-4 font-medium text-neutral-700'>
                {index === 0
                  ? '🥇'
                  : index === 1
                    ? '🥈'
                    : index === 2
                      ? '🥉'
                      : index + 1}
              </td>
              <td className='px-6 py-4'>Lv.{rank.level}</td>
              <td className='px-6 py-4'>{rank.score.toLocaleString()}</td>
              <td className='px-6 py-4'>{rank.timestamp}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className='py-16 text-center text-neutral-400'>
              아직 기록된 랭킹이 없습니다.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
