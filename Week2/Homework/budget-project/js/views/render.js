import { getLocalData } from "../models/storage.js";
import { formatAmount } from "../utils/formatAmount.js";
import { TRANSACTION_TYPE } from "../constants/constant.js";
import { filterData, sortDataByDate } from "../models/logic.js";

const modal = document.getElementById("modal__backdrop");
const modalBody = document.getElementById("modal__body");

/**
 * 모달을 열고 콘텐츠를 주입합니다.
 * @param {string} contentHtml
 */
export const openModal = (contentHtml) => {
  modalBody.innerHTML = contentHtml;
  modal.classList.remove("hidden");
};

/**
 * 모달 닫기
 */
export const closeModal = () => modal.classList.add("hidden");

/**
 * 현재 UI 상태(필터, 정렬)를 읽어와 데이터를 테이블에 렌더링
 */
export const renderTable = () => {
  const tableBody = document.getElementById("table__body");
  const totalAmountEl = document.getElementById("total__amount");
  const checkAll = document.getElementById("check__all");

  if (checkAll) checkAll.checked = false;

  const filters = {
    title: document.getElementById("filter__title").value.trim(),
    category: document.getElementById("filter__category").value,
    type: document.getElementById("filter__type").value,
    method: document.getElementById("filter__method").value,
  };
  const sortOrder = document.getElementById("sort__date").value;

  let displayData = getLocalData();
  displayData = filterData(displayData, filters);
  displayData = sortDataByDate(displayData, sortOrder);

  updateTableDOM(tableBody, displayData);
  updateTotalAmountDOM(totalAmountEl, displayData);
};

/**
 * 실제 테이블 행을 생성하는  함수
 * @param {HTMLElement} container
 * @param {Array} data
 */
const updateTableDOM = (container, data) => {
  container.innerHTML = data
    .map((item) => {
      const type =
        item.amount > 0 ? TRANSACTION_TYPE.INCOME : TRANSACTION_TYPE.EXPENSE;
      return `
      <tr>
        <td><input type="checkbox" class="row__checkbox" data-id="${item.id}"></td>
        <td class="item__title" data-id="${item.id}" style="cursor:pointer; text-decoration:underline;">${item.title}</td>
        <td>${formatAmount(item.amount, type)}</td>
        <td>${item.date}</td>
        <td>${item.category}</td>
        <td>${item.payment}</td>
      </tr>
    `;
    })
    .join("");
};

/**
 * 합계 영역 업데이트
 * @param {HTMLElement} element
 * @param {Array} data
 */
const updateTotalAmountDOM = (element, data) => {
  const total = data.reduce((acc, cur) => acc + cur.amount, 0);
  element.innerText = `합계: ${new Intl.NumberFormat().format(total)}원`;
};
