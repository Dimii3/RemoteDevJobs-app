import {
  searchInputEl,
  searchFormEl,
  spinnerSearchEl,
  jobListSearchEl,
  numberEl,
  BASE_URL_API,
  getData,
  state,
} from "../common.js";
import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./JobList.js";

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
  renderSpinner("search");

  try {
    const data = await getData(`${BASE_URL_API}/jobs?search=${searchText}`);
    const { jobItems } = data;
    state.searchJobItems = jobItems;

    spinnerSearchEl.classList.remove("spinner--visible");
    numberEl.textContent = jobItems.length;
    renderJobList();
  } catch (err) {
    spinnerSearchEl.classList.remove("spinner--visible");
    renderError(err.message);
  }
};

searchFormEl.addEventListener("submit", submitHandler);
