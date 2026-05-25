import {GAME_CONFIG} from '@/constants/game-config';
import {GameMoleCell} from '@/domains/game/components/GameMoleCell';
import {useCallback, useEffect, useState} from 'react';

interface GameBoardContainerProps {
  level: 1 | 2 | 3;
  isActive: boolean;
  onScoreChange: (type: 'mole' | 'bomb') => void;
}

export const GameBoardContainer = ({
  level,
  isActive,
  onScoreChange,
}: GameBoardContainerProps) => {
  const {size} = GAME_CONFIG[level];

  const totalCells = size * size;

  const [cells, setCells] = useState<('none' | 'mole' | 'bomb')[]>(
    Array(totalCells).fill('none')
  );

  const spawnTarget = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * totalCells);
    const randomType = Math.random() > 0.8 ? 'bomb' : 'mole';

    setCells((prev) => {
      const next = [...prev];
      next[randomIndex] = randomType;
      return next;
    });

    const duration = 1000 - (level - 1) * 200;
    setTimeout(() => {
      setCells((current) => {
        const updated = [...current];
        if (updated[randomIndex] === randomType) updated[randomIndex] = 'none';
        return updated;
      });
    }, duration);
  }, [totalCells, level]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (isActive) {
      const interval = 1200 - (level - 1) * 200;

      timer = setInterval(spawnTarget, interval);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, spawnTarget, level]);

  const clearCell = (idx: number) => {
    setCells((prev) => {
      const next = [...prev];
      next[idx] = 'none';
      return next;
    });
  };

  const handleCatch = (type: 'mole' | 'bomb', idx: number) => {
    if (!isActive) return;
    onScoreChange(type);
    clearCell(idx);
  };

  return (
    <div
      className='grid gap-3'
      style={{gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`}}>
      {cells.map((type, idx) => (
        <GameMoleCell
          key={`${level}-${idx}`}
          type={type}
          onCatch={(catchType) => handleCatch(catchType, idx)}
        />
      ))}
    </div>
  );
};
