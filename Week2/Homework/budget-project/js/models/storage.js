import { STORAGE_KEY } from "../constants/constant.js";
import { mockData } from "../mocks/mock-data.js";

/**
 * 로컬 스토리지에서 전체 가계부 내역 데이터를 가져옴
 * @returns  가계부 내역 객체 배열 (데이터가 없으면 빈 배열 반환)
 */
export const getLocalData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * 가계부 내역 데이터를 로컬 스토리지에 저장함
 * @param data - 저장할 가계부 내역 객체 배열
 */
export const saveLocalData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

/**
 * 애플리케이션 초기화 시 데이터 로드
 * 로컬 스토리지에 데이터가 없는 경우 mockData로 초기화
 * @returns 초기화된 또는 기존의 가계부 내역 배열
 */
export const initializeData = () => {
  const existingData = getLocalData();
  if (existingData.length === 0) {
    saveLocalData(mockData);
    return mockData;
  }
  return existingData;
};

/**
 * 선택된 ID 목록에 해당하는 항목들을 삭제
 * @param ids - 삭제할 항목들의 고유 ID 배열
 */
export const deleteItems = (ids) => {
  const remainData = getLocalData().filter((item) => !ids.includes(item.id));
  saveLocalData(remainData);
};
