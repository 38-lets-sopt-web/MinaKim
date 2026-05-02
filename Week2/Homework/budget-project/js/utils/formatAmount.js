/**
 * 금액을 포맷팅하여 색상이 적용된 HTML 문자열로 반환합니다.
 * * @param {number} amount - 포맷팅할 금액 (양수/음수)
 * @param {'수입' | '지출'} type - 거래 타입
 * @returns {string} 색상 스타일과 부호가 적용된 HTML 문자열
 */
export const formatAmount = (amount, type) => {
  const sign = amount > 0 ? "+" : "";
  const color = type === "수입" ? "blue" : "red";
  const formatted = new Intl.NumberFormat().format(Math.abs(amount));
  return `<span style="color: ${color}">${sign}${formatted}원</span>`;
};
