import {
  state,
  paginationBtnBackEl,
  paginationBtnNextEl,
  paginationEl,
  paginationNumberBackEl,
  paginationNumberNextEl,
  RESULTS_PER_PAGE,
} from "../common.js";
import renderJobList from "./JobList.js";

const renderPaginationsButtons = () => {
  if (state.currentPage > 1) {
    paginationBtnBackEl.classList.remove("pagination__button--hidden");
  } else {
    paginationBtnBackEl.classList.add("pagination__button--hidden");
  }

  if (state.currentPage > state.searchJobItems.length / RESULTS_PER_PAGE) {
    paginationBtnNextEl.classList.add("pagination__button--hidden");
  } else {
    paginationBtnNextEl.classList.remove("pagination__button--hidden");
  }

  paginationNumberNextEl.textContent = state.currentPage + 1;
  paginationNumberBackEl.textContent = state.currentPage - 1;

  paginationBtnNextEl.blur();
  paginationBtnBackEl.blur();
};

const clickHandler = (event) => {
  const clickedEl = event.target.closest(".pagination__button");
  if (!clickedEl) return;

  const nextPage = clickedEl.className.includes("--next") ? true : false;
  nextPage ? state.currentPage++ : state.currentPage--;
  renderPaginationsButtons();
  renderJobList();
};

paginationEl.addEventListener("click", clickHandler);

export default renderPaginationsButtons;
