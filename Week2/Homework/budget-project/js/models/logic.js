import { TRANSACTION_TYPE } from "../constants/constant.js";

/**
 * 주어진 데이터를 필터링 조건에 따라 거름
 * @param {Array} data - 가계부 데이터 배열
 * @param {Object} filters - 필터링 조건 객체
 * @returns {Array} 필터링된 데이터
 */
export const filterData = (data, { title, category, type, method }) => {
  return data.filter((item) => {
    const matchesTitle = !title || item.title.includes(title);
    const matchesCategory = !category || item.category === category;
    const matchesMethod = !method || item.payment === method;
    const matchesType =
      !type ||
      (type === TRANSACTION_TYPE.INCOME ? item.amount > 0 : item.amount < 0);
    return matchesTitle && matchesCategory && matchesMethod && matchesType;
  });
};

/**
 * 데이터를 날짜 기준으로 정렬
 * @param {Array} data - 정렬할 데이터 배열
 * @param {'asc' | 'desc'} order - 정렬 순서
 * @returns {Array} 정렬된 데이터
 */
export const sortDataByDate = (data, order) => {
  return [...data].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return order === "desc" ? dateB - dateA : dateA - dateB;
  });
};
