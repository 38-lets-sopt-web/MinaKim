import type {RankItem} from '@/types/rank-item-type';
import {GAME_CONFIG} from '@/constants/game-config';
import {useEffect, useState} from 'react';

/**
 * 두더지 잡기 게임의 핵심 비즈니스 로직을 관리하는 커스텀 훅
 * 게임의 상태(점수, 시간, 레벨)를 제어하고, 타이머 종료 시 랭킹 저장
 *
 * @param {function(RankItem): void} onSaveRanking - 게임 종료 시 점수가 0점보다 높을 경우 호출되는 랭킹 저장 콜백
 * @param {function(): void} [onGameEnd] - 게임이 최종적으로 종료(타이머 만료)되었을 때 실행할 콜백
 *
 * @returns {Object} state와 actions로 구분된 객체 반환
 * @returns {Object} state - 게임의 현재 상태 (level, score, timeLeft, isActive, stats, message)
 * @returns {Object} actions - 게임 상태를 변경하는 함수 (handleLevelChange, toggleGame, handleScoreUpdate)
 */
export const useGame = (
  onSaveRanking: (newRank: RankItem) => void,
  onGameEnd?: () => void
) => {
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [stats, setStats] = useState({success: 0, fail: 0});
  const [message, setMessage] = useState<string>('');

  /**
   * 게임 루프 및 타이머 관리
   * isActive가 true가 되면 100ms마다 timeLeft를 감소시킴
   * 시간이 0에 도달하면 게임을 정지시키고 점수에 따라 랭킹을 저장
   */
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (isActive) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 0.1) return prev - 0.1;

          clearInterval(timer);

          setTimeout(() => {
            setIsActive(false);

            if (score > 0) {
              const newEntry: RankItem = {
                id: Date.now(),
                level,
                score,
                timestamp: new Date().toLocaleString(),
              };
              onSaveRanking(newEntry);
              setMessage('랭킹이 저장되었습니다.');
              onGameEnd?.();
            } else {
              setMessage('게임 종료!');
              onGameEnd?.();
            }
          }, 0);

          return 0;
        });
      }, 100);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, level, score, onSaveRanking, onGameEnd]);

  /**
   * 게임 난이도 변경
   * 게임이 진행 중(isActive === true)일 때는 변경할 수 없음
   *
   * @param {1 | 2 | 3} newLevel - 설정할 새로운 난이도 레벨
   */
  const handleLevelChange = (newLevel: 1 | 2 | 3) => {
    if (isActive) return;
    const {limit} = GAME_CONFIG[newLevel];

    setLevel(newLevel);
    setTimeLeft(limit);
    setScore(0);
    setStats({success: 0, fail: 0});
    setMessage(`${newLevel}단계 준비!`);
  };

  /**
   * 게임을 초기 상태로 리셋
   */
  const handleReset = () => {
    setIsActive(false);
    setScore(0);
    setTimeLeft(GAME_CONFIG[level].limit);
    setStats({success: 0, fail: 0});
    setMessage('');
  };

  /**
   * 게임의 시작과 중단(리셋)을 토글
   */
  const toggleGame = () => {
    if (isActive) handleReset();
    else setIsActive(true);
  };

  /**
   * 두더지 또는 폭탄 클릭 시 점수와 통계 업데이트
   *
   * @param {'mole' | 'bomb'} type - 클릭한 요소의 타입
   */
  const handleScoreUpdate = (type: 'mole' | 'bomb') => {
    if (type === 'mole') {
      setScore((prev) => prev + 1);
      setStats((prev) => ({...prev, success: prev.success + 1}));
      setMessage('두더지 잡음!');
    } else {
      setScore((prev) => Math.max(0, prev - 1));
      setStats((prev) => ({...prev, fail: prev.fail + 1}));
      setMessage('땡!!!');
    }
  };

  return {
    state: {level, score, timeLeft, isActive, stats, message},
    actions: {handleLevelChange, toggleGame, handleScoreUpdate},
  };
};
