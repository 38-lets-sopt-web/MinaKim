import {Header} from '@/components/Header';
import {useState} from 'react';
import {GameContainer} from '@/domains/game/containers/GameContainer';
import {RankingContainer} from '@/domains/ranking/containers/RankingContainer';
import {useRanking} from '@/hooks/useRanking';

export const GamePage = () => {
  const [activeTab, setActiveTab] = useState<'game' | 'ranking'>('game');
  const {rankings, updateRankings, clearRankings} = useRanking();

  return (
    <div className='min-h-screen bg-neutral-50 p-5'>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className='container mx-auto p-4'>
        {activeTab === 'game' ? (
          <GameContainer updateRankings={updateRankings} />
        ) : (
          <RankingContainer rankings={rankings} clearRankings={clearRankings} />
        )}
      </main>
    </div>
  );
};
