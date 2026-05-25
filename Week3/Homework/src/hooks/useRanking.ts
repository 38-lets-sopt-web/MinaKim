import {STORAGE_KEYS} from '@/constants/storage-key';
import type {RankItem} from '@/types/rank-item-type';
import {useState} from 'react';

/**
 * 게임의 랭킹 시스템을 관리하기 위한 커스텀 훅
 * 로컬 스토리지를 통해 데이터를 저장하고
 * 레벨과 점수 기준에 따라 정렬된 데이터를 제공함
 *
 * @returns {Object} 랭킹 상태와 관리 함수들
 * @returns {RankItem[]} rankings - 현재 저장된 랭킹 목록 (레벨 내림차순, 점수 내림차순 정렬).
 * @returns {function(RankItem): void} updateRankings - 새로운 기록을 추가하고 목록을 재정렬한 뒤 로컬 스토리지에 저장함
 * @returns {function(): void} clearRankings - 전체 랭킹 데이터 초기화
 */
export const useRanking = () => {
  /**
   * 랭킹 초기 상태 설정
   * 로컬 스토리지에서 저장된 데이터를 불러오며, 데이터가 없을 경우 빈 배열 반환
   */
  const [rankings, setRankings] = useState<RankItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MOLE_RANKINGS);
    return saved ? JSON.parse(saved) : [];
  });

  /**
   * 새로운 랭킹 기록 업데이트
   * 1. 이전 기록에 새 기록 추가
   * 2. 레벨(level)이 높은 순으로, 레벨이 같다면 점수(score)가 높은 순으로 정렬
   * 3. 정렬된 결과를 로컬 스토리지에 동기화.
   *
   * @param {RankItem} newRank - 추가할 새로운 랭킹 데이터 객체.
   */
  const updateRankings = (newRank: RankItem) => {
    setRankings((prev) => {
      const updated = [...prev, newRank].sort((a, b) => {
        if (b.level !== a.level) return b.level - a.level;
        return b.score - a.score;
      });

      localStorage.setItem(STORAGE_KEYS.MOLE_RANKINGS, JSON.stringify(updated));

      return updated;
    });
  };

  /**
   * 전체 랭킹 내역 삭제 (사용자 컨펌 후 로컬스토리지 초기화)
   */
  const clearRankings = () => {
    if (window.confirm('모든 랭킹 기록을 초기화하시겠습니까?')) {
      setRankings([]);
      localStorage.removeItem(STORAGE_KEYS.MOLE_RANKINGS);
    }
  };

  return {
    rankings,
    updateRankings,
    clearRankings,
  };
};
