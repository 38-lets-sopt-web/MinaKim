import {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';

interface GameResultModalProps {
  score: number;
  onClose: () => void;
}

export const GameResultModal = ({score, onClose}: GameResultModalProps) => {
  const [remainingTime, setRemainingTime] = useState<number>(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);

    if (remainingTime <= 0) {
      onClose();
    }

    return () => clearInterval(timer);
  }, [remainingTime, onClose]);

  const modalContent = (
    <div className='fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
      <div className='animate-in fade-in zoom-in w-80 overflow-hidden rounded-2xl bg-white shadow-2xl duration-300'>
        <div className='bg-primary-500 p-4 text-center text-white'>
          <h2 className='text-h2'>게임 종료!</h2>
        </div>

        <div className='p-8 text-center'>
          <p className='mb-2 text-neutral-500'>최종 점수</p>
          <p className='text-primary-600 mb-6 text-4xl font-black'>
            {score.toLocaleString()}점
          </p>

          <p className='text-body-l text-neutral-400'>
            <span className='font-bold text-neutral-700'>{remainingTime}</span>
            초 뒤에 자동으로 닫힙니다.
          </p>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
