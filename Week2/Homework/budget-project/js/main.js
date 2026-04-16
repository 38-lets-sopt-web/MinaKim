import {
  handleAddEntry,
  handleCheckAll,
  handleDeleteSelected,
  handleOpenAddModal,
  handleOpenDetailModal,
  handleResetFilters,
} from "./controllers/handler.js";
import { closeModal, renderTable } from "./views/render.js";
import { initializeData } from "./models/storage.js";

/**
 * 필터 및 정렬과 관련된 이벤트 등록
 */
const initFilterEvents = () => {
  const filterForm = document.getElementById("filter__form");
  const btnReset = document.getElementById("btn__reset");
  const sortDate = document.getElementById("sort__date");

  filterForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    renderTable();
  });

  btnReset?.addEventListener("click", (e) => {
    e.preventDefault();
    handleResetFilters();
  });

  sortDate?.addEventListener("change", renderTable);
};

/**
 * 버튼 클릭 및 테이블 내 인터랙션 이벤트 등록
 */
const initActionEvents = () => {
  document
    .getElementById("btn__delete__selected")
    ?.addEventListener("click", handleDeleteSelected);
  document
    .getElementById("btn__open__modal")
    ?.addEventListener("click", handleOpenAddModal);

  document.getElementById("table__body")?.addEventListener("click", (e) => {
    const titleElement = e.target.closest(".item__title");
    if (titleElement) {
      handleOpenDetailModal(parseInt(titleElement.dataset.id, 10));
    }
  });
  document
    .getElementById("check__all")
    ?.addEventListener("change", handleCheckAll);
};

/**
 * 모달 제어(저장, 닫기) 이벤트 등록
 */
const initModalEvents = () => {
  const modalBackdrop = document.getElementById("modal__backdrop");
  const modalBody = document.getElementById("modal__body");
  const closeBtn = document.querySelector(".modal__close");

  modalBody?.addEventListener("click", (e) => {
    if (e.target.id === "btn__save") handleAddEntry();
  });

  closeBtn?.addEventListener("click", closeModal);
  modalBackdrop?.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
};

/**
 * 기타 유틸리티 이벤트 등록
 */
const initUtilityEvents = () => {
  document.getElementById("logo__icon")?.addEventListener("click", () => {
    window.location.reload();
  });
};

/**
 * 앱 전체 초기화 함수
 */
const init = () => {
  initializeData();
  renderTable();

  initFilterEvents();
  initActionEvents();
  initModalEvents();
  initUtilityEvents();
};

document.addEventListener("DOMContentLoaded", init);
