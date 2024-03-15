import {
  searchInputEl,
  searchFormEl,
  spinnerSearchEl,
  jobListSearchEl,
  numberEl,
  BASE_URL_API,
  getData,
  state,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
} from "../common.js";
import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./JobList.js";
import renderPaginationsButtons from "./Pagination.js";

const submitHandler = async (e) => {
  e.preventDefault();
  const searchText = searchInputEl.value;

  const forbiddenPattern = /[0-9]/;
  const patternMatch = forbiddenPattern.test(searchText);

  if (patternMatch) {
    renderError("Your search my not contain numbers");
    return;
  }

  searchInputEl.blur();
  jobListSearchEl.innerHTML = "";
  sortingBtnRecentEl.classList.remove("sorting__button--active");
  sortingBtnRelevantEl.classList.add("sorting__button--active");
  renderSpinner("search");

  try {
    const data = await getData(`${BASE_URL_API}/jobs?search=${searchText}`);
    const { jobItems } = data;
    state.searchJobItems = jobItems;
    state.currentPage = 1;
    renderPaginationsButtons();

    spinnerSearchEl.classList.remove("spinner--visible");
    numberEl.textContent = jobItems.length;
    renderJobList();
  } catch (err) {
    spinnerSearchEl.classList.remove("spinner--visible");
    renderError(err.message);
  }
};

searchFormEl.addEventListener("submit", submitHandler);
