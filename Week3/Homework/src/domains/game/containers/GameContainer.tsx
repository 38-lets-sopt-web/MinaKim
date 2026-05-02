import {Card} from '@/components/Card';
import {Button} from '@/components/Button';
import {useGame} from '@/domains/game/hooks/useGame';
import {useState} from 'react';
import {GameResultModal} from '@/domains/game/components/GameResultModal';
import {GameBoardContainer} from '@/domains/game/containers/GameBoardContainer';
import {useRanking} from '@/hooks/useRanking';

export const GameContainer = () => {
  const {updateRankings} = useRanking();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {state, actions} = useGame(updateRankings, () => {
    setIsModalOpen(true);
  });

  const {level, score, timeLeft, isActive, stats, message} = state;

  return (
    <div className='mx-auto flex max-w-7xl flex-col gap-5'>
      <section className='grid grid-cols-12 items-start gap-5'>
        <div className='col-span-3 flex flex-col gap-4'>
          <div className='flex flex-row gap-2'>
            {[1, 2, 3].map((l) => (
              <Button
                key={l}
                text={`Lv.${l}`}
                disabled={isActive}
                onClick={() => actions.handleLevelChange(l as 1 | 2 | 3)}
                backgroundColor={
                  level === l ? 'bg-primary-500' : 'bg-neutral-200'
                }
                textColor={level === l ? 'text-white' : 'text-black'}
                className='flex-1'
              />
            ))}
          </div>

          <div className='flex flex-col gap-3'>
            <Card label='남은 시간' message={`${timeLeft.toFixed(1)}s`} />
            <Card label='총 점수' message={score.toLocaleString()} />
            <div className='grid grid-cols-2 gap-4'>
              <Card label='성공' message={stats.success} />
              <Card label='실패' message={stats.fail} />
            </div>
            <Card label='안내 메시지' message={message} />

            <Button
              text={isActive ? '게임 중단' : '게임 시작'}
              onClick={actions.toggleGame}
              backgroundColor={isActive ? 'bg-red-500' : 'bg-primary-600'}
              textColor='text-white'
            />
          </div>
        </div>

        <div className='bg-primary-100 border-primary-200 col-span-9 flex h-full min-h-150 items-center justify-center rounded-2xl border-4 shadow-inner'>
          <GameBoardContainer
            key={level}
            level={level}
            isActive={isActive}
            onScoreChange={actions.handleScoreUpdate}
          />
        </div>
      </section>

      {isModalOpen && (
        <GameResultModal score={score} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};
