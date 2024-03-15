import {
  sortingEl,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  state,
} from "../common.js";
import renderJobList from "./JobList.js";

const clickHandler = (event) => {
  const clickedEl = event.target.closest(".sorting__button");

  if (!clickedEl) return;

  const recent = clickedEl.className.includes("--recent") ? true : false;
  if (recent) {
    sortingBtnRecentEl.classList.add("sorting__button--active");
    sortingBtnRelevantEl.classList.remove("sorting__button--active");
  } else {
    sortingBtnRecentEl.classList.remove("sorting__button--active");
    sortingBtnRelevantEl.classList.add("sorting__button--active");
  }

  if (recent) {
    state.searchJobItems.sort((a, b) => a.daysAgo - b.daysAgo);
  } else {
    state.searchJobItems.sort((a, b) => a.relevanceScore - b.relevanceScore);
  }

  renderJobList();
};

sortingEl.addEventListener("click", clickHandler);
