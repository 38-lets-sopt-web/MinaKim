import {useState} from 'react';

interface GameMoleCellProps {
  type: 'none' | 'mole' | 'bomb';
  onCatch: (type: 'mole' | 'bomb') => void;
}

export const GameMoleCell = ({type, onCatch}: GameMoleCellProps) => {
  const [isHit, setIsHit] = useState<boolean>(false);

  const handleClick = () => {
    if (type === 'none' || isHit) return;

    if (type === 'mole') {
      setIsHit(true);
      onCatch('mole');
      setTimeout(() => setIsHit(false), 700);
    } else {
      onCatch('bomb');
    }
  };

  return (
    <div
      onClick={handleClick}
      className='border-primary-900 bg-primary-800 relative h-24 w-24 cursor-pointer overflow-hidden rounded-full border-4 shadow-inner'>
      {type === 'mole' && (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-transform ${isHit ? 'bg-primary-400' : 'bg-primary-500'}`}>
          {isHit ? '👾' : '👽'}
        </div>
      )}
      {type === 'bomb' && (
        <div className='absolute inset-0 flex items-center justify-center bg-black text-white'>
          ☠
        </div>
      )}
    </div>
  );
};
