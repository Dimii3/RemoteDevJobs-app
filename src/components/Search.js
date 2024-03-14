import {
  searchInputEl,
  searchFormEl,
  spinnerSearchEl,
  jobListSearchEl,
  numberEl,
  BASE_URL_API,
} from "../common.js";
import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./JobList.js";

const submitHandler = (e) => {
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

  fetch(`${BASE_URL_API}/jobs?search=${searchText}`)
    .then((res) => {
      if (!res.ok) {
        console.error("Something went wrong");
        return;
      }
      return res.json();
    })
    .then((data) => {
      spinnerSearchEl.classList.remove("spinner--visible");
      const { jobItems } = data;
      numberEl.textContent = jobItems.length;
      renderJobList(jobItems);
    })
    .catch((err) => console.log(err));
};

searchFormEl.addEventListener("submit", submitHandler);
