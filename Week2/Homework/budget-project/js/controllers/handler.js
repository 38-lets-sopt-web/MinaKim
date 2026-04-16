import { getLocalData, saveLocalData, deleteItems } from "../models/storage.js";
import { renderTable, openModal, closeModal } from "../views/render.js";
import { formatAmount } from "../utils/formatAmount.js";
import {
  CATEGORIES,
  MESSAGES,
  PAYMENT_METHODS,
  TRANSACTION_TYPE,
} from "../constants/constant.js";

/**
 * 가계부 내역 추가 모달을 생성, 오픈하는 핸들러
 */
export const handleOpenAddModal = () => {
  const categoryOptions = CATEGORIES.map(
    (cat) => `<option value="${cat}">${cat}</option>`,
  ).join("");
  const paymentOptions = PAYMENT_METHODS.map(
    (pay) => `<option value="${pay}">${pay}</option>`,
  ).join("");

  const addFormHtml = `
    <h2>내역 추가</h2>
    <div class="modal__form">
      <input type="text" id="new__title" placeholder="제목" />
      <input type="date" id="new__date" />
      <input type="number" id="new__amount" placeholder="금액" />
      <select id="new__category">
        ${categoryOptions}
      </select>
      <select id="new__payment">
        ${paymentOptions}
      </select>
      <button id="btn__save">추가</button>
    </div>
  `;

  openModal(addFormHtml);
};

/**
 * 항목 상세 모달 열기 핸들러
 * @param {number} id - 상세 정보를 볼 항목의 ID
 */
export const handleOpenDetailModal = (id) => {
  const data = getLocalData();
  const item = data.find((d) => d.id === id);

  if (!item) return;

  const type =
    item.amount > 0 ? TRANSACTION_TYPE.INCOME : TRANSACTION_TYPE.EXPENSE;

  const detailHtml = `
    <div class="detail__container">
      <h2>항목 상세</h2>
      <div class="detail__item"><strong>제목:</strong> ${item.title}</div>
      <div class="detail__item"><strong>금액:</strong> ${formatAmount(item.amount, type)}</div>
      <div class="detail__item"><strong>날짜:</strong> ${item.date}</div>
      <div class="detail__item"><strong>카테고리:</strong> ${item.category}</div>
      <div class="detail__item"><strong>결제수단:</strong> ${item.payment}</div>
    </div>
  `;

  openModal(detailHtml);
};

/**
 * 폼 데이터를 수집하여 새로운 내역 추가
 */
export const handleAddEntry = () => {
  const newItem = {
    id: Date.now(),
    title: document.getElementById("new__title").value,
    date: document.getElementById("new__date").value,
    amount: parseInt(document.getElementById("new__amount").value),
    category: document.getElementById("new__category").value,
    payment: document.getElementById("new__payment").value,
  };

  if (!newItem.title || !newItem.date || isNaN(newItem.amount)) {
    return alert(MESSAGES.EMPTY_INPUT);
  }

  const data = getLocalData();
  data.push(newItem);

  saveLocalData(data);

  closeModal();

  renderTable();
};

/**
 * 가게부 테이블 내부 체크된 항목들 삭제
 */
export const handleDeleteSelected = () => {
  const checkboxes = document.querySelectorAll(".row__checkbox:checked");

  if (checkboxes.length === 0) {
    return alert(MESSAGES.NO_SELECTION);
  }

  if (confirm(MESSAGES.CONFIRM_DELETE)) {
    const ids = Array.from(checkboxes).map((cb) => parseInt(cb.dataset.id, 10));
    deleteItems(ids);
    renderTable();
  }
};

/**
 * 모든 필터를 초기화
 */
export const handleResetFilters = () => {
  const filterForm = document.getElementById("filter__form");

  if (filterForm) {
    filterForm.reset();
    renderTable();
  }
};
